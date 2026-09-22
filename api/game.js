import {getApps,initializeApp,cert} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getDatabase} from 'firebase-admin/database';
import {randomInt,randomUUID} from 'node:crypto';
import {applyAction,connected,validateConfig} from '../server/motor.js';
import {modes,decks} from '../server/content.js';
import {viewFor} from '../server/privacy.js';
function db(){if(!getApps().length){if(!process.env.FIREBASE_SERVICE_ACCOUNT_JSON||!process.env.FIREBASE_DATABASE_URL)throw Error('SETUP');initializeApp({credential:cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)),databaseURL:process.env.FIREBASE_DATABASE_URL});}return getDatabase();}
const codeOK=c=>typeof c==='string'&&/^[A-Z]{4}$/.test(c);
function profile(p){if(typeof p.name!=='string'||!p.name.trim()||p.name.trim().length>20)throw Error('Digite um nome de até 20 caracteres.');const a=p.avatar;if(!a||typeof a.emoji!=='string'||a.emoji.length>12||!/^#[0-9a-f]{3,8}$/i.test(a.cor))throw Error('Avatar inválido.');return{nome:p.name.trim(),avatar:{emoji:a.emoji,cor:a.cor},conectado:true,entrouEm:Date.now(),lastSeen:Date.now()};}
function presence(room,uid,now){for(const [id,p] of Object.entries(room.jogadores))p.conectado=id===uid||now-(p.lastSeen||0)<90000;room.jogadores[uid].lastSeen=now;if(!room.jogadores[room.hostId]?.conectado)room.hostId=connected(room)[0];}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');if(req.method!=='POST')return res.status(405).json({error:'Use POST.'});
 const b=req.body;if(!b||typeof b!=='object'||JSON.stringify(b).length>6000)return res.status(400).json({error:'Pedido inválido.'});
 let database,uid;try{database=db();const token=/^Bearer (.+)$/.exec(req.headers.authorization||'')?.[1];if(!token)return res.status(401).json({error:'Entre novamente no jogo.'});uid=(await getAuth().verifyIdToken(token,true)).uid;}catch(e){return res.status(e.message==='SETUP'?503:401).json({error:e.message==='SETUP'?'Falta configurar o Firebase no servidor.':'Autenticação indisponível. Entre novamente.'});}
 try{
 // Shared limit across server instances; timestamps and identities are server-owned.
 const now=Date.now(),limitRef=database.ref('mqSecureLimits/'+uid);let limited=false;
 await limitRef.transaction(old=>{limited=false;const x=old&&now-old.since<60000?old:{since:now,count:0,joins:0};if(x.count>=100||(['create','join'].includes(b.op)&&x.joins>=10)){limited=true;return;}x.count++;if(['create','join'].includes(b.op))x.joins++;return x;});
 if(limited)return res.status(429).json({error:'Aguarde um minuto antes de tentar novamente.'});
 if(b.op==='create'){
 const cfg=validateConfig(b.config||{},modes),p=profile(b);const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ';
 for(let i=0;i<12;i++){const code=Array.from({length:4},()=>alphabet[randomInt(alphabet.length)]).join('');const room={schemaVersion:3,criadaEm:now,expiresAt:now+86400000,hostId:uid,status:'lobby',...cfg,jogadores:{[uid]:p}};const result=await database.ref('mqSecureRooms/'+code).transaction(old=>!old||old.expiresAt<now?room:undefined);if(result.committed)return res.json({uid,code,room:viewFor(room,uid)});}
 throw Error('Tente criar a sala novamente.');}
 if(!codeOK(b.code))throw Error('Código inválido.');
 const ref=database.ref('mqSecureRooms/'+b.code);let reason;const result=await ref.transaction(room=>{
 reason=null;if(!room){reason='Sala não encontrada.';return null;}if(room.expiresAt<now){reason='Sala expirada. Crie outra sala.';return;}
 try{
 if(b.op==='join'){const p=profile(b);if(!room.jogadores[uid]&&Object.keys(room.jogadores).length>=12)throw Error('A mesa tem 12 participantes.');p.entrouEm=room.jogadores[uid]?.entrouEm||now;room.jogadores[uid]=p;}
 else if(!room.jogadores[uid])throw Error('Você não participa desta sala.');
 presence(room,uid,now);
 if(b.op==='leave'){delete room.jogadores[uid];const ids=connected(room);if(!Object.keys(room.jogadores).length)return null;if(room.hostId===uid)room.hostId=ids[0]||Object.keys(room.jogadores)[0];}
 else if(b.op==='action')room=applyAction(room,uid,b.type,b.payload||{},modes,decks,()=>randomInt(0,2**30)/(2**30),now);
 else if(b.op==='react'){if(!['🔥','😂','👏','😳'].includes(b.emoji))throw Error('Reação inválida.');room.reactions=Object.fromEntries(Object.entries(room.reactions||{}).filter(([,r])=>now-r.at<5000));room.reactions[randomUUID()]={emoji:b.emoji,uid,at:now};}
 else if(!['join','state','leave'].includes(b.op))throw Error('Ação desconhecida.');
 return room;
 }catch(e){reason=e.message;return;}});
 if(!result.committed||b.op!=='leave'&&!result.snapshot.exists())throw Error(reason||'A ação não foi concluída.');
 return res.json({uid,code:b.code,room:b.op==='leave'?null:viewFor(result.snapshot.val(),uid)});
 }catch(e){return res.status(400).json({error:e.message||'Não foi possível concluir a ação.'});}
}
