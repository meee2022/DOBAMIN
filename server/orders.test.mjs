import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';

test('orders persist, remain private, validate input and support staff preparation workflow',async()=>{
 const dir=mkdtempSync(path.join(tmpdir(),'dopamine-orders-test-'));const port=18082;let child;
 async function start(){child=spawn(process.execPath,['server/orders.mjs'],{env:{...process.env,PORT:String(port),DOPAMINE_DATA_DIR:dir,DOPAMINE_ADMIN_KEY:'test-key-only'},stdio:['ignore','pipe','pipe']});await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('API startup timed out')),10000);child.stdout.on('data',chunk=>{if(String(chunk).includes('Orders API ready')){clearTimeout(timer);resolve();}});child.once('error',reject);});}
 async function stop(){if(!child||child.exitCode!==null)return;const ended=once(child,'exit');child.kill();await ended;}
 async function req(route,method='GET',body,token){const response=await fetch(`http://127.0.0.1:${port}/api${route}`,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},body:body?JSON.stringify(body):undefined});return{status:response.status,...await response.json()};}
 const ownerToken=randomUUID()+randomUUID();const payload={name:'Test customer',phone:'+974 5555 1234',day:new Date(Date.now()+86400000).toISOString().slice(0,10),time:'14:00',kind:'order',fulfillment:'pickup',notes:'Test only',items:[{id:'tiramisu',quantity:2,price:1}],ownerToken,requestKey:randomUUID()};
 try{await start();assert.equal((await req('/admin/orders')).status,401);assert.equal((await req('/admin/login','POST',{key:'wrong'})).status,401);
 const created=await req('/orders','POST',payload);assert.equal(created.status,201);assert.equal(created.order.total,null);assert.equal(created.order.items[0].price,null);assert.equal(created.order.status,'pending');
 const duplicate=await req('/orders','POST',payload);assert.equal(duplicate.order.id,created.order.id);
 assert.equal((await req('/orders','POST',{...payload,ownerToken:randomUUID()+randomUUID()})).status,409);
 assert.equal((await req('/orders','POST',{...payload,requestKey:randomUUID(),day:'2020-01-01'})).status,400);
 assert.equal((await req('/orders','POST',{...payload,requestKey:randomUUID(),items:[{id:'tiramisu',quantity:-1}]})).status,400);
 assert.equal((await req('/orders','POST',{...payload,requestKey:randomUUID(),fulfillment:'delivery',address:''})).status,400);
 assert.equal((await req('/my-orders','POST',{ownerToken:randomUUID()+randomUUID()})).orders.length,0);
 assert.equal((await req('/my-orders','POST',{ownerToken})).orders.length,1);
 const booking=await req('/orders','POST',{...payload,requestKey:randomUUID(),kind:'booking',items:[],notes:'Birthday for 12 guests'});assert.equal(booking.status,201);assert.equal(booking.order.total,null);
 const login=await req('/admin/login','POST',{key:'test-key-only'});assert.equal(login.status,200);
 assert.equal((await req('/admin/orders','GET',undefined,login.token)).orders.length,2);
 const updated=await req(`/admin/orders/${created.order.id}`,'PATCH',{status:'preparing',updatedAt:created.order.updatedAt},login.token);assert.equal(updated.order.status,'preparing');
 assert.equal((await req(`/admin/orders/${created.order.id}`,'PATCH',{status:'ready',updatedAt:created.order.updatedAt},login.token)).status,409);
 await stop();await start();const persisted=await req('/my-orders','POST',{ownerToken});assert.equal(persisted.orders.length,2);assert.equal(persisted.orders.find(o=>o.id===created.order.id).status,'preparing');assert.equal((await req('/admin/orders','GET',undefined,login.token)).status,401);
 }finally{await stop();}
});
