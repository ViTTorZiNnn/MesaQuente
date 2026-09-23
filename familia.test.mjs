import test from 'node:test';
import assert from 'node:assert/strict';
import {familyModes,parsePlayers,nextFamilyCard} from '../public/familia-content.js';
test('one-device mode accepts a solo reader and up to twelve named people',()=>{assert.deepEqual(parsePlayers('Vitor'),['Vitor']);assert.deepEqual(parsePlayers(' Ana\nPedro, Joana '),['Ana','Pedro','Joana']);assert.equal(parsePlayers(Array(12).fill('Ana').join('\n')).length,12);for(const input of ['',Array(13).fill('Ana').join('\n'),'a'.repeat(21)])assert.throws(()=>parsePlayers(input));});
test('every local game exhausts its cards before recycling',()=>{assert.equal(Object.keys(familyModes).length,6);for(const [id,m]of Object.entries(familyModes)){const used=[],picked=[];for(let i=0;i<m.cartas.length;i++)picked.push(nextFamilyCard(id,used,()=>0));assert.equal(new Set(picked).size,m.cartas.length);assert.equal(nextFamilyCard(id,used,()=>0),m.cartas[0]);assert.equal(used.length,1);}});
