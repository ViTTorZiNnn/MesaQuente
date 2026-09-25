import {applyAction,validateConfig,connected,replyIds} from './motor.js?v=arcade08';
import {viewFor} from './local-privacy.js?v=arcade08';

// This service stays in this tab. No Firebase identities, invitations or network writes.
export class LocalRoomService {
 constructor({modes,decks,onRoom,onConnection=()=>{}}){Object.assign(this,{modes,decks,onRoom,onConnection});this.local=true;this.online=true;this.uid='local-1';this.code='LOCAL';this.counter=1;}
 emit(){const view=viewFor(this.room,this.uid);view.local=true;this.onRoom(view);this.onConnection(true);}
 async create(name,avatar,config){const valid=validateConfig(config,this.modes);this.room={schemaVersion:3,local:true,status:'lobby',hostId:this.uid,...valid,jogadores:{}};this.addProfile(this.uid,name,avatar);this.emit();return this.code;}
 addProfile(id,name,avatar){if(typeof name!=='string'||!name.trim()||name.trim().length>20)throw Error('Digite um nome de até 20 caracteres.');if(!avatar?.emoji||!avatar?.cor)throw Error('Escolha um avatar.');this.room.jogadores[id]={nome:name.trim(),avatar:structuredClone(avatar),conectado:true,entrouEm:this.counter};}
 async addPlayer(name,avatar){if(this.room.status!=='lobby')throw Error('Adicione participantes no lobby.');if(connected(this.room).length>=12)throw Error('A mesa tem 12 participantes.');const id='local-'+(++this.counter);this.addProfile(id,name,avatar);this.emit();return id;}
 async removePlayer(id){if(this.room.status!=='lobby'||id===this.room.hostId)throw Error('Não é possível remover este participante.');delete this.room.jogadores[id];this.emit();}
 switchPlayer(id){if(!this.room.jogadores[id])throw Error('Participante inválido.');this.uid=id;this.emit();}
 pendingPlayer(){return replyIds(this.room).find(id=>!Object.hasOwn(this.room.partida.answers||{},id));}
 async action(type,payload={}){
  // Work on a copy: a rejected action must not leave a partially changed local room.
  const next=structuredClone(this.room);
  if(type==='ready'&&next.status==='tutorial')for(const id of connected(next))next.ready[id]=true;
  applyAction(next,this.uid,type,payload,this.modes,this.decks);
  this.room=next;
  if(type==='start'||type==='next')this.uid=next.partida.cartaAtual.readerId;
  if(type==='restart'||next.status==='finalizada')this.uid=next.hostId;
  this.emit();
 }
 async react(emoji){if(!['🔥','😂','👏','😳'].includes(emoji))return;this.room.reactions??={};this.room.reactions['r'+Date.now()]={emoji,uid:this.uid,at:Date.now()};this.emit();}
 async leave(){this.room=null;}
}
