import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const base='http://127.0.0.1:8787';
async function req(path,method='GET',body,token){const r=await fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:body===undefined?undefined:JSON.stringify(body)});return {...await r.json(),status:r.status};}
test('Cloudflare D1 orders: privacy, validation, concurrency, login and revocation',async()=>{
  assert.equal((await req('/health')).ok,true);
  const ownerToken=randomUUID()+randomUUID(),day=new Date(Date.now()+86400000).toISOString().slice(0,10);
  const payload={ownerToken,requestKey:randomUUID(),name:'Deployment Test',phone:'+97450000000',day,time:'18:30',kind:'order',fulfillment:'pickup',notes:'Automated local test',items:[{id:'tiramisu',quantity:2,price:1}]};
  const pair=await Promise.all([req('/orders','POST',payload),req('/orders','POST',payload)]);
  assert.deepEqual(pair.map(x=>x.status).sort(),[200,201]);assert.equal(pair[0].order.id,pair[1].order.id);assert.equal(pair[0].order.total,null);
  assert.equal((await req('/orders','POST',{...payload,ownerToken:randomUUID()+randomUUID()})).status,409);
  assert.equal((await req('/orders','POST',{...payload,requestKey:randomUUID(),day:'2020-01-01'})).status,400);
  assert.equal((await req('/orders','POST',{...payload,requestKey:randomUUID(),items:[{id:'tiramisu',quantity:-1}]})).status,400);
  assert.equal((await req('/my-orders','POST',{ownerToken:randomUUID()+randomUUID()})).orders.length,0);
  assert.equal((await req('/my-orders','POST',{ownerToken})).orders.length,1);
  assert.equal((await req('/admin/orders')).status,401);
  assert.equal((await req('/admin/login','POST',{key:'wrong-key'})).status,401);
  const login=await req('/admin/login','POST',{key:'test-key-only'});assert.equal(login.status,200);
  const order=pair[0].order;
  const changes=await Promise.all(['confirmed','preparing'].map(status=>req('/admin/orders/'+order.id,'PATCH',{status,updatedAt:order.updatedAt},login.token)));
  assert.deepEqual(changes.map(x=>x.status).sort(),[200,409]);
  const booking=await req('/orders','POST',{...payload,requestKey:randomUUID(),kind:'booking',items:[],notes:'Birthday for 12 guests'});assert.equal(booking.status,201);
  assert.ok((await req('/admin/orders','GET',undefined,login.token)).orders.some(x=>x.id===booking.order.id));
  await req('/admin/logout','POST',{},login.token);assert.equal((await req('/admin/orders','GET',undefined,login.token)).status,401);
  const forbidden=await fetch(base+'/api/health',{headers:{Origin:'https://untrusted.example'}});assert.equal(forbidden.status,403);
  const huge=await fetch(base+'/api/orders',{method:'POST',body:'x'.repeat(21000)});assert.equal(huge.status,413);
  const missing=await req('/missing');assert.equal(missing.status,404);
});
