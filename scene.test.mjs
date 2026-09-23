import test from 'node:test';
import assert from 'node:assert/strict';
globalThis.localStorage={getItem:()=>null,setItem(){}};
globalThis.matchMedia=()=>({matches:false,addEventListener(){}});
globalThis.document={documentElement:{dataset:{}}};
globalThis.window={dispatchEvent(){},addEventListener(){}};
globalThis.innerWidth=1200;
const THREE=await import('../public/assets/three.module.js');
const {Mesa3D}=await import('../public/mesa3d.js');
function scene(){const s=Object.create(Mesa3D.prototype);Object.assign(s,{ready:true,reduced:false,container:{classList:{toggle(){}},getBoundingClientRect:()=>({width:500,height:400})},renderer:{domElement:{style:{}},setSize(){}},camera:new THREE.PerspectiveCamera(42,1,.1,80),card:new THREE.Group(),back:{material:{}},top:{material:{}},art:[{back:{}}],light:{color:{set(){}}},paintFront(){},positionSeats(){}});s.camera.position.set(0,8.3,10);s.camera.lookAt(0,0,0);return s;}
test('opening or resizing side panel preserves ongoing card trajectory',()=>{const s=scene();s.setCard({id:'a',phase:'private',showFront:true,deckIndex:0,text:'Pergunta'});const animation=s.anim;s.resize();assert.equal(s.anim,animation);assert.equal(s.anim.duration,1250);assert.ok(s.anim.to.distanceTo(s.card.position)>0);});
test('polling and opening voting do not restart card draw',()=>{const s=scene(),c={id:'a',phase:'private',showFront:false,deckIndex:0,text:''};s.setCard(c);const animation=s.anim;s.setCard(c);assert.equal(s.anim,animation);s.setCard({...c,phase:'voting'});assert.equal(s.anim,animation);s.setCard({...c,phase:'results',showFront:true,text:'Pergunta'});assert.notEqual(s.anim,animation);});
test('reduced motion directly places card at destination',()=>{const s=scene();s.reduced=true;const c={id:'a',phase:'private',showFront:true,deckIndex:0,text:'Pergunta'};s.setCard(c);assert.equal(s.anim,null);assert.deepEqual(s.card.position,s.positionFor(c));});
