import { validate } from './validation.mjs';
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = process.env.DOPAMINE_DATA_DIR || path.join(root, '.data');
fs.mkdirSync(dataDir, { recursive: true });
const credentialFile = path.join(dataDir, 'admin-key.txt');
if (!fs.existsSync(credentialFile)) fs.writeFileSync(credentialFile, randomBytes(24).toString('base64url'), { mode: 0o600 });
const adminKey = process.env.DOPAMINE_ADMIN_KEY || fs.readFileSync(credentialFile, 'utf8').trim();
const db = new DatabaseSync(path.join(dataDir, 'orders.sqlite'));
db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS orders (
 id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, owner_hash TEXT NOT NULL,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL, status TEXT NOT NULL,
 kind TEXT NOT NULL, day TEXT NOT NULL, time TEXT NOT NULL, payload TEXT NOT NULL
); CREATE INDEX IF NOT EXISTS orders_day ON orders(day,time);`);
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'src/prices.json'), 'utf8'));
const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
const hash = s => createHash('sha256').update(s).digest('hex');
const safeEqual = (a, b) => timingSafeEqual(Buffer.from(hash(a)), Buffer.from(hash(b)));
const allowedOrigins = new Set((process.env.DOPAMINE_ALLOWED_ORIGINS || 'http://localhost:8081,http://127.0.0.1:8081').split(','));
const limits = new Map();
const sessions = new Map();
const nowDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Qatar', year:'numeric',month:'2-digit',day:'2-digit' }).format(new Date());
const fail = (message, status = 400) => Object.assign(new Error(message), { status });
const clean = (value, min, max, label) => { if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw fail(label); return value.trim(); };
const send = (res, status, value) => { res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' }); res.end(JSON.stringify(value)); };
async function body(req) { let text = ''; for await (const part of req) { text += part; if (Buffer.byteLength(text) > 20000) throw fail('Request too large', 413); } try { return JSON.parse(text); } catch { throw fail('Invalid JSON'); } }
function throttle(req, name, max) { const key = `${req.socket.remoteAddress}:${name}`; const now = Date.now(); const entry = limits.get(key); if (!entry || entry.until < now) { limits.set(key, { count:1, until:now+60000 }); return; } if (++entry.count > max) throw fail('Too many requests. Try again in a minute.', 429); }
function auth(req) { const token = (req.headers.authorization || '').replace(/^Bearer /, ''); const session = sessions.get(hash(token)); if (!session || session < Date.now()) throw fail('Sign in required', 401); }
function dto(row) { return { ...JSON.parse(row.payload), id:row.id, status:row.status, createdAt:row.created_at, updatedAt:row.updated_at }; }
const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) return send(res,403,{error:'Origin not allowed'});
  if (origin) { res.setHeader('Access-Control-Allow-Origin',origin); res.setHeader('Vary','Origin'); }
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res,200,{ok:true});
    if (req.method === 'POST' && url.pathname === '/api/admin/login') { throttle(req,'login',8); const input = await body(req); if (typeof input.key !== 'string' || !safeEqual(input.key,adminKey)) throw fail('Incorrect access key',401); const token=randomBytes(32).toString('base64url');sessions.set(hash(token),Date.now()+8*3600000);return send(res,200,{token}); }
    if (req.method === 'POST' && url.pathname === '/api/admin/logout') { sessions.delete(hash((req.headers.authorization || '').replace(/^Bearer /,'')));return send(res,200,{ok:true}); }
    if (req.method === 'POST' && url.pathname === '/api/orders') {
      throttle(req,'create',20); const input = await body(req);
      const ownerToken=clean(input.ownerToken,32,100,'Invalid customer token');
      const requestKey=clean(input.requestKey,20,100,'Invalid request key');
      const existing=db.prepare('SELECT * FROM orders WHERE request_key=?').get(requestKey);
      if (existing) { if (existing.owner_hash !== hash(ownerToken)) throw fail('Request conflict',409); return send(res,200,{order:dto(existing)}); }
      const payload=validate(input,catalog);const id='DP-'+randomBytes(6).toString('hex').toUpperCase();const now=new Date().toISOString();
      db.prepare('INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?)').run(id,requestKey,hash(ownerToken),now,now,'pending',payload.kind,payload.day,payload.time,JSON.stringify(payload));
      return send(res,201,{order:dto(db.prepare('SELECT * FROM orders WHERE id=?').get(id))});
    }
    if (req.method === 'POST' && url.pathname === '/api/my-orders') { throttle(req,'lookup',120);const input=await body(req);const ownerToken=clean(input.ownerToken,32,100,'Invalid customer token');return send(res,200,{orders:db.prepare('SELECT * FROM orders WHERE owner_hash=? ORDER BY created_at DESC LIMIT 200').all(hash(ownerToken)).map(dto)}); }
    if (req.method === 'GET' && url.pathname === '/api/admin/orders') { auth(req);return send(res,200,{orders:db.prepare('SELECT * FROM orders ORDER BY day,time,created_at').all().map(dto)}); }
    if (req.method === 'PATCH' && /^\/api\/admin\/orders\/DP-[A-F0-9]{12}$/.test(url.pathname)) {
      auth(req);const input=await body(req); if (!statuses.includes(input.status)) throw fail('Invalid status'); const id=url.pathname.split('/').pop();const row=db.prepare('SELECT * FROM orders WHERE id=?').get(id);if(!row)throw fail('Order not found',404);if(input.updatedAt!==row.updated_at)throw fail('Order changed. Refresh and try again.',409);
      const stamp=new Date(Math.max(Date.now(),Date.parse(row.updated_at)+1)).toISOString();db.prepare('UPDATE orders SET status=?,updated_at=? WHERE id=?').run(input.status,stamp,id);return send(res,200,{order:dto(db.prepare('SELECT * FROM orders WHERE id=?').get(id))});
    }
    throw fail('Not found',404);
  } catch (error) { if (!error.status) console.error(error);send(res,error.status || 500,{error:error.status ? error.message : 'Could not save. Please try again.'}); }
});
setInterval(()=>{const now=Date.now();for(const [key,value] of limits)if(value.until<now)limits.delete(key);for(const [key,value] of sessions)if(value<now)sessions.delete(key);},60000).unref();
server.listen(Number(process.env.PORT || 8082),process.env.HOST || '127.0.0.1',()=>console.log(`Orders API ready on port ${process.env.PORT || 8082}. Local admin key: ${credentialFile}`));
