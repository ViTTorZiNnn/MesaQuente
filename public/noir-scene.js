// Mapa "Noir Glitch": preto e branco, chuva, persiana, granulado de filme e falhas na tela.
import {visual,reducedMotion} from './visual.js?v=quente23';
const canvas=document.getElementById('noir-cena'),ctx=canvas.getContext('2d',{willReadFrequently:false}),base=document.createElement('canvas'),b=base.getContext('2d'),grain=document.createElement('canvas');
let W=0,H=0,dpr=1,seed=3,last=0,dirty=true,L={},font=false,glitchUntil=0,nextGlitch=3;
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
// Mais falhas no tom picante; quase nenhuma no sério.
const intensity=()=>({adulto:1.6,acido:1.8,casal:1.1,profundo:.6}[document.body.dataset.screen==='game'?document.body.dataset.tone:'']||1);
function makeGrain(){grain.width=grain.height=192;const g=grain.getContext('2d'),img=g.createImageData(192,192);for(let i=0;i<img.data.length;i+=4){const v=Math.random()*255;img.data[i]=img.data[i+1]=img.data[i+2]=v;img.data[i+3]=Math.random()*60;}g.putImageData(img,0,0);}
function build(){seed=3;base.width=W*dpr;base.height=H*dpr;const c=b;c.setTransform(dpr,0,0,dpr,0,0);const narrow=W<700,floorY=H*(narrow?.74:.72);
 let g=c.createLinearGradient(0,0,0,floorY);g.addColorStop(0,'#070707');g.addColorStop(1,'#1c1c1c');c.fillStyle=g;c.fillRect(0,0,W,floorY);
 // Janelão para a cidade
 const wn=narrow?{x:W*.08,y:H*.12,w:W*.84,h:H*.36}:{x:W*.2,y:H*.1,w:W*.6,h:H*.44};L.win=wn;L.floorY=floorY;
 g=c.createLinearGradient(0,wn.y,0,wn.y+wn.h);g.addColorStop(0,'#2a2a2a');g.addColorStop(1,'#4a4a4a');c.fillStyle=g;c.fillRect(wn.x,wn.y,wn.w,wn.h);
 const moon={x:wn.x+wn.w*.78,y:wn.y+wn.h*.25,r:Math.min(wn.w,wn.h)*.09};g=c.createRadialGradient(moon.x,moon.y,0,moon.x,moon.y,moon.r*3);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(wn.x,wn.y,wn.w,wn.h);c.fillStyle='#e8e8e8';c.beginPath();c.arc(moon.x,moon.y,moon.r,0,7);c.fill();
 for(const [shade,hmin,hmax,gap] of [['#141414',.3,.6,0],['#050505',.15,.45,1]]){let x=wn.x;while(x<wn.x+wn.w){const bw=wn.w*(.04+rnd()*.07),bh=wn.h*(hmin+rnd()*(hmax-hmin));c.fillStyle=shade;c.fillRect(x,wn.y+wn.h-bh,bw,bh);if(shade==='#050505')for(let yy=wn.y+wn.h-bh+5;yy<wn.y+wn.h-4;yy+=7)for(let xx=x+3;xx<x+bw-3;xx+=6)if(rnd()<.3){c.fillStyle='rgba(255,255,255,'+(.4+rnd()*.5)+')';c.fillRect(xx,yy,2.5,3);c.fillStyle=shade;}x+=bw+gap*2;}}
 c.strokeStyle='#000';c.lineWidth=Math.max(6,wn.w*.012);c.strokeRect(wn.x,wn.y,wn.w,wn.h);c.lineWidth=Math.max(3,wn.w*.006);for(let k=1;k<4;k++){c.beginPath();c.moveTo(wn.x+wn.w*k/4,wn.y);c.lineTo(wn.x+wn.w*k/4,wn.y+wn.h);c.stroke();}c.beginPath();c.moveTo(wn.x,wn.y+wn.h*.5);c.lineTo(wn.x+wn.w,wn.y+wn.h*.5);c.stroke();
 // Luz da persiana atravessando a parede
 c.save();c.globalCompositeOperation='lighter';for(let k=0;k<9;k++){const y=H*.08+k*H*.05;c.fillStyle='rgba(255,255,255,.035)';c.beginPath();c.moveTo(W*.55,y);c.lineTo(W*1.05,y+H*.2);c.lineTo(W*1.05,y+H*.2+H*.022);c.lineTo(W*.55,y+H*.022);c.closePath();c.fill();}c.restore();
 // Piso com tábuas em perspectiva
 g=c.createLinearGradient(0,floorY,0,H);g.addColorStop(0,'#101010');g.addColorStop(1,'#262626');c.fillStyle=g;c.fillRect(0,floorY,W,H-floorY);c.strokeStyle='rgba(0,0,0,.6)';c.lineWidth=1;for(let k=-12;k<=12;k++){c.beginPath();c.moveTo(W/2+k*W*.02,floorY);c.lineTo(W/2+k*W*.16,H);c.stroke();}
 g=c.createLinearGradient(0,floorY,0,floorY+H*.12);g.addColorStop(0,'rgba(255,255,255,.08)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(wn.x,floorY,wn.w,H*.12);
 c.fillStyle='#000';c.fillRect(0,floorY-4,W,4);
 L.rain=Array.from({length:110},()=>({x:rnd(),y:rnd(),v:.7+rnd()*.8,l:6+rnd()*12}));L.drops=Array.from({length:40},()=>({x:rnd(),y:rnd(),r:1+rnd()*2.2,v:.02+rnd()*.06}));
 L.sign={x:W/2,y:narrow?H*.06:H*.07,size:narrow?W*.07:Math.min(W*.03,H*.05)};
}
function glitch(c,time,k){// faixas deslocadas, chiado e flash invertido
 const n=Math.round(3+k*5);for(let i=0;i<n;i++){const y=Math.random()*H,h=4+Math.random()*H*.06*k,dx=(Math.random()-.5)*60*k;c.drawImage(canvas,0,y*dpr,W*dpr,h*dpr,dx,y,W,h);}
 if(Math.random()<.5*k){const y=Math.random()*H;for(let x=0;x<W;x+=3){c.fillStyle='rgba(255,255,255,'+Math.random()*.6+')';c.fillRect(x,y+Math.random()*8,2,1+Math.random()*3);}}
 if(Math.random()<.12*k){c.globalCompositeOperation='difference';c.fillStyle='#fff';c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over';}
}
function draw(t){requestAnimationFrame(draw);if(document.hidden||visual.scene!=='noir')return;const still=reducedMotion();if(still&&!dirty)return;if(t-last<40&&!dirty)return;last=t;dirty=false;const time=still?0:t/1000,c=ctx,k=intensity();
 c.setTransform(1,0,0,1,0,0);c.drawImage(base,0,0);c.setTransform(dpr,0,0,dpr,0,0);const wn=L.win;
 // Relâmpago ocasional
 const flash=(time%17)<.18||((time%17)>.3&&(time%17)<.38);if(flash&&!still){c.fillStyle='rgba(255,255,255,.35)';c.fillRect(wn.x,wn.y,wn.w,wn.h);}
 // Chuva e gotas no vidro
 c.save();c.beginPath();c.rect(wn.x,wn.y,wn.w,wn.h);c.clip();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1;for(const d of L.rain){const y=wn.y+((d.y+time*d.v)%1)*wn.h,x=wn.x+d.x*wn.w;c.beginPath();c.moveTo(x,y);c.lineTo(x-2,y+d.l);c.stroke();}
 for(const d of L.drops){const y=wn.y+((d.y+time*d.v)%1)*wn.h;c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.arc(wn.x+d.x*wn.w,y,d.r,0,7);c.fill();}c.restore();
 // Letreiro neon branco piscando
 if(font&&['game','end'].includes(document.body.dataset.screen)){const s=L.sign,on=(Math.sin(time*9)+Math.sin(time*5.3)>1.75)?.35:1;c.save();c.font=`${s.size}px Bungee`;c.textAlign='center';c.textBaseline='middle';c.globalAlpha=on;c.shadowColor='#fff';c.shadowBlur=s.size*.5;c.fillStyle='#f4f4f4';c.fillText('MESA QUENTE',s.x,s.y);c.restore();}
 // Lâmpada pendurada balançando com cone de luz
 const ang=Math.sin(time*.8)*.08,lx=W/2+Math.sin(ang)*H*.3,ly=H*.04+Math.cos(ang)*H*.06;c.strokeStyle='#000';c.lineWidth=2;c.beginPath();c.moveTo(W/2,0);c.lineTo(lx,ly);c.stroke();
 c.save();c.globalCompositeOperation='lighter';const cone=c.createLinearGradient(lx,ly,lx,L.floorY);cone.addColorStop(0,'rgba(255,255,255,.16)');cone.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=cone;c.beginPath();c.moveTo(lx-8,ly);c.lineTo(lx+8,ly);c.lineTo(lx+W*.28+Math.sin(ang)*80,L.floorY+H*.1);c.lineTo(lx-W*.28+Math.sin(ang)*80,L.floorY+H*.1);c.closePath();c.fill();c.restore();
 c.fillStyle='#d8d8d8';c.beginPath();c.arc(lx,ly+6,7,0,7);c.fill();c.fillStyle='#000';c.fillRect(lx-12,ly-3,24,6);
 // Granulado de filme e vinheta
 if(!still){const ox=-Math.random()*192,oy=-Math.random()*192;c.globalAlpha=.55;for(let x=ox;x<W;x+=192)for(let y=oy;y<H;y+=192)c.drawImage(grain,x,y);c.globalAlpha=1;}
 const v=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.25,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.75)');c.fillStyle=v;c.fillRect(0,0,W,H);
 // Falhas periódicas
 if(!still){if(time>nextGlitch){glitchUntil=time+.18+Math.random()*.3*k;nextGlitch=time+(5+Math.random()*6)/k;document.documentElement.classList.add('glitching');setTimeout(()=>document.documentElement.classList.remove('glitching'),260);}if(time<glitchUntil)glitch(c,time,k);}
}
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;build();dirty=true;}
makeGrain();resize();addEventListener('resize',resize);addEventListener('mq-visual',()=>dirty=true);
new MutationObserver(()=>dirty=true).observe(document.body,{attributes:true,attributeFilter:['data-tone','data-screen']});
document.fonts?.load('40px Bungee').then(()=>{font=true;dirty=true;}).catch(()=>{});
requestAnimationFrame(draw);
