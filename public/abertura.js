// Entrada da partida (jogadores + contagem 5→1) e corte em relâmpago entre as telas.
import {reducedMotion} from './visual.js?v=quente25';
let sound=()=>{},counting=false,queue=[];
export function setSom(fn){sound=fn;}
export const contando=()=>counting;
export function depois(fn){if(counting)queue.push(fn);else fn();}
const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};

// Linha em zigue-zague (em %) que corta a tela de cima a baixo.
function raio(){const pts=[];let x=52+Math.random()*10;for(let i=0;i<=8;i++){const y=-4+i*13.5;pts.push([x+(i%2?-1:1)*(2+Math.random()*5),y]);x-=1.5+Math.random()*1.5;}return pts;}
// Cada momento tem a sua transição. Nenhuma bloqueia toques (pointer-events: none) e nenhuma cobre a mesa no meio da partida.
//  entrar  → cortina de chamas subindo (entrar na sala, voltar ao lobby)
//  sair    → cortina descendo (voltar ao início)
//  fim     → íris fechando no preto e abrindo no placar
//  rodada  → só um pulso de luz nas bordas, a mesa continua visível
//  raio    → corte em relâmpago, exclusivo do "VALENDO!" da contagem
let lastAt=0,lastTipo='';
export function transicao(tipo='raio'){if(reducedMotion())return;const now=Date.now();if(tipo!=='rodada'&&now-lastAt<900&&tipo===lastTipo)return;lastAt=now;lastTipo=tipo;
 if(tipo==='raio')return relampago();
 document.querySelectorAll('.trans').forEach(n=>n.remove());
 const box=make('div','trans trans-'+tipo);box.setAttribute('aria-hidden','true');
 if(tipo==='entrar'||tipo==='sair')box.append(make('div','trans-cortina'));
 if(tipo==='fim')box.append(make('div','trans-iris'));
 document.body.append(box);sound({entrar:'whoosh',sair:'whooshDown',fim:'boom',rodada:'rodada'}[tipo]||'whoosh');
 setTimeout(()=>box.remove(),tipo==='fim'?1300:tipo==='rodada'?900:800);}
function relampago(){document.querySelector('.corte')?.remove();const pts=raio(),line=pts.map(([x,y])=>x+'% '+y+'%');
 const box=make('div','corte');box.setAttribute('aria-hidden','true');
 const a=make('div','corte-metade a'),b=make('div','corte-metade b');
 a.style.clipPath='polygon(-10% -10%,'+line.join(',')+',-10% 110%)';b.style.clipPath='polygon(110% -10%,'+line.join(',')+',110% 110%)';
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.classList.add('corte-raio');
 for(const cls of ['brilho','nucleo']){const pl=document.createElementNS(svg.namespaceURI,'polyline');pl.setAttribute('points',pts.map(p=>p.join(',')).join(' '));pl.setAttribute('class',cls);pl.setAttribute('vector-effect','non-scaling-stroke');svg.append(pl);}
 box.append(a,b,svg);document.body.append(box);sound('zap');setTimeout(()=>box.remove(),800);}

// Contagem de início: nomes dos jogadores entram em placas, depois 5, 4, 3, 2, 1 e VALENDO!
export function contagem(jogadores,{titulo='A MESA ESQUENTOU'}={}){if(counting)return;counting=true;const still=reducedMotion();
 const box=make('div','abertura'+(still?' parada':''));box.setAttribute('role','status');box.setAttribute('aria-live','assertive');
 box.append(make('div','abertura-faixas'));
 const head=make('div','abertura-titulo');head.append(make('small',undefined,'PARTIDA COMEÇANDO'),make('strong',undefined,titulo));
 const list=make('div','abertura-jogadores');jogadores.slice(0,10).forEach((p,i)=>{const plate=make('div','placa'+(i%2?' dir':''));plate.style.setProperty('--i',i);const av=make('span','placa-avatar',p.avatar?.emoji||'🙂');av.style.background=p.avatar?.cor||'#e3101f';plate.append(av,make('b',undefined,p.nome||'Jogador'));list.append(plate);});
 const num=make('div','abertura-numero');
 box.append(head,list,num);document.body.append(box);
 let n=5;const show=()=>{num.textContent=n;num.classList.remove('bate');void num.offsetWidth;num.classList.add('bate');box.dataset.n=n;sound('tick');};
 const finish=()=>{num.textContent='VALENDO!';num.classList.remove('bate');void num.offsetWidth;num.classList.add('bate','valendo');box.classList.add('saindo');sound('go');
  setTimeout(()=>{box.remove();counting=false;transicao('raio');const q=queue;queue=[];q.forEach(fn=>fn());},still?300:650);};
 show();const timer=setInterval(()=>{n--;if(n>0)show();else{clearInterval(timer);finish();}},1000);
}
