// Efeitos sonoros da interface, sintetizados na hora com WebAudio (sem arquivos).
let noiseBuf=null;
function noise(ctx){if(noiseBuf&&noiseBuf.sampleRate===ctx.sampleRate)return noiseBuf;const b=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return noiseBuf=b;}
function env(g,t,peak,a,dur){g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+dur);}
// Nota simples com envelope e varredura de frequência opcional.
function tom(ctx,out,{f=440,to=null,t=0,dur=.15,type='sine',vol=.3,a=.005}){const now=ctx.currentTime+t,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,now);if(to)o.frequency.exponentialRampToValueAtTime(to,now+dur);env(g,now,vol,a,dur);o.connect(g);g.connect(out);o.start(now);o.stop(now+dur+.05);}
// Ruído filtrado (cliques, sopros, palmas, estalos).
function sopro(ctx,out,{t=0,dur=.1,vol=.3,type='bandpass',f=2000,to=null,q=1,a=.003}){const now=ctx.currentTime+t,s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise(ctx);fl.type=type;fl.frequency.setValueAtTime(f,now);if(to)fl.frequency.exponentialRampToValueAtTime(to,now+dur);fl.Q.value=q;env(g,now,vol,a,dur);s.connect(fl);fl.connect(g);g.connect(out);s.start(now,Math.random()*.5);s.stop(now+dur+.05);}
const SONS={
 click:(c,o)=>{sopro(c,o,{f:3200,q:2,dur:.03,vol:.25});tom(c,o,{f:220,to:120,dur:.05,vol:.18});},
 clickHi:(c,o)=>{sopro(c,o,{f:2600,q:2,dur:.035,vol:.25});tom(c,o,{f:520,to:880,dur:.09,type:'triangle',vol:.18});},
 type:(c,o)=>{sopro(c,o,{f:2400+Math.random()*1800,q:4,dur:.022,vol:.16});tom(c,o,{f:140+Math.random()*40,to:90,dur:.03,vol:.06});},
 toggle:(c,o)=>{tom(c,o,{f:660,dur:.05,type:'square',vol:.07});tom(c,o,{f:990,t:.05,dur:.07,type:'square',vol:.07});},
 open:(c,o)=>{sopro(c,o,{type:'lowpass',f:300,to:4000,dur:.22,vol:.22,a:.08});},
 close:(c,o)=>{sopro(c,o,{type:'lowpass',f:3500,to:250,dur:.18,vol:.18,a:.02});},
 draw:(c,o)=>{sopro(c,o,{f:900,to:3500,q:1.2,dur:.28,vol:.3,a:.06});sopro(c,o,{t:.26,f:2500,q:3,dur:.05,vol:.35});tom(c,o,{t:.26,f:180,to:90,dur:.08,vol:.2});},
 reveal:(c,o)=>{sopro(c,o,{f:3000,q:3,dur:.05,vol:.3});[523,659,784,1047].forEach((f,i)=>tom(c,o,{f,t:.04+i*.06,dur:.5,type:'triangle',vol:.1}));},
 turn:(c,o)=>{tom(c,o,{f:784,dur:.18,type:'triangle',vol:.18});tom(c,o,{f:1175,t:.12,dur:.35,type:'triangle',vol:.16});},
 vote:(c,o)=>{tom(c,o,{f:440,to:880,dur:.1,type:'square',vol:.07});},
 score:(c,o)=>{[988,1319,1568,1976].forEach((f,i)=>tom(c,o,{f,t:i*.07,dur:.25,type:'square',vol:.06}));},
 msg:(c,o)=>{tom(c,o,{f:1320,dur:.12,vol:.14});tom(c,o,{f:1760,t:.08,dur:.2,vol:.12});},
 send:(c,o)=>{sopro(c,o,{type:'bandpass',f:800,to:5000,q:1,dur:.16,vol:.2,a:.03});},
 join:(c,o)=>{[523,659,784].forEach((f,i)=>tom(c,o,{f,t:i*.08,dur:.2,type:'triangle',vol:.14}));},
 leave:(c,o)=>{[784,622,523].forEach((f,i)=>tom(c,o,{f,t:i*.09,dur:.22,type:'triangle',vol:.12}));},
 error:(c,o)=>{tom(c,o,{f:140,dur:.14,type:'sawtooth',vol:.12});tom(c,o,{f:110,t:.16,dur:.2,type:'sawtooth',vol:.12});},
 tick:(c,o)=>{tom(c,o,{f:1200,to:800,dur:.06,type:'square',vol:.1});sopro(c,o,{f:1800,q:6,dur:.04,vol:.25});tom(c,o,{f:90,to:50,dur:.18,vol:.35});},
 go:(c,o)=>{tom(c,o,{f:60,to:40,dur:.5,vol:.5});sopro(c,o,{type:'lowpass',f:6000,to:400,dur:.6,vol:.35});[392,494,587,784].forEach(f=>tom(c,o,{f,dur:.9,type:'sawtooth',vol:.05,a:.02}));},
 zap:(c,o)=>{sopro(c,o,{type:'highpass',f:5000,to:800,dur:.25,vol:.35,a:.001});tom(c,o,{f:1800,to:60,dur:.3,type:'sawtooth',vol:.08});tom(c,o,{t:.05,f:70,to:40,dur:.25,vol:.3});},
 whoosh:(c,o)=>{sopro(c,o,{type:'bandpass',f:300,to:2400,q:.8,dur:.45,vol:.3,a:.15});tom(c,o,{f:80,to:160,dur:.4,vol:.15,a:.1});},
 whooshDown:(c,o)=>{sopro(c,o,{type:'bandpass',f:2400,to:250,q:.8,dur:.45,vol:.28,a:.05});},
 boom:(c,o)=>{tom(c,o,{f:70,to:30,dur:1.1,vol:.5,a:.01});sopro(c,o,{type:'lowpass',f:900,to:80,dur:1,vol:.3});},
 rodada:(c,o)=>{sopro(c,o,{type:'lowpass',f:200,to:1500,dur:.35,vol:.18,a:.12});tom(c,o,{t:.2,f:660,dur:.25,type:'triangle',vol:.1});},
 end:(c,o)=>{[[523,0],[659,.14],[784,.28],[1047,.42],[784,.62],[1047,.76]].forEach(([f,t])=>tom(c,o,{f,t,dur:t>.6?.6:.16,type:'square',vol:.07}));},
 // Uma reação, um som
 'r:🔥':(c,o)=>{sopro(c,o,{type:'lowpass',f:400,to:2500,dur:.4,vol:.3,a:.1});for(let i=0;i<5;i++)sopro(c,o,{t:Math.random()*.35,f:3000,q:8,dur:.015,vol:.25});},
 'r:😂':(c,o)=>{[0,.11,.22].forEach((t,i)=>tom(c,o,{f:600-i*60,to:900-i*80,t,dur:.09,type:'triangle',vol:.14}));},
 'r:👏':(c,o)=>{[0,.12,.24,.33].forEach(t=>sopro(c,o,{t,f:1400,q:.8,dur:.06,vol:.4}));},
 'r:😳':(c,o)=>{tom(c,o,{f:300,to:1200,dur:.35,vol:.14});},
 'r:😈':(c,o)=>{tom(c,o,{f:110,to:80,dur:.45,type:'sawtooth',vol:.12});tom(c,o,{f:113,to:82,dur:.45,type:'sawtooth',vol:.08});},
 'r:💋':(c,o)=>{sopro(c,o,{f:1800,q:2,dur:.04,vol:.4});tom(c,o,{t:.02,f:900,to:1600,dur:.06,vol:.12});},
 'r:🍻':(c,o)=>{[2637,3136,3951].forEach((f,i)=>tom(c,o,{f,t:i*.01,dur:.6,vol:.06}));sopro(c,o,{f:5000,q:6,dur:.03,vol:.25});},
 'r:🙈':(c,o)=>{tom(c,o,{f:1400,to:500,dur:.4,vol:.12});}
};
export function tocar(ctx,out,kind){const fn=SONS[kind]||SONS.pop||SONS.click;fn(ctx,out);}
SONS.pop=(c,o)=>{tom(c,o,{f:700,to:1200,dur:.1,vol:.16});};
// Liga sons em toda a interface: botões, digitação, caixas de seleção, janelas, chat.
export function ligarSonsDaInterface(play){
 document.addEventListener('pointerdown',e=>{const b=e.target.closest?.('button,.map-card,.preset,summary');if(!b||b.disabled||b.matches('[data-emoji]'))return;play(b.classList.contains('primary')?'clickHi':'click');},true);
 document.addEventListener('keydown',e=>{const t=e.target;if(!t.matches?.('input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea'))return;if(e.key.length===1||e.key==='Backspace'||e.key==='Enter')play('type');},true);
 document.addEventListener('change',e=>{if(e.target.matches?.('input[type=checkbox],input[type=radio],select'))play('toggle');},true);
 const show=HTMLDialogElement.prototype.showModal,showNM=HTMLDialogElement.prototype.show;
 HTMLDialogElement.prototype.showModal=function(){if(!this.open)play('open');return show.call(this);};
 HTMLDialogElement.prototype.show=function(){if(!this.open)play('open');return showNM.call(this);};
 document.addEventListener('close',e=>{if(e.target instanceof HTMLDialogElement)play('close');},true);
 addEventListener('mq-sfx',e=>play(e.detail));
}
