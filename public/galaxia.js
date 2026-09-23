import {visual,reducedMotion} from './visual.js?v=mesaviva06';
for(const canvas of document.querySelectorAll('#galaxy,#lobby-sky')){
 const ctx=canvas.getContext('2d');let w=360,h=240,last=0,dirty=true;const stars=Array.from({length:100},(_,i)=>({x:(i*.618034)%1,y:(i*.414214)%1}));
 function resize(){w=Math.max(240,Math.min(480,Math.round(canvas.clientWidth/3)));h=Math.max(160,Math.round(w*canvas.clientHeight/Math.max(1,canvas.clientWidth)));canvas.width=w;canvas.height=h;dirty=true;}
 new ResizeObserver(resize).observe(canvas);window.addEventListener('mq-visual',()=>dirty=true);
 function square(x,y,size,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),size,size);}
 function draw(t){requestAnimationFrame(draw);if(document.hidden||!canvas.clientHeight||canvas.id==='lobby-sky'&&document.body.dataset.screen==='game'||t-last<50)return;const still=reducedMotion();if(still&&!dirty)return;last=t;dirty=false;const time=still?0:t/1000;ctx.globalAlpha=1;ctx.fillStyle=visual.scene==='lava'?'#230c1f':visual.scene==='floresta'?'#081e26':'#0d0828';ctx.fillRect(0,0,w,h);
 if(visual.scene==='galaxia'){
  for(let arm=0;arm<3;arm++)for(let i=0;i<160;i++){const r=7+i*.55,a=i*.036+arm*Math.PI*2/3+time*.07;const x=w*.58+Math.cos(a)*r*1.5,y=h*.33+Math.sin(a)*r*.55;ctx.globalAlpha=.16+(i%5)*.09;square(x,y,3,i%3===0?'#fa79d4':i%3===1?'#8b69ef':'#46add8');}ctx.globalAlpha=1;square(w*.58-3,h*.33-3,6,'#ffe0b3');
  stars.forEach((s,i)=>{ctx.globalAlpha=.4+.5*Math.abs(Math.sin(time+i));square((s.x*w+time*(i%3+1))%w,s.y*h,i%7===0?2:1,'#f3dbff');});
 }else if(visual.scene==='floresta'){
  square(w*.77,h*.15,18,'#c0ddc1');for(let layer=0;layer<3;layer++)for(let i=0;i<9;i++){const x=i*w/8+Math.sin(time*.4+i)*2,y=h*(.3+layer*.17);ctx.fillStyle='#12322f';ctx.fillRect(x,y,7,h);ctx.fillStyle=['#173b40','#20524c','#327160'][layer];for(let row=0;row<7;row++)ctx.fillRect(x-row*3,y+row*5,row*6+7,7);}stars.slice(0,28).forEach((s,i)=>{ctx.globalAlpha=.25+.7*Math.abs(Math.sin(time*1.4+i));square((s.x*w+Math.sin(time+i)*9),s.y*h+Math.cos(time+i)*5,2,'#d8ee86');});
 }else{
  for(let i=0;i<9;i++){const x=i*w/8;ctx.fillStyle='#382036';ctx.fillRect(x,h*.05,11,h);ctx.fillStyle='#714354';ctx.fillRect(x-3,h*.05,17,8);}ctx.fillStyle='#ba342f';ctx.fillRect(0,h*.7,w,h*.3);for(let y=0;y<7;y++)for(let x=0;x<20;x++)square((x*27+Math.sin(time+y)*12)%w,h*.72+y*9,12,'#ef713a');stars.slice(0,40).forEach((s,i)=>{square(s.x*w,(h+s.y*h-time*(8+i%5))%h,2,i%2?'#ffbf64':'#ee5449');});
 }ctx.globalAlpha=1;
 }requestAnimationFrame(draw);
}
