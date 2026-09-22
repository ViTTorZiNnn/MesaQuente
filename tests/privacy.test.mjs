import test from 'node:test';
import assert from 'node:assert/strict';
import {makeRound,applyAction} from '../server/motor.js';
import {viewFor} from '../server/privacy.js';
import {modes,decks} from '../server/content.js';
const base=mode=>({schemaVersion:3,status:'jogando',hostId:'a',minigames:[mode],modoLivre:false,numeroRodadas:3,jogadores:{a:{nome:'A',conectado:true,entrouEm:1},b:{nome:'B',conectado:true,entrouEm:2},c:{nome:'C',conectado:true,entrouEm:3}}});
for(const mode of Object.keys(modes))test(mode+': private payload and action authorization',()=>{
 const r=base(mode);r.partida=makeRound(r,modes,decks,()=>0,123);const c=r.partida.cartaAtual;
 for(const uid of ['a','b','c'])assert.equal(viewFor(r,uid).partida.cartaAtual.viewerText,'');
 assert.throws(()=>viewFor(r,'outsider'));
 assert.throws(()=>applyAction(r,'b','draw',{cardId:c.id},modes,decks));
 applyAction(r,'a','draw',{cardId:c.id},modes,decks);
 for(const uid of ['b','c']){const v=viewFor(r,uid);assert.equal(v.partida.cartaAtual.viewerText,'');for(const key of ['text','secret','secretNumber','spyId','lie','truth','dare','forbidden'])assert.equal(v.partida.cartaAtual[key],undefined);assert.equal(v.partida.used,undefined);}
 c.phase='public';const v=viewFor(r,'b').partida.cartaAtual;
 for(const key of ['secret','secretNumber','spyId','lie','truth','dare','forbidden'])assert.equal(v[key],undefined);
 r.jogadores.spectator={nome:'D'};assert.equal(viewFor(r,'spectator').partida.cartaAtual.viewerText,'');
 c.phase='results';assert.ok(viewFor(r,'b').partida.cartaAtual.viewerText);
});
test('spy gets no word; clue reader gets no answer; forbidden and number stay private',()=>{
 for(const mode of ['o_espiao','apenas_uma_dica','palavra_proibida','o_termometro']){const r=base(mode);r.partida=makeRound(r,modes,decks,()=>0,123);const c=r.partida.cartaAtual;c.phase='public';
 if(mode==='o_espiao'){assert.equal(c.spyId,'a');assert.ok(!viewFor(r,'a').partida.cartaAtual.viewerText.includes(c.secret));}
 if(mode==='apenas_uma_dica')assert.ok(!viewFor(r,'a').partida.cartaAtual.viewerText.includes(c.secret));
 if(mode==='palavra_proibida')assert.ok(!viewFor(r,'b').partida.cartaAtual.viewerText.includes(c.secret));
 if(mode==='o_termometro')assert.equal(viewFor(r,'b').partida.cartaAtual.secretNumber,undefined);
 }
});
test('votes and hints remain hidden until permitted, no reference mutation',()=>{const r=base('apenas_uma_dica');r.partida=makeRound(r,modes,decks,()=>0,123);r.partida.cartaAtual.phase='public';r.partida.answers={b:'pipoca',c:'filme'};const v=viewFor(r,'a');assert.deepEqual(v.partida.answers,{});assert.equal(v.partida.answerCount,2);assert.deepEqual(r.partida.answers,{b:'pipoca',c:'filme'});r.partida.cartaAtual.hintsRevealed=true;assert.deepEqual(viewFor(r,'a').partida.answers,r.partida.answers);});
