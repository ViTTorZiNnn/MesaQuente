// Show de revelação do Sem Noção (estilo videogame):
// 1) cada carta aparece sozinha, já com a frase completa e o jogador que montou, por alguns segundos;
// 2) depois todas aparecem juntas e o juiz escolhe a melhor;
// 3) a vencedora ganha destaque com coroa e o show fecha sozinho.
const POR_CARTA=8000;
let estado={id:''},box=null,ctx=null,timer=null;
const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
// «trechos» das cartas brancas viram destaque dentro da frase.
function frase(texto){const p=make('p','sn-frase');for(const [i,parte] of texto.split(/[«»]/).entries()){if(!parte)continue;p.append(i%2?make('mark',undefined,parte):document.createTextNode(parte));}return p;}
function jogador(id){const j=ctx.jogadores[id]||{},d=make('div','sn-jogador'),a=make('span','sn-avatar',j.avatar?.emoji||'🙂');a.style.background=j.avatar?.cor||'#e3101f';d.append(a,make('b',undefined,j.nome||'Jogador'));return d;}
function carta(id,grande){const c=ctx.c,d=make('div','sn-carta'+(grande?' grande':''));d.append(make('span','sn-marca','MESA QUENTE · SEM NOÇÃO'),frase(ctx.encaixa(c.text||'',ctx.answers[id]||'')));return d;}
export function showSemNocao(dados){ctx=dados;const c=dados?.c;
 if(!c||c.modeId!=='carta_branca'||!c.revealStartedAt||c.skipped||!['public','results'].includes(c.phase)){fechar();return;}
 if(estado.id!==c.id)estado={id:c.id,t0:Date.now(),key:''};
 if(estado.fechado)return;
 if(c.phase==='results'&&!estado.fimEm)estado.fimEm=Date.now();
 if(!box){box=make('div','sn-show');box.setAttribute('role','dialog');box.setAttribute('aria-label','Revelação das cartas');document.body.append(box);}
 if(!timer)timer=setInterval(()=>tick(false),200);
 tick(true);}
export function fechar(manual=false){box?.remove();box=null;clearInterval(timer);timer=null;if(manual)estado.fechado=true;}
function tick(force){if(!ctx||!box)return;const c=ctx.c,ordem=(c.revealOrder||[]).filter(id=>ctx.answers[id]!==undefined),n=ordem.length,passou=Date.now()-estado.t0,idx=Math.min(n,Math.floor(passou/POR_CARTA));
 const fase=c.phase==='results'?'vencedor':idx<n?'carta':'mesa';
 if(fase==='vencedor'&&Date.now()-estado.fimEm>7000){fechar(true);return;}
 if(fase==='carta'){const resto=POR_CARTA-(passou%POR_CARTA),bar=box.querySelector('.sn-tempo i'),seg=box.querySelector('.sn-seg');if(bar)bar.style.width=(resto/POR_CARTA*100)+'%';if(seg)seg.textContent=Math.ceil(resto/1000)+'s';}
 const key=fase+'|'+idx+'|'+(c.winner||'')+'|'+(ctx.busy?1:0);if(!force&&key===estado.key)return;const mudou=key.split('|').slice(0,2).join()!==estado.key.split('|').slice(0,2).join();estado.key=key;
 box.replaceChildren();box.dataset.fase=fase;
 if(fase==='carta'){const id=ordem[idx];box.append(make('span','sn-titulo','CARTA '+(idx+1)+' DE '+n),jogador(id),carta(id,true));const t=make('div','sn-tempo');t.append(make('i'));box.append(t,make('span','sn-seg'));
  if(ctx.reader){const pular=make('button','ghost sn-pular','Próxima ⏭');pular.type='button';pular.onclick=()=>{estado.t0-=POR_CARTA-(passou%POR_CARTA);tick(true);};box.append(pular);}
  if(mudou)ctx.som('reveal');tick(false);return;}
 if(fase==='mesa'){box.append(make('span','sn-titulo',ctx.reader?'ESCOLHA A MELHOR CARTA':'TODAS AS CARTAS NA MESA'));const grade=make('div','sn-grade');
  for(const id of ordem){const item=make('div','sn-item');item.append(jogador(id),carta(id,false));if(ctx.reader){const b=make('button','primary','Escolher esta');b.type='button';b.disabled=!!ctx.busy;b.onclick=()=>ctx.escolher(ctx.answers[id]);item.append(b);}grade.append(item);}
  box.append(grade);if(!ctx.reader)box.append(make('p','sn-aviso','⚖️ '+(ctx.jogadores[c.readerId]?.nome||'O juiz')+' está escolhendo a melhor…'));if(mudou)ctx.som('turn');return;}
 // vencedor
 const w=c.winner;box.append(make('span','sn-titulo',w?'A MESA TEM UM VENCEDOR':'RODADA ENCERRADA'));if(w){const j=jogador(w);j.classList.add('vencedor');j.prepend(make('span','sn-coroa','👑'));box.append(j,carta(w,true),make('p','sn-pontos','+2 pontos'));}
 const ok=make('button','ghost sn-pular','Fechar');ok.type='button';ok.onclick=()=>fechar(true);box.append(ok);if(mudou)ctx.som('score');}
