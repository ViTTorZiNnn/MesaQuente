// Mapa "Mesa Quente" (padrão): as cores da logo — vermelho vivo, branco e preto profundo.
// Parede e piso de aço, fita de LED vermelha, cartas caindo e espalhadas no chão,
// e chamas em pixel art subindo pelas bordas e cantos da tela.
import {visual,reducedMotion} from './visual.js?v=quente20';
const canvas=document.getElementById('quente-cena'),ctx=canvas.getContext('2d'),base=document.createElement('canvas'),b=base.getContext('2d');
const fireCanvas=document.createElement('canvas'),fc=fireCanvas.getContext('2d'),topCanvas=document.createElement('canvas'),tc=topCanvas.getContext('2d');
let W=0,H=0,dpr=1,seed=11,last=0,lastFire=0,dirty=true,L={},fire=null,cols=0,rows=0,px=6,img=null,heat=1,decay=1,tick=0;
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
// Paleta da chama: transparente → vinho → vermelho da logo → laranja → amarelo → branco.
const STOPS=[[0,[0,0,0,0]],[3,[40,0,4,140]],[8,[120,0,10,220]],[14,[214,0,24,255]],[20,[255,32,40,255]],[26,[255,98,26,255]],[31,[255,176,48,255]],[36,[255,246,214,255]]];
const PAL=Array.from({length:37},(_,i)=>{let k=0;while(STOPS[k+1][0]<i)k++;const [i0,c0]=STOPS[k],[i1,c1]=STOPS[k+1],t=(i-i0)/(i1-i0||1);return c0.map((v,j)=>Math.round(v+(c1[j]-v)*t));});
// Altura das chamas: mais altas no menu, discretas durante o jogo (mais fortes no tom picante).
// O lobby é calmo: pouca chama, sem cartas caindo, fundo mais escuro (os painéis precisam ser lidos).
const calmo=()=>({home:0,end:.2,lobby:1,game:.75}[document.body.dataset.screen]??0);let calma=0;
function heatTarget(){const s=document.body.dataset.screen;if(s==='lobby')return .42;if(s!=='game')return s==='end'?1.05:1;return{adulto:.85,casal:.75,profundo:.5}[document.body.dataset.tone]||.62;}
// Cantos altos, meio baixo; as "línguas" de fogo vêm de colunas que acendem e apagam.
function profile(x){const e=Math.min(x,cols-1-x)/cols;return e<.05?1:e<.22?1-(e-.05)/.17*.62:.38;}
function seedFire(){tick++;const row=(rows-1)*cols;for(let x=0;x<cols;x++){const wave=.78+.22*Math.sin(x*.55+tick*.21)*Math.sin(x*.13-tick*.07),gap=Math.random()<.08?.4:1;fire[row+x]=Math.round(36*Math.min(1,profile(x)*heat*wave*gap));}}
function stepFire(){for(let x=0;x<cols;x++)for(let y=1;y<rows;y++){const src=y*cols+x,v=fire[src];if(!v){fire[src-cols]=0;continue;}const r=Math.random()*3|0,dst=src-cols-r+1,d=Math.random()<decay%1?Math.ceil(decay):Math.floor(decay);if(dst>=0)fire[dst]=Math.max(0,v-d);}}
function paintFire(){const d=img.data;for(let i=0;i<fire.length;i++){const c=PAL[fire[i]],o=i*4;d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=c[3];}fc.putImageData(img,0,0);}
function cardShape(c,w,h,kind,alpha=1){const r=w*.12;c.save();c.globalAlpha=alpha;c.fillStyle='#fff6ea';c.beginPath();c.roundRect(-w/2,-h/2,w,h,r);c.fill();
 const inner=kind===0?'#e3101f':kind===1?'#141014':'#fff6ea';c.fillStyle=inner;c.beginPath();c.roundRect(-w/2+w*.08,-h/2+w*.08,w*.84,h-w*.16,r*.7);c.fill();
 if(kind===2){c.strokeStyle='#e3101f';c.lineWidth=Math.max(1,w*.05);c.stroke();}
 const s=w*.11;c.fillStyle=kind===1?'#fff6ea':kind===2?'#e3101f':'#ffb23d';
 if(kind===1){// "?" em pixel
  for(const [x,y] of [[-1,-3],[0,-3],[1,-3],[2,-2],[1,-1],[0,0],[0,2]])c.fillRect(x*s-s/2,y*s,s,s);
 }else{// chama em pixel
  for(const [x,y] of [[0,-3],[0,-2],[1,-2],[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[2,0],[-1,1],[0,1],[1,1]])c.fillRect(x*s-s/2,y*s,s,s);
  if(kind===0){c.fillStyle='#fff3d6';c.fillRect(-s/2,0,s,s);}
 }
 c.restore();}
function build(){seed=11;base.width=W*dpr;base.height=H*dpr;const c=b;c.setTransform(dpr,0,0,dpr,0,0);const narrow=W<700,floorY=H*(narrow?.76:.72);L.floorY=floorY;
 // Parede de aço escovado
 let g=c.createLinearGradient(0,0,0,floorY);g.addColorStop(0,'#060507');g.addColorStop(1,'#141217');c.fillStyle=g;c.fillRect(0,0,W,floorY);
 const pw=narrow?W/3:Math.max(160,W/7);for(let x=0;x<W;x+=pw){g=c.createLinearGradient(x,0,x+pw,0);g.addColorStop(0,'rgba(255,255,255,.035)');g.addColorStop(.5,'rgba(255,255,255,.012)');g.addColorStop(1,'rgba(0,0,0,.25)');c.fillStyle=g;c.fillRect(x,0,pw,floorY);
  c.globalAlpha=.5;for(let k=0;k<70;k++){c.fillStyle='rgba(255,255,255,'+(.012+rnd()*.03)+')';c.fillRect(x+rnd()*pw*.2,rnd()*floorY,pw*(.3+rnd()*.7),1);}c.globalAlpha=1;
  c.fillStyle='#000';c.fillRect(x-1,0,2,floorY);c.fillStyle='rgba(255,255,255,.07)';c.fillRect(x+1,0,1,floorY);
  for(const y of [floorY*.08,floorY*.5,floorY*.92])for(const xx of [x+10,x+pw-10]){c.fillStyle='#000';c.beginPath();c.arc(xx,y+1,3,0,7);c.fill();c.fillStyle='#3a383f';c.beginPath();c.arc(xx,y,3,0,7);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.fillRect(xx-1.5,y-1.5,1.5,1.5);}}
 // Viga horizontal
 g=c.createLinearGradient(0,floorY*.62,0,floorY*.62+14);g.addColorStop(0,'#2a282e');g.addColorStop(.5,'#3c3a42');g.addColorStop(1,'#111');c.fillStyle=g;c.fillRect(0,floorY*.62,W,14);
 // Brilho vermelho atrás da mesa
 g=c.createRadialGradient(W/2,floorY,0,W/2,floorY,Math.max(W,H)*.6);g.addColorStop(0,'rgba(255,24,40,.38)');g.addColorStop(.45,'rgba(150,0,16,.14)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
 // Piso de chapa xadrez de aço em perspectiva
 g=c.createLinearGradient(0,floorY,0,H);g.addColorStop(0,'#0d0c10');g.addColorStop(1,'#1d1b21');c.fillStyle=g;c.fillRect(0,floorY,W,H-floorY);
 c.save();c.beginPath();c.rect(0,floorY,W,H-floorY);c.clip();
 for(let row=0;row<26;row++){const t=row/26,y=floorY+(H-floorY)*t*t*1.05,sz=2+t*7,step=8+t*30;for(let x=(row%2)*step/2-step;x<W+step;x+=step){c.save();c.translate(x,y);c.rotate(((row+Math.round(x/step))%2?1:-1)*.7);c.fillStyle='rgba(255,255,255,'+(.025+t*.035)+')';c.fillRect(-sz,-sz*.22,sz*2,sz*.44);c.restore();}}
 c.strokeStyle='rgba(0,0,0,.55)';c.lineWidth=1.5;for(let k=-10;k<=10;k++){c.beginPath();c.moveTo(W/2+k*W*.04,floorY);c.lineTo(W/2+k*W*.3,H);c.stroke();}
 g=c.createLinearGradient(0,floorY,0,floorY+H*.14);g.addColorStop(0,'rgba(255,30,45,.22)');g.addColorStop(1,'rgba(255,30,45,0)');c.fillStyle=g;c.fillRect(0,floorY,W,H*.14);
 // Cartas espalhadas no chão
 const n=narrow?9:16,cw=Math.max(26,Math.min(W,H)*.045);for(let i=0;i<n;i++){const side=i%2?1:-1,x=W/2+side*(W*.18+rnd()*W*.33),y=floorY+(H-floorY)*(.2+rnd()*.7),s=.7+(y-floorY)/(H-floorY)*.7;c.save();c.translate(x,y);c.rotate((rnd()-.5)*2.4);c.scale(s,s*.55);c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=8;c.shadowOffsetY=4;cardShape(c,cw,cw*1.4,i%3,.9);c.restore();}
 c.restore();
 // Fita de LED vermelha no rodapé
 c.save();c.shadowColor='#ff1e2d';c.shadowBlur=22;c.fillStyle='#ff2a36';c.fillRect(0,floorY-3,W,3);c.restore();c.fillStyle='#ffd9d9';c.fillRect(0,floorY-2,W,1);
 // Cartas caindo
 L.falling=Array.from({length:narrow?7:13},(_,i)=>({x:rnd(),y:rnd(),v:.035+rnd()*.05,rot:rnd()*6,spin:(rnd()-.5)*1.4,flip:rnd()*6,fs:.6+rnd()*1.6,kind:i%3,s:.55+rnd()*.7,sway:rnd()*6}));
 L.embers=Array.from({length:narrow?40:80},()=>({x:rnd(),y:rnd(),v:.05+rnd()*.12,s:rnd()<.8?2:3,p:rnd()*6}));
 L.cw=cw;
 // Grade das chamas em pixel
 px=narrow?5:7;cols=Math.ceil(W/px);rows=Math.ceil(H*(narrow?.3:.36)/px);decay=36/(rows*.92);fire=new Uint8Array(cols*rows);fireCanvas.width=cols;fireCanvas.height=rows;img=fc.createImageData(cols,rows);topCanvas.width=cols;topCanvas.height=rows;
 seedFire();for(let k=0;k<rows*1.5;k++)stepFire();
}
function draw(t){requestAnimationFrame(draw);if(document.hidden||visual.scene!=='quente')return;const still=reducedMotion();if(still&&!dirty)return;if(t-last<33&&!dirty)return;last=t;dirty=false;const time=still?0:t/1000,c=ctx;
 heat+=(heatTarget()-heat)*.05;calma+=(calmo()-calma)*.08;if(still){heat=heatTarget();calma=calmo();}
 c.setTransform(1,0,0,1,0,0);c.drawImage(base,0,0);c.setTransform(dpr,0,0,dpr,0,0);
 // LED pulsando
 const pulse=.55+Math.sin(time*2.2)*.2;c.save();c.globalCompositeOperation='lighter';const g=c.createLinearGradient(0,L.floorY-60,0,L.floorY+30);g.addColorStop(0,'rgba(255,20,40,0)');g.addColorStop(.7,'rgba(255,20,40,'+(.12*pulse)+')');g.addColorStop(1,'rgba(255,20,40,0)');c.fillStyle=g;c.fillRect(0,L.floorY-60,W,90);c.restore();
 // Cartas caindo, girando e virando
 const cw=L.cw,cardsA=1-calma;if(cardsA>.03)for(const f of L.falling){const y=-cw*2+((f.y+time*f.v)%1)*(H+cw*4),x=f.x*W+Math.sin(time*.6+f.sway)*30;c.save();c.translate(x,y);c.rotate(f.rot+time*f.spin*.4);c.scale(Math.cos(f.flip+time*f.fs)*f.s,f.s);c.globalAlpha=(.5+f.s*.35)*cardsA;cardShape(c,cw,cw*1.4,Math.cos(f.flip+time*f.fs)<0?1:f.kind);c.restore();}
 // Chamas em pixel: base em toda a borda inferior e cantos de cima
 if(!still&&t-lastFire>55){lastFire=t;seedFire();stepFire();paintFire();}else if(still)paintFire();
 c.imageSmoothingEnabled=false;const fh=rows*px;c.drawImage(fireCanvas,0,0,cols,rows,0,H-fh,cols*px,fh);
 // Cantos de cima: a mesma chama invertida, só nas laterais
 tc.globalCompositeOperation='source-over';tc.clearRect(0,0,cols,rows);tc.drawImage(fireCanvas,0,0);tc.globalCompositeOperation='destination-in';const m=tc.createLinearGradient(0,0,cols,0);m.addColorStop(0,'#000');m.addColorStop(.12,'rgba(0,0,0,.5)');m.addColorStop(.22,'rgba(0,0,0,0)');m.addColorStop(.78,'rgba(0,0,0,0)');m.addColorStop(.88,'rgba(0,0,0,.5)');m.addColorStop(1,'#000');tc.fillStyle=m;tc.fillRect(0,0,cols,rows);
 c.save();c.globalAlpha=.55;c.translate(0,fh*.45);c.scale(1,-.45);c.drawImage(topCanvas,0,0,cols,rows,0,0,cols*px,fh);c.restore();c.imageSmoothingEnabled=true;
 // Brasas subindo em pixel
 if(!still)for(const e of L.embers){const y=H-((e.y+time*e.v)%1)*H*.9,x=e.x*W+Math.sin(time*1.5+e.p)*14,a=Math.max(0,(y/H)-.1)*(1-calma*.6);c.fillStyle=e.s>2?'rgba(255,230,190,'+a+')':'rgba(255,60,40,'+a+')';c.fillRect(Math.round(x/2)*2,Math.round(y/2)*2,e.s,e.s);}
 if(calma>.01){c.fillStyle='rgba(0,0,0,'+(.45*calma)+')';c.fillRect(0,0,W,H);}
 // Vinheta
 const v=c.createRadialGradient(W/2,H*.45,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.7)');c.fillStyle=v;c.fillRect(0,0,W,H);
}
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;build();dirty=true;}
resize();addEventListener('resize',resize);addEventListener('mq-visual',()=>dirty=true);
new MutationObserver(()=>dirty=true).observe(document.body,{attributes:true,attributeFilter:['data-tone','data-screen']});
requestAnimationFrame(draw);
