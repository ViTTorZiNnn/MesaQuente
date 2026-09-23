import test from 'node:test';import assert from 'node:assert/strict';
import {LocalRoomService} from '../public/local-room.js';
import {modes,decks} from '../server/content.js';
import {replyIds,makeRound as localRound} from '../public/motor.js';
import {makeRound as serverRound} from '../server/motor.js';
const avatar={emoji:'🦊',cor:'#ff8833'};
async function setup(mode,count=1,rounds=2){let visible;const s=new LocalRoomService({modes,decks,onRoom:r=>visible=r});await s.create('Ana',avatar,{minigames:[mode],numeroRodadas:rounds});for(let i=1;i<count;i++)await s.addPlayer('Pessoa '+i,avatar);await s.action('tutorial');await s.action('ready');await s.action('start');return {s,view:()=>visible};}
const act=(s,type,payload={})=>s.action(type,{cardId:s.room.partida?.cartaAtual.id,...payload});
test('single player completes selected rounds without network or fake votes',async()=>{const {s,view}=await setup('quem_e_mais_provavel');for(let i=1;i<=2;i++){assert.equal(view().partida.rodadaAtual,i);await act(s,'draw');await act(s,'reveal');assert.ok(view().partida.cartaAtual.viewerText);assert.equal(view().partida.cartaAtual.phase,'public');await act(s,'results');assert.deepEqual(view().partida.answers,{});await act(s,'next');}assert.equal(view().status,'finalizada');await s.action('restart');assert.equal(view().status,'lobby');});
for(const mode of Object.keys(modes))test('shared local flow and handoff: '+mode,async()=>{
 const {s,view}=await setup(mode,3,1),c=s.room.partida.cartaAtual,reader=c.readerId;
 await act(s,'draw');const other=c.participants.find(id=>id!==reader);s.switchPlayer(other);assert.equal(view().partida.cartaAtual.viewerText,'');s.switchPlayer(reader);
 if(mode==='duas_verdades_uma_mentira')await act(s,'statements',{statements:['Um','Dois','Três'],lie:1});
 if(mode==='verdade_ou_desafio_hot')await act(s,'truth',{choice:'truth'});
 await act(s,'reveal');
 if(s.room.partida.cartaAtual.votingReady===false)await act(s,'openVoting');
 const values={quem_e_mais_provavel:reader,eu_nunca:'JA_FIZ',o_que_voce_prefere:'0',bandeiras_vermelhas:'0',duas_verdades_uma_mentira:'1',o_termometro:'1',o_espiao:reader,batalha_de_argumentos:reader};
 if(values[mode])for(const id of replyIds(s.room)){s.switchPlayer(id);await act(s,'answer',{value:values[mode]});}
 else if(mode==='preencha_a_lacuna'){for(const id of replyIds(s.room)){s.switchPlayer(id);await act(s,'answer',{value:s.room.partida.cartaAtual.white[0]});}s.switchPlayer(reader);await act(s,'judge',{winner:other});}
 else if(mode==='apenas_uma_dica'){for(const id of replyIds(s.room)){s.switchPlayer(id);await act(s,'answer',{value:'dica'+id});}s.switchPlayer(reader);await act(s,'guess',{value:s.room.partida.cartaAtual.secret});}
 else if(mode==='palavra_proibida'){s.switchPlayer(other);await act(s,'answer',{value:s.room.partida.cartaAtual.secret});}
 else await act(s,'results');
 assert.equal(view().partida.cartaAtual.phase,'results');s.switchPlayer(reader);await act(s,'next');assert.equal(view().status,'finalizada');assert.equal(s.uid,s.room.hostId);
});
test('local participant limits, avatars, invalid actions and secret minimums',async()=>{const s=new LocalRoomService({modes,decks,onRoom:()=>{}});await s.create('Ana',avatar,{minigames:['o_espiao'],numeroRodadas:3});await assert.rejects(s.action('tutorial'),/3 jogadores/);assert.equal(s.room.status,'lobby');await assert.rejects(s.addPlayer('',avatar));for(let i=1;i<12;i++)await s.addPlayer('P'+i,avatar);await assert.rejects(s.addPlayer('Extra',avatar));const id=Object.keys(s.room.jogadores)[1];assert.deepEqual(s.room.jogadores[id].avatar,avatar);await s.removePlayer(id);assert.equal(Object.keys(s.room.jogadores).length,11);await assert.rejects(s.removePlayer(s.room.hostId));});
test('server never accepts local flag to bypass multiplayer minimum',()=>{const room={local:true,status:'lobby',minigames:['eu_nunca'],numeroRodadas:2,jogadores:{a:{conectado:true}}};assert.throws(()=>serverRound(room,modes,decks),/2 jogadores/);assert.equal(localRound(room,modes,decks).status,'jogando');});
