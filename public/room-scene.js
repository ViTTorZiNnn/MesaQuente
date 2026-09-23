import {visual,reducedMotion} from './visual.js?v=arcade07';
const backdrop=document.createElement('div');backdrop.className='room-backdrop';backdrop.setAttribute('aria-hidden','true');
backdrop.innerHTML='<div class="room-sheet"><img src="assets/scene/caverna.png" alt=""><i class="lamp-halo"></i><i class="neon-halo"></i><i class="arcade-screen-glow"></i></div><div class="room-shade"></div><canvas class="room-dust"></canvas>';
 document.body.prepend(backdrop);const canvas=backdrop.querySelector('canvas'),ctx=canvas.getContext('2d');let width=1,height=1,last=0,dirty=true;
function resize(){width=innerWidth;height=innerHeight;canvas.width=width;canvas.height=height;dirty=true;}
resize();window.addEventListener('resize',resize);window.addEventListener('mq-visual',()=>dirty=true);
document.addEventListener('visibilitychange',()=>{document.body.dataset.paused=String(document.hidden);dirty=true;});
const dust=Array.from({length:25},(_,i)=>({x:(i*.61803)%1,y:(i*.41421)%1,size:i%3===0?1.6:.8}));
function draw(t){requestAnimationFrame(draw);if(document.hidden||visual.scene!=='arcade'||t-last<65)return;if(reducedMotion()&&!dirty)return;last=t;dirty=false;ctx.clearRect(0,0,width,height);const time=reducedMotion()?0:t/1000;
 for(const [i,p]of dust.entries()){const x=(p.x+Math.sin(time*.1+i)*.012)*width,y=((p.y-time*.009+10)%1)*height;ctx.fillStyle='rgba(255,207,153,'+(.12+.16*Math.sin(i+time*.4)**2)+')';ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill();}}
if(ctx)requestAnimationFrame(draw);
