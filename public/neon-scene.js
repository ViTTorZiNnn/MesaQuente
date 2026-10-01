// Cenário "Lounge Neon" em pixel art, desenhado ao vivo em baixa resolução e ampliado sem suavização.
// Muda de clima conforme a tela e o tom das cartas (body[data-tone]): lobby, leve, profundo, adulto, casal.
import {visual,reducedMotion} from './visual.js?v=quente10';

const PAL={
 lobby:{sky:['#0b0420','#1d0b3d','#3d0f5c','#7a1a6e','#c2306d'],city:'#140b28',city2:'#22143d',lit:['#ffd36b','#6ff2ff','#ff6bd6'],neon:'#ff3df0',neon2:'#38f6ff',wall:'#170d22',wall2:'#21132e',floor:'#120a1c',floor2:'#1b1029',moon:'#ffe9c7',fx:'dust'},
 leve:{sky:['#1a0b2e','#40164f','#8a2b5a','#e0564a','#ffa24c'],city:'#1c0d26',city2:'#2e1535',lit:['#ffe08a','#ffb35c','#fff1c9'],neon:'#ffb347',neon2:'#38f6ff',wall:'#1d1020',wall2:'#28152a',floor:'#170c18',floor2:'#221222',moon:'#fff3d6',fx:'fireflies'},
 profundo:{sky:['#030814','#071a33','#0c2c52','#123f6b','#1f5a85'],city:'#06101f',city2:'#0b1a30',lit:['#9fd4ff','#5aa8ff','#e1f2ff'],neon:'#5aa8ff',neon2:'#a0e9ff',wall:'#0b1220',wall2:'#111b2c',floor:'#080e19',floor2:'#0d1524',moon:'#dfefff',fx:'rain'},
 adulto:{sky:['#0a0208','#22030f','#45061c','#7a0b2b','#b3123a'],city:'#160309',city2:'#26060f',lit:['#ff6b6b','#ffb347','#ff2d55'],neon:'#ff2d55',neon2:'#ff9a3d',wall:'#1a060c',wall2:'#250a12',floor:'#12040a',floor2:'#1c0710',moon:'#ffd0c2',fx:'embers'},
 casal:{sky:['#12041c','#2c0838','#521055','#8a1c73','#d0358f'],city:'#1a0624',city2:'#2a0b38',lit:['#ffb3e6','#ff4fd8','#ffe1f5'],neon:'#ff4fd8',neon2:'#ffd1f0',wall:'#1a0820',wall2:'#250c2c',floor:'#130616',floor2:'#1d0a22',moon:'#ffe6f4',fx:'hearts'}
};
const FONT={M:['10001','11011','10101','10001','10001'],E:['11111','10000','11110','10000','11111'],S:['01111','10000','01110','00001','11110'],A:['01110','10001','11111','10001','10001'],Q:['01110','10001','10101','10010','01101'],U:['10001','10001','10001','10001','01110'],N:['10001','11001','10101','10011','10001'],T:['11111','00100','00100','00100','00100'],' ':['00000','00000','00000','00000','00000']};
const HEART=['01010','11111','01110','00100'];

const canvas=document.createElement('canvas');canvas.className='neon-scene';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);
const ctx=canvas.getContext('2d');const layer=document.createElement('canvas'),lctx=layer.getContext('2d');
let w=320,h=200,L={},mood='',seed=1,last=0,dirty=true,particles=[];
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
const hex=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
const BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];

function currentMood(){const s=document.body.dataset.screen;if(s==='game'){const t=document.body.dataset.tone;return PAL[t]?t:'leve';}return'lobby';}
function layout(){const narrow=w<170;const wx0=Math.round(w*(narrow?.06:.14)),wx1=w-wx0;return{narrow,wx0,wx1,wy0:Math.round(h*.1),wy1:Math.round(h*.58),floorY:Math.round(h*.72),vy:Math.round(h*.72-h*.45)};}

function build(){
 const p=PAL[mood];seed=7;L=layout();layer.width=w;layer.height=h;const img=lctx.createImageData(w,h),d=img.data;
 const set=(x,y,c,a=1)=>{if(x<0||y<0||x>=w||y>=h)return;const i=(y*w+x)*4;d[i]=Math.round(d[i]*(1-a)+c[0]*a);d[i+1]=Math.round(d[i+1]*(1-a)+c[1]*a);d[i+2]=Math.round(d[i+2]*(1-a)+c[2]*a);d[i+3]=255;};
 const sky=p.sky.map(hex),wall=hex(p.wall),wall2=hex(p.wall2),f1=hex(p.floor),f2=hex(p.floor2),neon=hex(p.neon),neon2=hex(p.neon2);
 // Parede com tijolos discretos
 for(let y=0;y<L.floorY;y++)for(let x=0;x<w;x++){const row=Math.floor(y/4),brick=(y%4===0)||((x+(row%2?4:0))%9===0);set(x,y,brick?wall:wall2);}
 // Céu com degradê pontilhado
 for(let y=L.wy0;y<L.wy1;y++){const t=(y-L.wy0)/(L.wy1-L.wy0)*(sky.length-1),i=Math.min(sky.length-2,Math.floor(t)),f=t-i;for(let x=L.wx0;x<L.wx1;x++)set(x,y,f*16>BAYER[y%4][x%4]?sky[i+1]:sky[i]);}
 // Estrelas fixas
 for(let i=0;i<w*.5;i++){const x=L.wx0+Math.floor(rnd()*(L.wx1-L.wx0)),y=L.wy0+Math.floor(rnd()*(L.wy1-L.wy0)*.55);set(x,y,[255,255,255],.35+rnd()*.5);}
 // Lua
 const mx=Math.round(L.wx1-(L.wx1-L.wx0)*.2),my=Math.round(L.wy0+(L.wy1-L.wy0)*.24),mr=Math.max(4,Math.round(h*.045)),moon=hex(p.moon);
 for(let y=-mr-3;y<=mr+3;y++)for(let x=-mr-3;x<=mr+3;x++){const r=Math.hypot(x,y);if(r<=mr)set(mx+x,my+y,(x+y)%5===0&&r<mr-1&&rnd()<.25?mix(moon,[150,150,170],.3):moon);else if(r<=mr+3)set(mx+x,my+y,moon,.12);}
 // Cidade em duas camadas, com janelas acesas
 const city=hex(p.city),city2=hex(p.city2),lits=p.lit.map(hex);L.windows=[];L.antennas=[];
 for(const [col,base,hmin,hmax] of [[city2,L.wy1,.18,.42],[city,L.wy1,.08,.3]]){let x=L.wx0-2;while(x<L.wx1){const bw=6+Math.floor(rnd()*12),bh=Math.round((L.wy1-L.wy0)*(hmin+rnd()*(hmax-hmin)));const top=base-bh;for(let yy=top;yy<base;yy++)for(let xx=x;xx<x+bw;xx++)if(xx>=L.wx0&&xx<L.wx1)set(xx,yy,col);
  if(col===city){for(let yy=top+2;yy<base-1;yy+=3)for(let xx=x+1;xx<x+bw-1;xx+=2)if(xx>=L.wx0&&xx<L.wx1&&rnd()<.38){const c=lits[Math.floor(rnd()*lits.length)];set(xx,yy,c);L.windows.push([xx,yy,c]);}if(rnd()<.3&&x+bw/2>L.wx0&&x+bw/2<L.wx1){const ax=Math.round(x+bw/2);for(let yy=top-4;yy<top;yy++)set(ax,yy,col);L.antennas.push([ax,top-5]);}}
  x+=bw+(col===city?1:0);}}
 // Moldura e divisórias da janela
 const frame=mix(wall2,neon2,.18),mull=L.narrow?1:3;
 for(let x=L.wx0-2;x<L.wx1+2;x++){for(const y of [L.wy0-2,L.wy0-1,L.wy1,L.wy1+1])set(x,y,frame);set(x,L.wy1+2,mix(frame,[255,255,255],.25));}
 for(let y=L.wy0-2;y<L.wy1+2;y++)for(const x of [L.wx0-2,L.wx0-1,L.wx1,L.wx1+1])set(x,y,frame);
 for(let k=1;k<=mull;k++){const x=Math.round(L.wx0+(L.wx1-L.wx0)*k/(mull+1));for(let y=L.wy0;y<L.wy1;y++)set(x,y,frame);}
 // Reflexo diagonal no vidro
 for(let k=0;k<(L.wy1-L.wy0);k++){const x=L.wx0+8+k,y=L.wy1-1-k;if(x<L.wx1)set(x,y,[255,255,255],.06);if(x+3<L.wx1)set(x+3,y,[255,255,255],.04);}
 // Rodapé com faixa neon
 for(let x=0;x<w;x++){set(x,L.floorY-2,mix(neon2,wall,.35));set(x,L.floorY-1,neon2,.85);}
 // Piso em perspectiva com reflexo do neon
 for(let y=L.floorY;y<h;y++){const dz=1/Math.max(1,y-L.vy);for(let x=0;x<w;x++){const u=(x-w/2)*dz*7,v=dz*260;const c=((Math.floor(u)+Math.floor(v))&1)?f1:f2;set(x,y,c);
  const depth=(y-L.floorY)/(h-L.floorY);if(x>L.wx0&&x<L.wx1&&(y%2===0)){set(x,y,neon,.16*(1-depth));}}}
 // Fliperama (esquerda) e planta (direita) quando há espaço
 if(!L.narrow){const cx=Math.max(2,L.wx0-22),cy=L.floorY+6,ch=Math.round(h*.3),cab=hex('#1d1530'),side=hex('#2b2048');
  for(let y=cy-ch;y<cy;y++)for(let x=cx;x<cx+16;x++)set(x,y,x<cx+2?side:cab);L.screen=[cx+3,cy-ch+5,10,8];
  for(let x=cx+2;x<cx+14;x++)set(x,cy-ch+16,mix(cab,neon,.5));for(let x=cx+4;x<cx+12;x+=3)set(x,cy-ch+18,neon2);
  const px=Math.min(w-14,L.wx1+8),py=L.floorY+5,leaf=hex('#1f6b4a'),leaf2=hex('#2f9a64'),pot=hex('#5a2d3c');
  for(let y=py-7;y<py;y++)for(let x=px;x<px+9;x++)set(x,y,pot);
  for(let k=0;k<9;k++){const a=Math.PI*(.12+.76*k/8),len=h*(.08+rnd()*.07);for(let t=0;t<len;t++){const bend=t/len,x=Math.round(px+4+Math.cos(a)*t*.9),y=Math.round(py-8-Math.sin(a)*t+bend*bend*len*.35);set(x,y,t%3?leaf:leaf2);set(x+1,y,leaf);if(t>len*.3&&t%2)set(x,y-1,leaf2);}}}
 lctx.putImageData(img,0,0);
 // Letreiro: posição e escala
 const text=L.narrow?['MESA','QUENTE']:['MESA QUENTE'];const maxw=(L.wx1-L.wx0)*.82;let s=1;while(s<(L.narrow?2:4)&&Math.max(...text.map(t=>t.length*6-1))*(s+1)<=maxw)s++;L.sign={text,s,y:L.wy0+Math.max(4,Math.round(h*.03))};
 particles=Array.from({length:p.fx==='rain'?Math.round(w*.5):Math.round(w*.12)},()=>({x:rnd()*w,y:rnd()*h,v:.3+rnd()*.7,o:rnd()*6.28}));
}
function glyph(t,x0,y0,s,inset=0){let x=x0;const k=s-inset*2;if(k<1)return;for(const ch of t){const g=FONT[ch]||FONT[' '];for(let r=0;r<5;r++)for(let c=0;c<5;c++)if(g[r][c]==='1')ctx.fillRect(x+c*s+inset,y0+r*s+inset,k,k);x+=6*s;}}
function sign(time,p){const {text,s,y}=L.sign;const flick=(Math.sin(time*13)+Math.sin(time*7.3)>1.85)?.35:1;text.forEach((t,i)=>{const tw=t.length*6*s-s,x=Math.round(w/2-tw/2),yy=y+i*(6*s+2);
 ctx.fillStyle=p.neon;ctx.globalAlpha=.16*flick;for(const [dx,dy] of [[-2,0],[2,0],[0,-2],[0,2],[-1,-1],[1,1],[1,-1],[-1,1]])glyph(t,x+dx,yy+dy,s);
 ctx.globalAlpha=flick;glyph(t,x,yy,s);if(s>=3){ctx.fillStyle='#fff';ctx.globalAlpha=.7*flick;glyph(t,x,yy,s,1);}});ctx.globalAlpha=1;}
function draw(t){requestAnimationFrame(draw);if(visual.scene!=='neon'||document.hidden)return;const m=currentMood();if(m!==mood){mood=m;dirty=true;build();}const still=reducedMotion();if(still&&!dirty)return;if(t-last<66&&!dirty)return;last=t;dirty=false;const time=still?0:t/1000,p=PAL[mood];
 ctx.globalAlpha=1;ctx.drawImage(layer,0,0);
 // Estrelas piscando e janelas que acendem/apagam
 for(let i=0;i<L.windows.length;i+=7){const [x,y,c]=L.windows[i];if(Math.sin(time*.7+i)>.92){ctx.fillStyle=PAL[mood].city;ctx.fillRect(x,y,1,1);}}
 for(const [x,y] of L.antennas){ctx.fillStyle=Math.sin(time*3+x)>0?'#ff3b3b':'#5a1010';ctx.fillRect(x,y,1,1);}
 // Tela do fliperama
 if(L.screen){const [x,y,sw,sh]=L.screen;for(let yy=0;yy<sh;yy++){ctx.fillStyle=`hsl(${(time*60+yy*12)%360},80%,${45+(yy%2)*10}%)`;ctx.fillRect(x,y+yy,sw,1);}}
 // Luminárias com cone de luz
 ctx.globalCompositeOperation='lighter';for(const fx of [.3,.7]){const x=Math.round(w*fx),cy=Math.round(h*.07);ctx.globalAlpha=1;ctx.fillStyle=p.wall2;ctx.fillRect(x,0,1,cy);ctx.fillStyle=p.neon2;ctx.fillRect(x-3,cy,7,2);const hh=L.floorY-cy;for(let k=0;k<hh;k+=1){const half=Math.round(3+k*.35);ctx.globalAlpha=.05*(1-k/hh)*(0.85+.15*Math.sin(time*2+fx*9));ctx.fillRect(x-half,cy+2+k,half*2+1,1);}}
 ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
 if(['game','end'].includes(document.body.dataset.screen))sign(time,p);
 // Partículas por clima
 for(const q of particles){if(p.fx==='rain'){q.y+=4*q.v;q.x-=.6*q.v;if(q.y>h){q.y=-4;q.x=rnd()*w;}ctx.globalAlpha=.35;ctx.fillStyle=p.neon2;ctx.fillRect(Math.round(q.x),Math.round(q.y),1,3);}
  else if(p.fx==='hearts'){q.y-=.35*q.v;q.x+=Math.sin(time+q.o)*.15;if(q.y<-5){q.y=h+5;q.x=rnd()*w;}ctx.globalAlpha=.35+.25*Math.sin(time*2+q.o);ctx.fillStyle=p.neon;HEART.forEach((r,ry)=>[...r].forEach((b,rx)=>{if(b==='1')ctx.fillRect(Math.round(q.x)+rx,Math.round(q.y)+ry,1,1);}));}
  else if(p.fx==='embers'){q.y-=.5*q.v;q.x+=Math.sin(time*2+q.o)*.25;if(q.y<0){q.y=h;q.x=rnd()*w;}ctx.globalAlpha=.5+.4*Math.sin(time*5+q.o);ctx.fillStyle=q.v>.7?p.neon2:p.neon;ctx.fillRect(Math.round(q.x),Math.round(q.y),1,1);}
  else{q.y-=.12*q.v;q.x+=Math.sin(time*.5+q.o)*.1;if(q.y<0){q.y=h;q.x=rnd()*w;}ctx.globalAlpha=(p.fx==='fireflies'?.6:.3)*(.5+.5*Math.sin(time*(p.fx==='fireflies'?3:1)+q.o));ctx.fillStyle=p.fx==='fireflies'?'#ffe28a':'#9ff6ff';ctx.fillRect(Math.round(q.x),Math.round(q.y),1,1);}}
 ctx.globalAlpha=1;
}
function resize(){const P=Math.max(2,Math.min(5,Math.round(innerHeight/200)));w=Math.ceil(innerWidth/P);h=Math.ceil(innerHeight/P);canvas.width=w;canvas.height=h;mood='';dirty=true;}
resize();addEventListener('resize',resize);addEventListener('mq-visual',()=>{dirty=true;});
new MutationObserver(()=>{dirty=true;}).observe(document.body,{attributes:true,attributeFilter:['data-tone','data-screen']});
requestAnimationFrame(draw);
