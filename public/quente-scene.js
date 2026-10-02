// Mapa "Mesa Quente" (padrão): a roda vista por uma câmera térmica.
// A mesa e as pessoas em volta são manchas de calor nas cores da logo (preto → vinho → vermelho → laranja → branco).
// Quem está "falando" esquenta, a carta no centro pulsa e o calor sobe da mesa. Em cima, um HUD discreto de câmera.
import {visual,reducedMotion} from './visual.js?v=quente24';
const canvas=document.getElementById('quente-cena'),ctx=canvas.getContext('2d'),field=document.createElement('canvas'),fc=field.getContext('2d');
let W=0,H=0,dpr=1,last=0,dirty=true,fw=0,fh=0,img=null,noise=null,seed=5,people=[],wisps=[],heat=1,calma=0,tempShown=31;
const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
// Paleta térmica com as cores da logo.
const STOPS=[[0,[4,3,6]],[.18,[30,4,14]],[.34,[96,0,22]],[.5,[190,6,32]],[.64,[255,31,45]],[.78,[255,110,40]],[.9,[255,200,80]],[1,[255,250,236]]];
const LUT=new Uint8ClampedArray(256*3);for(let i=0;i<256;i++){const v=i/255;let k=0;while(k<STOPS.length-2&&STOPS[k+1][0]<v)k++;const [a,ca]=STOPS[k],[b,cb]=STOPS[k+1],t=Math.min(1,Math.max(0,(v-a)/(b-a)));for(let j=0;j<3;j++)LUT[i*3+j]=ca[j]+(cb[j]-ca[j])*t;}
// Quanto a mesa "esquenta" em cada tela e clima.
function heatTarget(){const s=document.body.dataset.screen;if(s==='lobby')return .8;if(s!=='game')return 1;return{adulto:1.15,acido:1.1,casal:1.05,profundo:.8}[document.body.dataset.tone]||.92;}
const calmo=()=>({lobby:.55,game:.7,end:.2}[document.body.dataset.screen]??0);
function build(){seed=5;const narrow=W<700;fw=Math.max(80,Math.round(W/(narrow?5:7)));fh=Math.max(60,Math.round(H/(narrow?5:7)));field.width=fw;field.height=fh;img=fc.createImageData(fw,fh);
 noise=new Float32Array(fw*fh);for(let i=0;i<noise.length;i++)noise[i]=(rnd()-.5)*.035;
 // Pessoas em volta de uma mesa oval (vista de cima, em perspectiva).
 const n=narrow?5:7,cx=.5,cy=narrow?.6:.58,rx=narrow?.36:.3,ry=narrow?.2:.24;
 people=Array.from({length:n},(_,i)=>{const a=-Math.PI/2+(i+.5)/n*Math.PI*2;return{a,x:cx+Math.cos(a)*rx,y:cy+Math.sin(a)*ry,ph:rnd()*6,warm:.75+rnd()*.2,cup:rnd()<.5};});
 people.cx=cx;people.cy=cy;people.rx=rx;people.ry=ry;
 wisps=Array.from({length:10},()=>({x:cx+(rnd()-.5)*rx*1.2,p:rnd(),v:.035+rnd()*.03,r:.04+rnd()*.04}));
}
// Soma de manchas gaussianas: cada fonte de calor é {x,y,sx,sy,i} em coordenadas 0..1.
function paint(time){const d=img.data,src=[],k=heat,P=people;const speaker=Math.floor(time/5)%P.length,ramp=Math.min(1,(time%5)/1.2),fade=Math.min(1,(5-(time%5))/1.2);
 const aspect=W/H;
 // a mesa morna e a carta no centro pulsando
 src.push({x:P.cx,y:P.cy,sx:P.rx*.8,sy:P.ry*.75,i:.14*k});
 src.push({x:P.cx,y:P.cy,sx:.035,sy:.035*aspect,i:(.32+.18*Math.sin(time*2.2))*k});
 P.forEach((p,i)=>{const bob=Math.sin(time*.7+p.ph)*.006,talk=i===speaker?Math.min(ramp,fade)*.35:0,lean=i===speaker?Math.min(ramp,fade)*.02:0;
  const ox=p.x+(P.cx-p.x)*lean*4,oy=p.y+(P.cy-p.y)*lean*4+bob,out=p.y<P.cy?-1:1;
  src.push({x:ox,y:oy+.014,sx:.05,sy:.019*aspect,i:(.26*p.warm+talk*.55)*k});// ombros
  src.push({x:ox,y:oy-.026,sx:.019,sy:.019*aspect,i:(.5*p.warm+talk*1.05)*k});// cabeça
  src.push({x:ox,y:oy-.026,sx:.008,sy:.008*aspect,i:(.12+talk*.3)*k});// rosto (ponto mais quente)
  src.push({x:ox+(P.cx-ox)*.35,y:oy+(P.cy-oy)*.35,sx:.018,sy:.014*aspect,i:(.16+Math.sin(time*1.3+p.ph)*.05)*k});// mãos na mesa
  if(p.cup)src.push({x:ox+(P.cx-ox)*.5+.02,y:oy+(P.cy-oy)*.5,sx:.008,sy:.008*aspect,i:.5*k});// copo quente
 });
 for(const w of wisps){const t=(w.p+time*w.v)%1;src.push({x:w.x+Math.sin(time*.5+w.p*9)*.02,y:P.cy-t*.6,sx:w.r*(1+t),sy:w.r*(1+t)*aspect*.7,i:.12*(1-t)*Math.min(1,t*5)*k});}
 // cantos aquecidos de leve, para dar profundidade
 src.push({x:0,y:1,sx:.3,sy:.3,i:.12*k},{x:1,y:1,sx:.3,sy:.3,i:.12*k});
 const pre=src.map(s=>({x:s.x*fw,y:s.y*fh,ax:1/(2*(s.sx*fw)**2),ay:1/(2*(s.sy*fh)**2),i:s.i,cut:Math.max(s.sx*fw,s.sy*fh)*3}));
 let hot=0,hx=.5,hy=.5;
 for(let y=0;y<fh;y++)for(let x=0;x<fw;x++){let v=.03;for(const s of pre){const dx=x-s.x,dy=y-s.y;if(dx>s.cut||dx<-s.cut||dy>s.cut||dy<-s.cut)continue;v+=s.i*Math.exp(-(dx*dx*s.ax+dy*dy*s.ay));}
  const idx=y*fw+x;v=v*(1-calma*.35)+noise[(idx+Math.floor(time*12)*7)%noise.length];if(v>hot){hot=v;hx=x/fw;hy=y/fh;}
  const c=Math.max(0,Math.min(255,Math.round(v*265)))*3,o=idx*4;d[o]=LUT[c];d[o+1]=LUT[c+1];d[o+2]=LUT[c+2];d[o+3]=255;}
 fc.putImageData(img,0,0);return{hot,hx,hy};
}
function hud(c,time,h){const s=document.body.dataset.screen,narrow=W<700,a=s==='game'?.35:s==='lobby'?.45:.8;c.save();c.globalAlpha=a;c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=2;
 // cantos da câmera
 const m=narrow?14:26,L=narrow?18:34;for(const [x,y,sx,sy] of [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]]){c.beginPath();c.moveTo(x,y+sy*L);c.lineTo(x,y);c.lineTo(x+sx*L,y);c.stroke();}
 c.font=(narrow?10:12)+'px "Courier New",monospace';c.fillStyle='rgba(255,255,255,.75)';c.textBaseline='top';
 if(Math.floor(time*1.2)%2===0){c.fillStyle='#ff1f2d';c.beginPath();c.arc(m+L+14,m+8,5,0,7);c.fill();}
 c.fillStyle='rgba(255,255,255,.75)';c.fillText('REC  TÉRMICA · MESA QUENTE',m+L+26,m+2);
 // escala de temperatura
 const bx=W-m-10,by=H*.3,bh=H*.4,g=c.createLinearGradient(0,by+bh,0,by);STOPS.forEach(([p,col])=>g.addColorStop(p,'rgb('+col.join(',')+')'));c.fillStyle=g;c.fillRect(bx,by,8,bh);c.strokeRect(bx,by,8,bh);
 c.textAlign='right';c.fillText('40°',bx-6,by-2);c.fillText('20°',bx-6,by+bh-12);
 // mira seguindo o ponto mais quente, com a leitura
 tempShown+=((26+Math.min(1,h.hot)*13)-tempShown)*.05;const rx=h.hx*W,ry=h.hy*H,r=narrow?16:22;
 if(s!=='game'){c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=1.5;c.beginPath();c.arc(rx,ry,r,0,7);c.moveTo(rx-r-8,ry);c.lineTo(rx-r+6,ry);c.moveTo(rx+r-6,ry);c.lineTo(rx+r+8,ry);c.moveTo(rx,ry-r-8);c.lineTo(rx,ry-r+6);c.moveTo(rx,ry+r-6);c.lineTo(rx,ry+r+8);c.stroke();c.textAlign='left';c.fillText(tempShown.toFixed(1)+'°C',rx+r+10,ry-6);}
 c.textAlign='left';c.textBaseline='bottom';c.fillText('MÁX '+tempShown.toFixed(1)+'°C',m+2,H-m-6);c.restore();}
function draw(t){requestAnimationFrame(draw);if(document.hidden||visual.scene!=='quente')return;const still=reducedMotion();if(still&&!dirty)return;if(t-last<50&&!dirty)return;last=t;dirty=false;const time=still?3:t/1000,c=ctx;
 heat+=(heatTarget()-heat)*.04;calma+=(calmo()-calma)*.06;if(still){heat=heatTarget();calma=calmo();}
 const h=paint(time);c.setTransform(dpr,0,0,dpr,0,0);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(field,0,0,W,H);
 // linhas do sensor e vinheta
 c.fillStyle='rgba(0,0,0,.12)';for(let y=(time*20)%4;y<H;y+=4)c.fillRect(0,y,W,1);
 const v=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.65)');c.fillStyle=v;c.fillRect(0,0,W,H);
 if(calma>.01){c.fillStyle='rgba(0,0,0,'+(.4*calma)+')';c.fillRect(0,0,W,H);}
 hud(c,time,h);}
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;build();dirty=true;}
resize();addEventListener('resize',resize);addEventListener('mq-visual',()=>dirty=true);
new MutationObserver(()=>dirty=true).observe(document.body,{attributes:true,attributeFilter:['data-tone','data-screen']});
requestAnimationFrame(draw);
