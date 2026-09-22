import test from 'node:test';
import assert from 'node:assert/strict';
import {RoomService,withDeadline,authMessage} from '../public/rede.js';
const user={uid:'a',getIdToken:async()=> 'test-token'};
function fixture(){
 const errors=[],progress=[],rooms=[];
 const auth={setPersistence:async()=>{},onAuthStateChanged:cb=>{queueMicrotask(()=>cb(user));return()=>{};}};
 const fn=()=>auth;fn.Auth={Persistence:{SESSION:'session'}};
 globalThis.firebase={apps:[{}],auth:fn};globalThis.window={firebase};
 return{service:new RoomService({onRoom:r=>rooms.push(r),onConnection:()=>{},onError:e=>errors.push(e),onProgress:p=>progress.push(p)}),progress,rooms,auth};
}
test('deadline ends a never-settling operation and cancels it',async()=>{let aborted=false;await assert.rejects(withDeadline(new Promise(()=>{}),5,'Timeout',()=>{aborted=true;}),/Timeout/);assert.equal(aborted,true);});
test('API and provider errors are distinguished',()=>{assert.match(authMessage({code:'auth/invalid-api-key'}),/chave pública/);assert.match(authMessage({code:'auth/operation-not-allowed'}),/Anônimo/);assert.equal(authMessage(Error('outro erro')),'outro erro');});
test('HTML 404 does not become a JSON parsing error; progress clears',async()=>{const f=fixture();globalThis.fetch=async()=>({status:404,ok:false,text:async()=>'<html>missing</html>'});await assert.rejects(f.service.request('create'),/API da sala não foi publicada/);assert.equal(f.progress.at(-1),'');assert.equal(f.rooms.length,0);});
test('server setup error is preserved',async()=>{const f=fixture();globalThis.fetch=async()=>({status:503,ok:false,text:async()=>JSON.stringify({error:'Falta configurar o Firebase no servidor.'})});await assert.rejects(f.service.request('create'),/Falta configurar/);});
test('login can retry after rejection',async()=>{const f=fixture();f.auth.setPersistence=async()=>{throw Object.assign(Error('disabled'),{code:'auth/operation-not-allowed'});};await assert.rejects(f.service.authenticate(),/Anônimo/);f.auth.setPersistence=async()=>{};assert.equal((await f.service.authenticate()).uid,'a');});
test('successful creation updates code before delivering room',async()=>{const f=fixture();globalThis.fetch=async()=>({status:200,ok:true,text:async()=>JSON.stringify({code:'ABCD',room:{jogadores:{a:{nome:'Teste'}}}})});await f.service.request('create');assert.equal(f.service.code,'ABCD');assert.equal(f.rooms.length,1);assert.ok(f.progress.includes('Criando sua sala…'));});
