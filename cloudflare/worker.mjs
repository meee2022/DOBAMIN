import catalog from '../src/prices.json';
import { clean, fail, validate } from '../server/validation.mjs';

const statuses = ['pending','confirmed','preparing','ready','completed','cancelled'];
const hash = async value => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))), b=>b.toString(16).padStart(2,'0')).join('');
const token = () => crypto.randomUUID()+crypto.randomUUID();
const bearer = request => (request.headers.get('Authorization') || '').replace(/^Bearer /,'');
const dto = row => ({...JSON.parse(row.payload),id:row.id,status:row.status,createdAt:row.created_at,updatedAt:row.updated_at});
const json = (value,status=200) => Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function body(request) {
  if (Number(request.headers.get('Content-Length'))>20000) throw fail('Request too large',413);
  const reader=request.body?.getReader(); if(!reader) throw fail('Invalid JSON');
  let size=0;const chunks=[];
  for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>20000){await reader.cancel();throw fail('Request too large',413);}chunks.push(value);}
  try {const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}const parsed=JSON.parse(new TextDecoder().decode(bytes));if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw Error();return parsed;}catch{throw fail('Invalid JSON');}
}
async function throttle(request,db,name,max){
  const key=await hash(`${request.headers.get('CF-Connecting-IP')||'local'}:${name}`);const now=Date.now();
  const row=await db.prepare('INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires<=? THEN 1 ELSE count+1 END,expires=CASE WHEN expires<=? THEN excluded.expires ELSE expires END RETURNING count').bind(key,now+60000,now,now).first();
  if(row.count>max)throw fail('Too many requests. Try again in a minute.',429);
}
async function auth(request,db){const session=await db.prepare('SELECT expires FROM sessions WHERE token_hash=?').bind(await hash(bearer(request))).first();if(!session||session.expires<=Date.now())throw fail('Sign in required',401);}

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(!url.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
    const origin=request.headers.get('Origin');
    if(origin&&origin!==url.origin)return json({error:'Origin not allowed'},403);
    try{
      if(request.method==='GET'&&url.pathname==='/api/health')return json({ok:true});
      const db=env.DB;
      if(request.method==='POST'&&url.pathname==='/api/admin/login'){
        await throttle(request,db,'login',8);const input=await body(request);
        if(!env.DOPAMINE_ADMIN_KEY)throw fail('Staff access is not configured',503);
        const expected=await hash(env.DOPAMINE_ADMIN_KEY),actual=await hash(typeof input.key==='string'?input.key:'');let mismatch=0;for(let i=0;i<expected.length;i++)mismatch|=expected.charCodeAt(i)^actual.charCodeAt(i);
        if(mismatch)throw fail('Incorrect access key',401);
        const sessionToken=token();await db.prepare('INSERT INTO sessions VALUES (?,?)').bind(await hash(sessionToken),Date.now()+8*3600000).run();return json({token:sessionToken});
      }
      if(request.method==='POST'&&url.pathname==='/api/admin/logout'){await db.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await hash(bearer(request))).run();return json({ok:true});}
      if(request.method==='POST'&&url.pathname==='/api/orders'){
        await throttle(request,db,'create',20);const input=await body(request);
        const ownerHash=await hash(clean(input.ownerToken,32,100,'Invalid customer token'));const requestKey=clean(input.requestKey,20,100,'Invalid request key');
        let row=await db.prepare('SELECT * FROM orders WHERE request_key=?').bind(requestKey).first();
        if(row){if(row.owner_hash!==ownerHash)throw fail('Request conflict',409);return json({order:dto(row)});}
        const payload=validate(input,catalog);const id='DP-'+crypto.randomUUID().replaceAll('-','').slice(0,12).toUpperCase(),now=new Date().toISOString();
        const inserted=await db.prepare('INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(request_key) DO NOTHING').bind(id,requestKey,ownerHash,now,now,'pending',payload.kind,payload.day,payload.time,JSON.stringify(payload)).run();
        row=await db.prepare('SELECT * FROM orders WHERE request_key=?').bind(requestKey).first();
        if(row.owner_hash!==ownerHash)throw fail('Request conflict',409);return json({order:dto(row)},inserted.meta.changes?201:200);
      }
      if(request.method==='POST'&&url.pathname==='/api/my-orders'){
        await throttle(request,db,'lookup',120);const input=await body(request),ownerHash=await hash(clean(input.ownerToken,32,100,'Invalid customer token'));
        const {results}=await db.prepare('SELECT * FROM orders WHERE owner_hash=? ORDER BY created_at DESC LIMIT 200').bind(ownerHash).all();return json({orders:results.map(dto)});
      }
      if(request.method==='GET'&&url.pathname==='/api/admin/orders'){
        await auth(request,db);const {results}=await db.prepare('SELECT * FROM orders ORDER BY day,time,created_at').all();return json({orders:results.map(dto)});
      }
      if(request.method==='PATCH'&&/^\/api\/admin\/orders\/DP-[A-F0-9]{12}$/.test(url.pathname)){
        await auth(request,db);const input=await body(request);if(!statuses.includes(input.status))throw fail('Invalid status');
        const id=url.pathname.split('/').pop(),row=await db.prepare('SELECT * FROM orders WHERE id=?').bind(id).first();if(!row)throw fail('Order not found',404);
        if(input.updatedAt!==row.updated_at)throw fail('Order changed. Refresh and try again.',409);
        const stamp=new Date(Math.max(Date.now(),Date.parse(row.updated_at)+1)).toISOString();
        const updated=await db.prepare('UPDATE orders SET status=?,updated_at=? WHERE id=? AND updated_at=? RETURNING *').bind(input.status,stamp,id,input.updatedAt).first();
        if(!updated)throw fail('Order changed. Refresh and try again.',409);return json({order:dto(updated)});
      }
      throw fail('Not found',404);
    }catch(error){return json({error:error.status?error.message:'Could not save. Please try again.'},error.status||500);}
  },
  async scheduled(event,env){await env.DB.batch([env.DB.prepare('DELETE FROM sessions WHERE expires<?').bind(Date.now()),env.DB.prepare('DELETE FROM rate_limits WHERE expires<?').bind(Date.now())]);}
};
