// Trilhas geradas ao vivo com WebAudio, uma para cada clima da mesa.
// leve: bossa nova · profundo: lo-fi calmo · adulto: R&B lento e sensual · ácido: trap sombrio · casal: balada romântica.
const N=n=>440*Math.pow(2,(n-69)/12);
const SONGS={
 leve:{bpm:132,swing:.08,chords:[[50,57,60,64,65],[43,53,57,59,64],[48,55,59,64,67],[45,55,58,61,64]],bass:[38,31,36,33],
  bassPat:[[0,1],[1.5,.5],[2,1],[3.5,.5]],comp:[0,.75,1.5,2.5,3,3.5],keys:'nylon',drums:{shaker:true,rim:[1,2.5,3.5]},pad:false},
 profundo:{bpm:74,swing:.12,chords:[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]],bass:[41,40,38,36],
  bassPat:[[0,2],[2.5,1]],comp:[0,2],keys:'rhodes',drums:{kick:[0,2.5],rim:[1,3],crackle:true},pad:true},
 adulto:{bpm:66,swing:.1,chords:[[57,60,64,67,71],[53,57,60,64],[50,53,57,60,64],[52,56,59,62,65]],bass:[33,29,26,28],
  bassPat:[[0,1.5],[1.75,.25],[2,1.5],[3.5,.5]],comp:[0,1.5,2.75],keys:'rhodes',drums:{kick:[0,1.75,2.5],snap:[1,3],hat:true},pad:true,trem:true},
 // ácido: trap lento e sombrio, grave pesado e chimbal picotado
 acido:{bpm:72,swing:0,chords:[[45,48,52,55],[41,45,48,52],[43,46,50,53],[40,44,47,50]],bass:[33,29,31,28],
  bassPat:[[0,.75],[.75,.25],[1.5,1],[3,.5],[3.5,.5]],comp:[0,2.5],keys:'rhodes',drums:{kick:[0,.75,2.5,3.25],snap:[1,3],hat:true},pad:true},
 casal:{bpm:70,swing:.06,chords:[[51,55,58,62],[48,51,55,58,62],[44,48,51,55],[46,50,53,56,60]],bass:[39,36,32,34],
  bassPat:[[0,2],[2,2]],comp:[0,1,2,3],keys:'piano',drums:{brush:true,kick:[0,2]},pad:true}
};
export class Trilha{
 constructor(ctx,out){this.ctx=ctx;this.out=ctx.createGain();this.out.gain.value=0;this.out.connect(out);this.verb=this.reverb();this.verb.connect(this.out);this.dry=ctx.createGain();this.dry.gain.value=.8;this.dry.connect(this.out);this.wet=ctx.createGain();this.wet.gain.value=.35;this.wet.connect(this.verb);this.song=null;this.timer=null;this.noiseBuf=this.noise();}
 reverb(){const c=this.ctx,len=c.sampleRate*2.2,b=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}const v=c.createConvolver();v.buffer=b;return v;}
 noise(){const c=this.ctx,b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b;}
 send(node,wet=1){node.connect(this.dry);if(wet)node.connect(this.wet);}
 play(mood){const s=SONGS[mood];if(!s){this.stop();return;}if(this.song===s&&this.timer)return;this.song=s;this.beat=0;this.next=this.ctx.currentTime+.08;const t=this.ctx.currentTime;this.out.gain.cancelScheduledValues(t);this.out.gain.setValueAtTime(this.out.gain.value,t);this.out.gain.linearRampToValueAtTime(1.8,t+1.5);
  if(!this.timer)this.timer=setInterval(()=>this.tick(),50);}
 stop(){const t=this.ctx.currentTime;this.out.gain.cancelScheduledValues(t);this.out.gain.setValueAtTime(this.out.gain.value,t);this.out.gain.linearRampToValueAtTime(0,t+.8);this.song=null;clearInterval(this.timer);this.timer=null;}
 tick(){if(!this.song||this.ctx.state!=='running')return;const s=this.song,spb=60/s.bpm;if(this.next<this.ctx.currentTime-.1)this.next=this.ctx.currentTime+.05;while(this.next<this.ctx.currentTime+.25){this.bar(this.next,s,spb);this.next+=4*spb;this.beat++;}}
 bar(t0,s,spb){const i=this.beat%s.chords.length,ch=s.chords[i],at=b=>t0+(b+((b%1)>=.5?s.swing:0))*spb;
  for(const b of s.comp)this.chord(ch,at(b),spb*(s.keys==='nylon'?.9:1.6),s);
  if(s.pad)this.pad(ch,t0,4*spb);
  for(const [b,len] of s.bassPat)this.bass(s.bass[i]+(b===1.5&&s.keys==='nylon'?7:0),at(b),len*spb*.9);
  const d=s.drums;if(d.kick)for(const b of d.kick)this.kick(at(b));if(d.rim)for(const b of d.rim)this.rim(at(b));if(d.snap)for(const b of d.snap)this.snap(at(b));
  if(d.shaker)for(let k=0;k<8;k++)this.hat(at(k/2),k%2?.03:.05,7000);if(d.hat)for(let k=0;k<8;k++)this.hat(at(k/2),.018,9000);if(d.brush)for(let k=0;k<4;k++)this.hat(at(k),.03,3000,.25);
  if(d.crackle)for(let k=0;k<6;k++)this.hat(t0+Math.random()*4*spb,.02,2500,.01);
  if(s.trem&&i===0)this.sigh(t0+spb*2,ch);}
 env(g,t,a,peak,dur){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+dur);}
 chord(notes,t,dur,s){notes.forEach((n,k)=>{const c=this.ctx,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();const strum=s.keys==='nylon'?k*.018:k*.006;
  o.type=s.keys==='nylon'?'triangle':s.keys==='piano'?'triangle':'sine';o.frequency.value=N(n+12*(s.keys==='nylon'?0:0));f.type='lowpass';f.frequency.value=s.keys==='nylon'?2600:1800;
  this.env(g,t+strum,.008,(s.keys==='nylon'?.05:.045)/Math.sqrt(notes.length)*2,dur);o.connect(f);f.connect(g);this.send(g);o.start(t+strum);o.stop(t+strum+dur+.05);
  if(s.keys==='rhodes'){const o2=c.createOscillator(),g2=c.createGain();o2.type='sine';o2.frequency.value=N(n)*2.005;this.env(g2,t+strum,.005,.012,dur*.4);o2.connect(g2);this.send(g2);o2.start(t+strum);o2.stop(t+strum+dur);}});}
 pad(notes,t,dur){const c=this.ctx,f=c.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(500,t);f.frequency.linearRampToValueAtTime(900,t+dur/2);f.frequency.linearRampToValueAtTime(500,t+dur);const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+dur*.3);g.gain.linearRampToValueAtTime(0,t+dur);f.connect(g);this.send(g);
  notes.slice(0,4).forEach(n=>{for(const det of [-6,6]){const o=c.createOscillator();o.type='sawtooth';o.frequency.value=N(n);o.detune.value=det;o.connect(f);o.start(t);o.stop(t+dur+.05);}});}
 bass(n,t,dur){const c=this.ctx,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();o.type='sine';o.frequency.value=N(n);f.type='lowpass';f.frequency.value=400;this.env(g,t,.01,.22,dur);o.connect(f);f.connect(g);this.send(g,0);o.start(t);o.stop(t+dur+.05);}
 kick(t){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(40,t+.18);this.env(g,t,.003,.35,.3);o.connect(g);this.send(g,0);o.start(t);o.stop(t+.32);}
 hit(t,freq,q,peak,dur,type='bandpass'){const c=this.ctx,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.noiseBuf;f.type=type;f.frequency.value=freq;f.Q.value=q;this.env(g,t,.002,peak,dur);s.connect(f);f.connect(g);this.send(g,.5);s.start(t,Math.random()*.5);s.stop(t+dur+.02);}
 rim(t){this.hit(t,1800,6,.09,.07);}
 snap(t){this.hit(t,2400,3,.16,.12);}
 hat(t,peak,freq,dur=.05){this.hit(t,freq,1,peak,dur,'highpass');}
 sigh(t,notes){const c=this.ctx,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();o.type='sine';o.frequency.setValueAtTime(N(notes[notes.length-1]+12),t);o.frequency.linearRampToValueAtTime(N(notes[notes.length-1]+10),t+1.2);f.type='lowpass';f.frequency.value=1500;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.025,t+.4);g.gain.linearRampToValueAtTime(0,t+1.6);o.connect(f);f.connect(g);this.send(g);o.start(t);o.stop(t+1.7);}
}
