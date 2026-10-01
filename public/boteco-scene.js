// Cenário "Boteco": bar brasileiro moderno e minimalista, tons alaranjados e profundidade.
// Camada fixa (parede, azulejo, janela para o morro, prateleira, piso, balcão) + camada animada
// (varal de lâmpadas, letreiro neon, luzes desfocadas em primeiro plano, chuva no tom sério).
import {visual,reducedMotion} from './visual.js?v=quente13';

const MOODS={
 leve:{wall:['#2b1209','#4a1f0c'],tile:'#5a2a14',tileLine:'#7a3a1c',sky:['#120a1e','#2a1430','#5a2232'],light:'#ffb15c',neon:'#ff8a2b',bokeh:'#ff9a3c',floorA:'#6b2d16',floorB:'#3a1a0e'},
 profundo:{wall:['#1c0f0b','#33190f'],tile:'#3f2216',tileLine:'#57301f',sky:['#060b18','#0e1a30','#1a2a44'],light:'#ffc078',neon:'#ffa24a',bokeh:'#ffb36b',floorA:'#4a2414',floorB:'#25120b',rain:true},
 adulto:{wall:['#2a0906','#4a120a'],tile:'#5a1c10',tileLine:'#7c2a16',sky:['#14060c','#2c0c14','#5a1418'],light:'#ff8a4a',neon:'#ff4a1f',bokeh:'#ff6a2a',floorA:'#6b2010',floorB:'#360f08'},
 casal:{wall:['#2a0d10','#4a1a1c'],tile:'#5a2420',tileLine:'#7c3630',sky:['#140818','#2c1028','#5a1e36'],light:'#ffaa7a',neon:'#ff6a5a',bokeh:'#ff8a7a',floorA:'#6b2a22',floorB:'#381512',hearts:true}
};
const canvas=document.getElementById('boteco');
const ctx=canvas.getContext('2d'),base=document.createElement('canvas'),bctx=base.getContext('2d');
let W=0,H=0,dpr=1,mood='',L={},seed=1,last=0,dirty=true,font=false;
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
const alpha=(hex,a)=>hex+Math.round(a*255).toString(16).padStart(2,'0');

function currentMood(){if(document.body.dataset.screen==='game'){const t=document.body.dataset.tone;return MOODS[t]?t:'leve';}return'leve';}
function geometry(){const narrow=W<700;const floorY=H*(narrow?.74:.7);return{narrow,floorY,tileTop:floorY-H*.17,win:narrow?{x:W*.06,y:H*.16,w:W*.34,h:H*.34}:{x:W*.07,y:H*.17,w:W*.2,h:H*.36},shelf:narrow?{x:W*.55,y:H*.2,w:W*.42}:{x:W*.66,y:H*.2,w:W*.28},sign:narrow?{x:W*.5,y:H*.09,size:W*.09}:{x:W*.5,y:H*.295,size:Math.min(W*.045,H*.07)}};}

function build(){
 const m=MOODS[mood];seed=11;L=geometry();base.width=W*dpr;base.height=H*dpr;const c=bctx;c.setTransform(dpr,0,0,dpr,0,0);
 // Parede
 let g=c.createLinearGradient(0,0,0,L.floorY);g.addColorStop(0,m.wall[0]);g.addColorStop(1,m.wall[1]);c.fillStyle=g;c.fillRect(0,0,W,L.floorY);
 // Meia parede de azulejo com motivo simples
 c.fillStyle=m.tile;c.fillRect(0,L.tileTop,W,L.floorY-L.tileTop);const t=Math.max(18,H*.045);c.strokeStyle=alpha(m.tileLine,.8);c.lineWidth=1;
 for(let x=0;x<W;x+=t){c.beginPath();c.moveTo(x,L.tileTop);c.lineTo(x,L.floorY);c.stroke();}for(let y=L.tileTop;y<L.floorY;y+=t){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();}
 c.strokeStyle=alpha(m.tileLine,.45);for(let x=0;x<W;x+=t)for(let y=L.tileTop;y<L.floorY;y+=t){c.beginPath();c.moveTo(x+t/2,y+t*.2);c.lineTo(x+t*.8,y+t/2);c.lineTo(x+t/2,y+t*.8);c.lineTo(x+t*.2,y+t/2);c.closePath();c.stroke();}
 c.fillStyle='#2a140a';c.fillRect(0,L.tileTop-6,W,6);c.fillStyle=alpha('#ffd2a0',.12);c.fillRect(0,L.tileTop-6,W,1);
 // Janela de madeira com o morro iluminado lá fora
 const wn=L.win,r=wn.w/2;c.save();c.beginPath();c.moveTo(wn.x,wn.y+r);c.arc(wn.x+r,wn.y+r,r,Math.PI,0);c.lineTo(wn.x+wn.w,wn.y+wn.h);c.lineTo(wn.x,wn.y+wn.h);c.closePath();c.clip();
 g=c.createLinearGradient(0,wn.y,0,wn.y+wn.h);m.sky.forEach((s,i)=>g.addColorStop(i/(m.sky.length-1),s));c.fillStyle=g;c.fillRect(wn.x,wn.y,wn.w,wn.h);
 for(let i=0;i<40;i++){c.fillStyle=alpha('#ffffff',.2+rnd()*.5);c.fillRect(wn.x+rnd()*wn.w,wn.y+rnd()*wn.h*.45,1.2,1.2);}
 c.fillStyle='#0b0610';c.beginPath();c.moveTo(wn.x,wn.y+wn.h);for(let i=0;i<=24;i++){const x=wn.x+wn.w*i/24;c.lineTo(x,wn.y+wn.h*(.55+.12*Math.sin(i*.5)+.05*Math.sin(i*1.7)));}c.lineTo(wn.x+wn.w,wn.y+wn.h);c.fill();
 for(let i=0;i<120;i++){const x=wn.x+rnd()*wn.w,top=wn.y+wn.h*(.6+.12*Math.sin((x-wn.x)/wn.w*24*.5)),y=top+rnd()*(wn.y+wn.h-top);c.fillStyle=alpha(rnd()<.8?'#ffb15c':'#fff1c9',.5+rnd()*.5);c.fillRect(x,y,1.6,1.6);}
 c.restore();
 c.lineWidth=Math.max(6,wn.w*.06);c.strokeStyle='#3a1c0e';c.beginPath();c.moveTo(wn.x,wn.y+wn.h);c.lineTo(wn.x,wn.y+r);c.arc(wn.x+r,wn.y+r,r,Math.PI,0);c.lineTo(wn.x+wn.w,wn.y+wn.h);c.closePath();c.stroke();
 c.lineWidth=Math.max(2,wn.w*.02);c.beginPath();c.moveTo(wn.x+r,wn.y);c.lineTo(wn.x+r,wn.y+wn.h);c.moveTo(wn.x,wn.y+wn.h*.55);c.lineTo(wn.x+wn.w,wn.y+wn.h*.55);c.stroke();
 c.fillStyle='#2e160a';c.fillRect(wn.x-wn.w*.08,wn.y+wn.h,wn.w*1.16,Math.max(5,H*.012));
 // Prateleira com garrafas e luz de fundo
 const sh=L.shelf;for(let k=0;k<2;k++){const y=sh.y+k*H*.12;g=c.createRadialGradient(sh.x+sh.w/2,y+H*.04,4,sh.x+sh.w/2,y+H*.04,sh.w*.7);g.addColorStop(0,alpha(m.light,.28));g.addColorStop(1,alpha(m.light,0));c.fillStyle=g;c.fillRect(sh.x-sh.w*.2,y-H*.06,sh.w*1.4,H*.14);
  let x=sh.x+6;while(x<sh.x+sh.w-10){const bw=8+rnd()*8,bh=H*(.045+rnd()*.035),tone=['#5a2a10','#7a3a14','#2f3a1a','#6b1e14','#3a2a20'][Math.floor(rnd()*5)];c.fillStyle=tone;const by=y+H*.08-bh;c.beginPath();c.roundRect(x,by,bw,bh,3);c.fill();c.fillRect(x+bw*.35,by-bh*.35,bw*.3,bh*.4);c.fillStyle=alpha('#ffe0b8',.25);c.fillRect(x+bw*.18,by+3,1.5,bh*.6);c.fillStyle=alpha('#fff1d6',.5);c.fillRect(x+2,by+bh*.45,bw-4,bh*.22);x+=bw+4+rnd()*6;}
  c.fillStyle='#3a1c0e';c.fillRect(sh.x-8,y+H*.08,sh.w+16,5);c.fillStyle=alpha(m.light,.6);c.fillRect(sh.x-8,y+H*.08+5,sh.w+16,1.5);}
 // Piso de ladrilho em perspectiva (quadrados de verdade, sem serrilhado)
 const cx=W/2,vy=L.floorY-H*.9,rows=14,cols=26,depth=i=>{const z=1+i*.55;return L.floorY+(H*1.15-L.floorY)*(1-1/z)/(1-1/(1+rows*.55));};
 c.fillStyle=m.floorB;c.fillRect(0,L.floorY,W,H-L.floorY);
 for(let i=0;i<rows;i++){const y0=depth(i),y1=depth(i+1);for(let j=-cols;j<cols;j++){if(((i+j)&1)===0)continue;const xAt=(y,k)=>cx+(k*W/cols*1.4)*(y-vy)/(H-vy);c.fillStyle=m.floorA;c.beginPath();c.moveTo(xAt(y0,j),y0);c.lineTo(xAt(y0,j+1),y0);c.lineTo(xAt(y1,j+1),y1);c.lineTo(xAt(y1,j),y1);c.closePath();c.fill();}}
 g=c.createLinearGradient(0,L.floorY,0,H);g.addColorStop(0,'rgba(12,5,2,.85)');g.addColorStop(.35,'rgba(12,5,2,.25)');g.addColorStop(1,'rgba(12,5,2,.5)');c.fillStyle=g;c.fillRect(0,L.floorY,W,H-L.floorY);
 g=c.createRadialGradient(cx,L.floorY+(H-L.floorY)*.35,10,cx,L.floorY+(H-L.floorY)*.35,W*.45);g.addColorStop(0,alpha(m.light,.2));g.addColorStop(1,alpha(m.light,0));c.fillStyle=g;c.fillRect(0,L.floorY,W,H-L.floorY);
 // Vinheta
 g=c.createRadialGradient(cx,H*.5,Math.min(W,H)*.25,cx,H*.5,Math.max(W,H)*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(8,3,1,.7)');c.fillStyle=g;c.fillRect(0,0,W,H);
 // Varal de lâmpadas e luzes desfocadas
 L.strings=[[0,H*.035,W,H*.06,H*.07],[-W*.05,H*.0,W*1.05,H*.02,H*.12]];L.bulbs=[];L.strings.forEach(([x0,y0,x1,y1,sag],si)=>{const n=Math.round(W/(L.narrow?55:90));for(let i=0;i<=n;i++)L.bulbs.push({si,t2:i/n,r:sag>H*.1?5:3.5,p:rnd()*6});});
 L.bokeh=Array.from({length:10},()=>({x:rnd()*W,y:rnd()<.5?rnd()*H*.25:H*(.8+rnd()*.2),r:20+rnd()*60,p:rnd()*6,v:.2+rnd()*.5}));
 L.rain=Array.from({length:70},()=>({x:rnd(),y:rnd(),v:.6+rnd()*.6}));L.hearts=Array.from({length:12},()=>({x:rnd()*W,y:rnd()*H,p:rnd()*6,v:.2+rnd()*.4}));
 L.motes=Array.from({length:L.narrow?35:70},()=>({x:rnd()*W,y:rnd()*H,v:.3+rnd(),p:rnd()*6,s:.6+rnd()*1.4}));L.smoke=Array.from({length:6},(_,k)=>({x:W*(.35+rnd()*.3),p:k/6,r:30+rnd()*50}));L.twinkle=Array.from({length:18},()=>({x:rnd(),y:.62+rnd()*.35,p:rnd()*6}));L.bpm={leve:132,profundo:74,adulto:66,casal:70}[mood]||100;
}
function draw(t){requestAnimationFrame(draw);if(document.hidden||visual.scene!=='boteco')return;const m2=currentMood();if(m2!==mood){mood=m2;build();dirty=true;}const still=reducedMotion();if(still&&!dirty)return;if(t-last<33&&!dirty)return;last=t;dirty=false;const time=still?0:t/1000,m=MOODS[mood],c=ctx;
 c.setTransform(1,0,0,1,0,0);c.drawImage(base,0,0);c.setTransform(dpr,0,0,dpr,0,0);
 // Chuva na janela (tom sério)
 if(m.rain){const wn=L.win;c.save();c.beginPath();c.rect(wn.x,wn.y,wn.w,wn.h);c.clip();c.strokeStyle='rgba(180,200,255,.35)';c.lineWidth=1;for(const d of L.rain){const y=wn.y+((d.y+time*d.v*.6)%1)*wn.h,x=wn.x+d.x*wn.w;c.beginPath();c.moveTo(x,y);c.lineTo(x-2,y+9);c.stroke();}c.restore();}
 // Letreiro neon (fora da tela inicial)
 if(['game','end'].includes(document.body.dataset.screen)&&font&&!L.narrow){const s=L.sign,flick=((Math.sin(time*11)+Math.sin(time*6.7)>1.8)?.4:1)*(.88+.12*Math.sin(time*2.1));c.save();c.font=`${s.size}px Pacifico`;c.textAlign='center';c.textBaseline='middle';c.globalAlpha=flick;c.shadowColor=m.neon;c.shadowBlur=s.size*(.5+.25*Math.sin(time*2.1));c.fillStyle=m.neon;c.fillText('Mesa Quente',s.x,s.y);c.shadowBlur=s.size*.25;c.fillStyle='#ffe7cc';c.fillText('Mesa Quente',s.x,s.y);c.restore();}
 // Vida na janela: luzes do morro piscando, faróis passando e estrela cadente
 {const wn=L.win;c.save();c.beginPath();c.rect(wn.x,wn.y,wn.w,wn.h);c.clip();for(const k of L.twinkle){c.fillStyle=alpha('#ffd08a',.35+.65*Math.max(0,Math.sin(time*1.7+k.p*3)));c.fillRect(wn.x+k.x*wn.w,wn.y+k.y*wn.h,2,2);}
  const car=(time%9)/9;if(car<.6){const x=wn.x-20+car/.6*(wn.w+40),y=wn.y+wn.h*.93;const g=c.createRadialGradient(x,y,0,x,y,18);g.addColorStop(0,'rgba(255,240,200,.9)');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(x-18,y-18,36,36);c.fillStyle='rgba(255,60,40,.8)';c.fillRect(x-28,y-1,3,2);}
  const st=(time%13)/13;if(st<.08){const k=st/.08,x=wn.x+wn.w*(.2+k*.6),y=wn.y+wn.h*(.08+k*.18);c.strokeStyle='rgba(255,255,255,'+(1-k)+')';c.lineWidth=1.5;c.beginPath();c.moveTo(x,y);c.lineTo(x-18,y-6);c.stroke();}c.restore();}
 // Faixa de LED da prateleira pulsando no ritmo da música
 {const sh=L.shelf,beat=.5+.5*Math.cos(time*Math.PI*2*L.bpm/60);for(let k=0;k<2;k++){const y=sh.y+k*H*.12+H*.08+5;c.fillStyle=alpha(m.light,.25+.5*beat*beat);c.fillRect(sh.x-8,y,sh.w+16,2);}}
 // Fumaça subindo devagar
 c.globalCompositeOperation='lighter';for(const f of L.smoke){const k=(time*.04+f.p)%1,y=H*(.95-k*.6),x=f.x+Math.sin(time*.3+f.p*7)*30,r=f.r*(1+k);const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,alpha(m.light,.05*Math.sin(k*Math.PI)));g.addColorStop(1,alpha(m.light,0));c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}c.globalCompositeOperation='source-over';
 // Fios e lâmpadas balançando
 const sway=si=>Math.sin(time*.9+si*1.7)*H*.008,pos=b=>{const [x0,y0,x1,y1,sag]=L.strings[b.si],t2=b.t2;return[x0+(x1-x0)*t2+Math.sin(time*.9+b.si)*3*Math.sin(t2*Math.PI),y0+(y1-y0)*t2+Math.sin(t2*Math.PI)*(sag+sway(b.si))];};
 c.strokeStyle='rgba(20,8,4,.9)';c.lineWidth=1.5;L.strings.forEach(([x0,y0,x1,y1,sag],si)=>{c.beginPath();for(let i=0;i<=40;i++){const [x,y]=pos({si,t2:i/40});i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();});
 c.globalCompositeOperation='lighter';for(const b of L.bulbs){const [bx,by]=pos(b),f=.8+.2*Math.sin(time*2.3+b.p)*Math.sin(time*.7+b.p*2),g=c.createRadialGradient(bx,by+b.r,0,bx,by+b.r,b.r*8);g.addColorStop(0,alpha(m.light,.55*f));g.addColorStop(1,alpha(m.light,0));c.fillStyle=g;c.fillRect(bx-b.r*8,by+b.r-b.r*8,b.r*16,b.r*16);c.fillStyle=alpha('#fff3dc',.95*f);c.beginPath();c.ellipse(bx,by+b.r,b.r*.7,b.r,0,0,7);c.fill();}
 // Poeira dourada flutuando na luz
 for(const q of L.motes){const y=(q.y-time*6*q.v+H*20)%H,x=q.x+Math.sin(time*.4*q.v+q.p)*14;c.fillStyle=alpha('#ffd9a0',.25+.35*Math.sin(time*1.3+q.p)**2);c.beginPath();c.arc(x,y,q.s,0,7);c.fill();}
 // Luzes desfocadas (profundidade)
 for(const k of L.bokeh){const x=k.x+Math.sin(time*.1*k.v+k.p)*20,y=k.y+Math.cos(time*.08*k.v+k.p)*10,g=c.createRadialGradient(x,y,0,x,y,k.r);g.addColorStop(0,alpha(m.bokeh,.13));g.addColorStop(.7,alpha(m.bokeh,.07));g.addColorStop(1,alpha(m.bokeh,0));c.fillStyle=g;c.beginPath();c.arc(x,y,k.r,0,7);c.fill();}
 if(m.hearts)for(const h of L.hearts){const y=(h.y-time*12*h.v+H*10)%H,x=h.x+Math.sin(time+h.p)*8;c.fillStyle=alpha(m.neon,.25+.15*Math.sin(time*2+h.p));c.font='12px sans-serif';c.fillText('♥',x,y);}
 c.globalCompositeOperation='source-over';
}
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;mood='';dirty=true;}
resize();addEventListener('resize',resize);addEventListener('mq-visual',()=>dirty=true);
new MutationObserver(()=>dirty=true).observe(document.body,{attributes:true,attributeFilter:['data-tone','data-screen']});
document.fonts?.load('40px Pacifico').then(()=>{font=true;dirty=true;}).catch(()=>{});
requestAnimationFrame(draw);
