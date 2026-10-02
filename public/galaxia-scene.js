// Mapa "Galáxia": espaço profundo com nebulosas, galáxia espiral, planeta com anel e estrelas cadentes.
import {visual,reducedMotion} from './visual.js?v=quente30';
const MOODS={
 leve:{bg:['#05030f','#120a2e','#1d0f45'],neb:['#7b4dff','#2fd3ff','#ff7ad9'],planet:['#ffb36b','#ff6a8a'],ring:'#ffd9a8'},
 profundo:{bg:['#02040c','#061633','#0b2350'],neb:['#2f6bff','#2fd3ff','#7b4dff'],planet:['#7fb8ff','#3a5cff'],ring:'#bfe0ff'},
 adulto:{bg:['#0c0208','#2a0518','#3d0624'],neb:['#ff2d6f','#ff6a2a','#b02dff'],planet:['#ff5a5a','#b0124a'],ring:'#ffb0c4'},
 casal:{bg:['#0d0310','#2a0a2e','#401040'],neb:['#ff4fd8','#ff8ab0','#8b4dff'],planet:['#ff9ad5','#ff4f9a'],ring:'#ffe0f2'}
};
const canvas=document.getElementById('galaxia-cena'),ctx=canvas.getContext('2d'),base=document.createElement('canvas'),b=base.getContext('2d');
let W=0,H=0,dpr=1,mood='',seed=1,last=0,dirty=true,S={};
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
const hexA=(h,a)=>h+Math.round(Math.max(0,Math.min(1,a))*255).toString(16).padStart(2,'0');
function currentMood(){return document.body.dataset.screen==='game'&&MOODS[document.body.dataset.tone]?document.body.dataset.tone:'leve';}
function build(){const m=MOODS[mood];seed=7;base.width=W*dpr;base.height=H*dpr;b.setTransform(dpr,0,0,dpr,0,0);
 const g=b.createLinearGradient(0,0,W*.3,H);m.bg.forEach((c,i)=>g.addColorStop(i/(m.bg.length-1),c));b.fillStyle=g;b.fillRect(0,0,W,H);
 for(let i=0;i<W*H/900;i++){b.fillStyle=hexA('#ffffff',.15+rnd()*.5);const s=rnd()<.9?1:1.6;b.fillRect(rnd()*W,rnd()*H,s,s);}
 S.stars=[0,1,2].map(layer=>Array.from({length:Math.round(W*H/(9000-layer*2500))},()=>({x:rnd()*W,y:rnd()*H,s:.6+layer*.6+rnd()*.6,p:rnd()*6,l:layer})));
 S.clouds=Array.from({length:7},(_,i)=>({x:rnd()*W,y:rnd()*H*.8,r:(.25+rnd()*.35)*Math.max(W,H),c:m.neb[i%m.neb.length],p:rnd()*6,v:.2+rnd()*.4}));
 S.spiral=Array.from({length:900},(_,i)=>{const arm=i%3,t=rnd();return{a:t*7+arm*Math.PI*2/3+(rnd()-.5)*.35,r:t,c:m.neb[arm%m.neb.length],s:rnd()<.85?1:2};});
 S.planet={x:W*(W<700?.8:.84),y:H*(W<700?.16:.24),r:Math.min(W,H)*(W<700?.09:.075)};S.asteroids=Array.from({length:14},()=>({a:rnd()*7,d:1.3+rnd()*.5,s:1+rnd()*2.5}));
}
function draw(t){requestAnimationFrame(draw);if(document.hidden||visual.scene!=='galaxia')return;const m2=currentMood();if(m2!==mood){mood=m2;build();dirty=true;}const still=reducedMotion();if(still&&!dirty)return;if(t-last<33&&!dirty)return;last=t;dirty=false;
 const time=still?0:t/1000,m=MOODS[mood],c=ctx;c.setTransform(1,0,0,1,0,0);c.drawImage(base,0,0);c.setTransform(dpr,0,0,dpr,0,0);
 // Nebulosas respirando e se movendo
 c.globalCompositeOperation='lighter';for(const n of S.clouds){const x=n.x+Math.sin(time*.03*n.v+n.p)*60,y=n.y+Math.cos(time*.025*n.v+n.p)*40,r=n.r*(1+.08*Math.sin(time*.2+n.p)),g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,hexA(n.c,.16));g.addColorStop(.5,hexA(n.c,.06));g.addColorStop(1,hexA(n.c,0));c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
 // Galáxia espiral girando
 const gx=W*(W<700?.3:.24),gy=H*(W<700?.22:.3),gr=Math.min(W,H)*(W<700?.22:.2),rot=time*.05;const core=c.createRadialGradient(gx,gy,0,gx,gy,gr*.35);core.addColorStop(0,'rgba(255,240,220,.55)');core.addColorStop(1,'rgba(255,240,220,0)');c.fillStyle=core;c.fillRect(gx-gr,gy-gr,gr*2,gr*2);
 for(const p of S.spiral){const a=p.a+rot+p.r*.4,r=p.r*gr;c.fillStyle=hexA(p.c,.25+(1-p.r)*.5);c.fillRect(gx+Math.cos(a)*r,gy+Math.sin(a)*r*.45,p.s,p.s);}
 // Estrelas em 3 camadas com paralaxe lenta e brilho piscando
 for(const layer of S.stars)for(const s of layer){const x=(s.x+time*(2+s.l*5))%W,tw=.4+.6*Math.abs(Math.sin(time*(.6+s.l*.5)+s.p));c.fillStyle=hexA('#ffffff',tw*(.4+s.l*.25));c.beginPath();c.arc(x,s.y,s.s*.6,0,7);c.fill();if(s.l===2&&tw>.92){c.fillRect(x-s.s*2,s.y-.3,s.s*4,.6);c.fillRect(x-.3,s.y-s.s*2,.6,s.s*4);}}
 c.globalCompositeOperation='source-over';
 // Planeta com anel e asteroides orbitando
 const P=S.planet,ring=(front)=>{c.save();c.translate(P.x,P.y);c.rotate(-.35);c.strokeStyle=hexA(m.ring,.55);c.lineWidth=P.r*.12;c.beginPath();c.ellipse(0,0,P.r*1.9,P.r*.5,0,front?0:Math.PI,front?Math.PI:Math.PI*2);c.stroke();c.restore();};
 ring(false);const pg=c.createRadialGradient(P.x-P.r*.4,P.y-P.r*.4,P.r*.1,P.x,P.y,P.r);pg.addColorStop(0,m.planet[0]);pg.addColorStop(1,m.planet[1]);c.fillStyle=pg;c.beginPath();c.arc(P.x,P.y,P.r,0,7);c.fill();
 c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.arc(P.x+P.r*.35,P.y+P.r*.3,P.r*.95,0,7);c.fill();ring(true);
 for(const a of S.asteroids){const ang=a.a+time*.08/a.d,x=P.x+Math.cos(ang)*P.r*a.d*1.6,y=P.y+Math.sin(ang)*P.r*a.d*.45;c.fillStyle='rgba(220,210,255,.55)';c.beginPath();c.arc(x,y,a.s,0,7);c.fill();}
 // Estrelas cadentes
 for(const k of [0,1]){const cyc=(time+k*5.3)%11/11;if(cyc<.07){const q=cyc/.07,x=W*(.15+k*.5)+q*W*.35,y=H*(.08+k*.12)+q*H*.25;const g=c.createLinearGradient(x,y,x-90,y-60);g.addColorStop(0,'rgba(255,255,255,'+(1-q)+')');g.addColorStop(1,'rgba(255,255,255,0)');c.strokeStyle=g;c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-90,y-60);c.stroke();}}
 // Anel de luz no "chão" sob a mesa, para dar apoio e profundidade
 const fx=W/2,fy=H*(W<700?.62:.74),fr=Math.min(W*.42,H*.55),pulse=.75+.25*Math.sin(time*1.2);c.save();c.globalCompositeOperation='lighter';for(let i=0;i<3;i++){c.strokeStyle=hexA(m.neb[i%3],.18*pulse/(i+1));c.lineWidth=2+i*4;c.beginPath();c.ellipse(fx,fy,fr*(1+i*.12),fr*.22*(1+i*.12),0,0,7);c.stroke();}
 const fg=c.createRadialGradient(fx,fy,0,fx,fy,fr);fg.addColorStop(0,hexA(m.neb[0],.18*pulse));fg.addColorStop(1,hexA(m.neb[0],0));c.fillStyle=fg;c.beginPath();c.ellipse(fx,fy,fr,fr*.25,0,0,7);c.fill();c.restore();
 // Vinheta
 const v=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');c.fillStyle=v;c.fillRect(0,0,W,H);
}
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;mood='';dirty=true;}
resize();addEventListener('resize',resize);addEventListener('mq-visual',()=>dirty=true);
new MutationObserver(()=>dirty=true).observe(document.body,{attributes:true,attributeFilter:['data-tone','data-screen']});
requestAnimationFrame(draw);
