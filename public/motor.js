import {TONES,ADULT_TONES,toneFor,cardsFor,brancasPara,pretasSemNocao} from './editorial.js';
// Pure game state: the Firebase transaction and tests use the same functions.
export const MAPAS=['quente','boteco','galaxia','noir'];
export const CATEGORY_DECK={votacao:0,dilemas:1,blefe:5,debate:2,sintonia:4,desafio:3};
export const SPECIAL={niveis_intimidade:4};
export function connected(room){return Object.keys(room.jogadores||{}).filter(id=>room.jogadores[id]?.conectado!==false).sort((a,b)=>(room.jogadores[a].entrouEm||0)-(room.jogadores[b].entrouEm||0)||a.localeCompare(b));}
export function validateConfig(config,modes){const chosen=[...new Set(config.minigames||[])];if(!chosen.length||chosen.some(id=>!modes[id]))throw Error('Escolha pelo menos um minijogo válido.');if(!config.modoLivre&&new Set(chosen.map(id=>modes[id].categoria)).size>1)throw Error('Ative o Modo Livre para misturar minijogos de categorias diferentes.');const n=Number(config.numeroRodadas);if(!Number.isInteger(n)||n<1||n>100)throw Error('Escolha de 1 a 100 rodadas.');const tones=config.tones===undefined?['leve']:config.tones;if(!Array.isArray(tones)||!tones.length||tones.some(t=>!Object.hasOwn(TONES,t)))throw Error('Escolha pelo menos um tom válido.');const adult=tones.some(t=>ADULT_TONES.includes(t))||chosen.includes('carta_branca');if(adult&&config.adultConfirmed!==true)throw Error(chosen.includes('carta_branca')?'O Sem Noção é 18+: confirme que todos na mesa têm 18 anos ou mais.':'Confirme que todos na mesa têm 18 anos ou mais para liberar as cartas picantes.');const mapa=config.mapa===undefined?'quente':config.mapa;if(!MAPAS.includes(mapa))throw Error('Escolha um mapa válido.');return{mapa,minigames:chosen,modoLivre:!!config.modoLivre,numeroRodadas:n,tones:[...new Set(tones)],adultConfirmed:adult};}
function selectUnused(list,prefix,used,rng){let candidates=list.map((x,i)=>({x,key:prefix+'_'+i})).filter(x=>!used.includes(x.key));if(!candidates.length)candidates=list.map((x,i)=>({x,key:prefix+'_'+i}));return candidates[Math.floor(rng()*candidates.length)];}
// Ordem embaralhada a cada ciclo, sem repetir o mesmo item duas vezes seguidas.
function refill(queue,all,last,rng){const q=(queue||[]).filter(x=>all.includes(x));if(q.length)return q;const s=[...all];for(let i=s.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[s[i],s[j]]=[s[j],s[i]];}if(s.length>1&&s[0]===last)s.push(s.shift());return s;}
export function makeRound(room,modes,decks,rng=Math.random,now=Date.now()){
 const ids=connected(room);if(ids.length<(room.local?1:2))throw Error('A partida precisa de pelo menos 2 jogadores conectados.');
 const round=(room.partida?.rodadaAtual||0)+1;if(round>room.numeroRodadas)return{...room.partida,status:'finalizada'};
 const chosen=room.minigames||[],prev=room.partida?.cartaAtual,modeQueue=refill(room.partida?.modeQueue,chosen,prev?.modeId,rng),modeId=modeQueue.shift(),mode=modes[modeId];if(!mode)throw Error('Minijogo não encontrado.');if(modeId==='o_espiao'&&ids.length<3)throw Error('O Espião precisa de pelo menos 3 jogadores.');
 const old=room.partida?.cartaAtual?.readerId,index=ids.indexOf(old),readerId=old?ids[(index+1)%ids.length]:ids[Math.floor(rng()*ids.length)];
 const tones=Object.keys(TONES).filter(t=>room.tones?.includes(t)),toneQueue=refill(room.partida?.toneQueue,tones.length?tones:['leve'],prev?.tone,rng),tone=toneQueue.shift(),used=room.partida?.used||room.usedHistory||[],selection=modeId==='carta_branca'?selectUnused(pretasSemNocao().map(x=>({...x})),'carta_branca',used,rng):selectUnused(cardsFor(modeId,tone,!!room.local),modeId+'_'+tone+(room.local?'_l':''),used,rng);
 const card={id:'c_'+now+'_'+Math.floor(rng()*1e9),flowVersion:6,modeId,tone,deckIndex:SPECIAL[modeId]??CATEGORY_DECK[mode.categoria],readerId,participants:ids,phase:'deck',text:'',options:[],createdAt:now,...structuredClone(selection.x)};
 if(modeId==='o_espiao'){card.spyId=ids[Math.floor(rng()*ids.length)];card.text='Façam perguntas uns aos outros sem dizer a palavra secreta.';card.votingReady=false;}
 if(modeId==='batalha_de_argumentos'){card.debaters=[readerId,ids[(ids.indexOf(readerId)+1)%ids.length]];card.votingReady=false;}
 if(modeId==='carta_branca')card.hands=darMaos(ids.filter(id=>id!==readerId),brancasPara(!!room.adultConfirmed),rng);card.semClima=true;
 if(modeId==='apenas_uma_dica')card.text='Os outros escrevem uma dica de uma palavra. O leitor tenta adivinhar.';
 if(modeId==='palavra_proibida')card.text='Ouça a explicação e envie seu palpite. O leitor não pode usar os termos proibidos.';
 return{status:'jogando',rodadaAtual:round,totalRodadas:room.numeroRodadas,cartaAtual:card,answers:{},used:[...used,selection.key].slice(-400),modeQueue,toneQueue};
}
export const AUTO_RESULTS=['quem_e_mais_provavel','eu_nunca','o_que_voce_prefere','bandeiras_vermelhas','duas_verdades_uma_mentira','o_termometro','o_espiao','batalha_de_argumentos'];
export function replyIds(room){const c=room.partida?.cartaAtual;if(!c)return[];if(['niveis_intimidade','verdade_ou_desafio_hot'].includes(c.modeId))return[];return c.participants.filter(id=>room.jogadores[id]?.conectado!==false&&room.jogadores[id]&&!(['preencha_a_lacuna','carta_branca','duas_verdades_uma_mentira','apenas_uma_dica','palavra_proibida'].includes(c.modeId)&&id===c.readerId));}
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
export function allowedAnswers(card,uid,room){const id=card.modeId;const others=card.participants.filter(x=>x!==card.readerId);if(['quem_e_mais_provavel','o_espiao'].includes(id))return card.participants;
 if(id==='eu_nunca')return['JA_FIZ','INOCENTE'];if(['o_que_voce_prefere','bandeiras_vermelhas'].includes(id))return['0','1'];if(id==='batalha_de_argumentos')return card.debaters;if(id==='preencha_a_lacuna')return uid===card.readerId?[]:card.white;if(id==='duas_verdades_uma_mentira')return uid===card.readerId?[]:['0','1','2'];if(id==='carta_branca')return null;if(id==='o_termometro')return Array.from({length:11},(_,i)=>String(i));return null;}
export function applyAction(room,uid,action,payload={},modes,decks,rng=Math.random,now=Date.now()){
 if(!room||room.schemaVersion!==3)throw Error('Esta sala usa outra versão do jogo. Crie uma sala nova.');if(!room.jogadores?.[uid]||room.jogadores[uid].conectado===false)throw Error('Você não está conectado à sala.');
 settleVoting(room,now);
 const host=room.hostId===uid,p=room.partida,c=p?.cartaAtual,reader=c?.readerId===uid;const requireHost=()=>{if(!host)throw Error('Somente o anfitrião pode fazer isso.');};const requireCard=()=>{if(room.status!=='jogando'||!c||payload.cardId!==c.id)throw Error('A rodada mudou. Tente novamente.');};
 if(action==='config'){requireHost();if(room.status!=='lobby')throw Error('Altere os jogos no lobby.');Object.assign(room,validateConfig(payload,modes));}
 else if(action==='tutorial'){requireHost();if(room.status!=='lobby')throw Error('A partida já começou.');const ids=connected(room);if(ids.length<(room.local?1:2))throw Error('Convide pelo menos mais uma pessoa.');if(room.minigames.includes('o_espiao')&&ids.length<3)throw Error('O Espião precisa de 3 jogadores.');room.status='tutorial';room.ready={};}
 else if(action==='ready'){if(room.status!=='tutorial')throw Error('Tutorial encerrado.');room.ready??={};room.ready[uid]=true;}
 else if(action==='start'){requireHost();if(room.status!=='tutorial')throw Error('A partida já começou.');if(connected(room).some(id=>!room.ready?.[id]))throw Error('Aguarde todos confirmarem que estão prontos.');room.scores={};room.stats={};room.partida=makeRound(room,modes,decks,rng,now);room.status='jogando';}
 else if(action==='restart'){requireHost();if(room.status!=='finalizada')throw Error('A partida ainda está em andamento.');room.usedHistory=room.partida?.used||room.usedHistory||[];room.status='lobby';room.partida=null;room.ready={};room.scores={};room.stats={};}
 else {requireCard();
 if(action==='skip'){if(!reader&&!host&&!room.local)throw Error('Só quem está com a carta pode pular.');if(c.phase==='deck')throw Error('Puxe a carta antes de pular.');if(c.phase==='results')throw Error('Esta carta não pode mais ser pulada.');c.skipped=true;c.phase='results';p.answers={};}
 else if(action==='openVoting'){if(!reader&&!host)throw Error('Aguarde quem conduz a rodada.');if(c.phase!=='public'||!['o_espiao','batalha_de_argumentos'].includes(c.modeId)||c.votingReady!==false)throw Error('Votação indisponível.');c.votingReady=true;}
 else if(action==='draw'){if(!reader||c.phase!=='deck')throw Error('Aguarde sua vez de puxar.');c.phase='private';}
 else if(action==='truth'){if(!reader||c.modeId!=='verdade_ou_desafio_hot'||c.phase!=='private'||!['truth','dare'].includes(payload.choice))throw Error('Escolha indisponível.');c.text=(payload.choice==='truth'?'VERDADE · ':'DESAFIO · ')+c[payload.choice];c.choice=payload.choice;}
 else if(action==='statements'){if(!reader||c.modeId!=='duas_verdades_uma_mentira'||c.phase!=='private')throw Error('Aguarde sua vez.');if(!Array.isArray(payload.statements)||payload.statements.length!==3||payload.statements.some(s=>typeof s!=='string'||!s.trim()||s.length>140)||![0,1,2].includes(payload.lie))throw Error('Preencha os três fatos e marque a mentira.');c.statements=payload.statements.map(s=>s.trim());c.lie=payload.lie;c.text=c.statements.map((s,i)=>(i+1)+'. '+s).join('\n');}
 else if(action==='reveal'){if(!reader||c.phase!=='private')throw Error('Somente o leitor pode revelar a carta.');if(c.modeId==='duas_verdades_uma_mentira'&&!c.statements&&!room.local)throw Error('Escreva os três fatos primeiro.');if(c.modeId==='verdade_ou_desafio_hot'&&!c.choice)throw Error('Escolha Verdade ou Desafio primeiro.');c.phase='public';}
 else if(action==='answer'){if(!['public','voting'].includes(c.phase)||!c.participants.includes(uid))throw Error('Aguarde a próxima rodada ou a revelação da carta.');if(c.votingReady===false)throw Error('Conversem antes de abrir a votação.');const value=String(payload.value??'').trim();if(!value||value.length>(c.modeId==='carta_branca'?900:140))throw Error('Use uma resposta de até 140 caracteres.');if(c.modeId==='carta_branca'){if(uid===c.readerId)throw Error('O juiz não joga carta branca.');const parts=value.split(SEP_BRANCAS),hand=c.hands?.[uid]||[];if(parts.length!==(c.pick||1)||new Set(parts).size!==parts.length||parts.some(x=>!hand.includes(x)))throw Error('Jogue '+(c.pick||1)+' carta(s) da sua mão.');}const allowed=allowedAnswers(c,uid,room);if(allowed&&!allowed.includes(value))throw Error('Resposta inválida para este jogo.');if(['niveis_intimidade','verdade_ou_desafio_hot'].includes(c.modeId))throw Error('Esta rodada é respondida em voz alta.');if(c.modeId==='apenas_uma_dica'){if(uid===c.readerId||c.hintsRevealed)throw Error('As dicas já foram encerradas.');if(/\s/.test(value))throw Error('A dica deve ter uma só palavra.');if(nameTokens(c).includes(normalize(value)))throw Error('A dica não pode ter o nome da pessoa.');}if(c.modeId==='palavra_proibida'&&reader)throw Error('O leitor dá a dica em voz alta.');p.answers??={};p.answers[uid]=value;}
 else if(action==='hints'){if(!reader&&!host)throw Error('Somente o leitor ou anfitrião.');if(c.modeId!=='apenas_uma_dica'||c.phase!=='public')throw Error('Ação indisponível.');if(replyIds(room).some(id=>!Object.hasOwn(p.answers||{},id)))throw Error('Ainda faltam dicas.');c.hintsRevealed=true;}
 else if(action==='guess'){if(!reader||c.modeId!=='apenas_uma_dica'||!c.hintsRevealed||c.phase!=='public')throw Error('Aguarde as dicas.');const g=String(payload.value||'').trim();if(!g||g.length>80)throw Error('Digite seu palpite.');c.guess=g;c.correct=matchGuess(c,g);c.phase='results';}
 else if(action==='judge'){if(!reader||c.modeId!=='preencha_a_lacuna'||c.phase!=='public'||!p.answers?.[payload.winner])throw Error('Escolha uma resposta recebida.');if(replyIds(room).some(id=>!Object.hasOwn(p.answers||{},id)))throw Error('Aguarde todas as respostas antes de escolher.');c.winner=payload.winner;c.phase='results';}
 else if(action==='results'){if(!reader&&!host)throw Error('Aguarde o leitor.');if(c.phase!=='public')throw Error('Revele a carta primeiro.');if(!(room.local&&connected(room).length===1)&&(AUTO_RESULTS.includes(c.modeId)||['apenas_uma_dica','preencha_a_lacuna','carta_branca'].includes(c.modeId)))throw Error('Conclua a atividade da rodada ou pule a carta.');c.phase='results';}
 else if(action==='escolher'){if(!reader||c.modeId!=='carta_branca'||c.phase!=='public')throw Error('Só o juiz da rodada escolhe.');if(replyIds(room).some(id=>!Object.hasOwn(p.answers||{},id)))throw Error('Espere todo mundo jogar a sua carta.');const autor=Object.keys(p.answers||{}).find(id=>p.answers[id]===payload.value);if(!autor)throw Error('Escolha uma das respostas da mesa.');c.winner=autor;c.phase='results';}
 else if(action==='veredito'){if(c.modeId!=='o_termometro'||c.phase!=='results'||c.skipped||!c.extremes||c.extremes.unanimous||c.verdictWinner!==undefined)throw Error('O tribunal não está aberto.');const ext=[c.extremes.low,c.extremes.high],judges=tribunalJudges(room,c);if(!judges.includes(uid))throw Error('Quem está no tribunal não vota em si mesmo.');if(!ext.includes(payload.value)||payload.value===uid)throw Error('Vote em quem convenceu mais.');c.verdict??={};c.verdict[uid]=payload.value;if(judges.every(id=>c.verdict[id])){const t=tally(c.verdict);c.verdictWinner=t.top||null;if(t.top){room.scores??={};room.scores[t.top]=(room.scores[t.top]||0)+2;c.awards={...(c.awards||{}),[t.top]:((c.awards||{})[t.top]||0)+2};room.stats??={};room.stats[t.top]??={};room.stats[t.top].persuasao=(room.stats[t.top].persuasao||0)+1;}}}
 else if(action==='next'){if(!reader&&!host)throw Error('Aguarde sua vez.');if(c.phase!=='results'&&!host)throw Error('Conclua a rodada primeiro.');room.partida=makeRound(room,modes,decks,rng,now);if(room.partida.status==='finalizada')room.status='finalizada';}
 else throw Error('Ação desconhecida.');}
 settleVoting(room,now);return room;
}
export function textForViewer(card,uid){if(typeof card.viewerText==='string')return card.viewerText;if(card.skipped)return'Carta pulada. Ninguém precisa explicar o motivo.';const own=card.readerId===uid,mode=card.modeId,results=card.phase==='results';if(!own&&['deck','private','voting'].includes(card.phase))return'';
 if(mode==='o_espiao')return results?'Palavra da rodada: '+card.secret:uid===card.spyId?'Você é o ESPIÃO. Descubra a palavra sem levantar suspeitas.':'Palavra secreta: '+card.secret+'. Não diga a palavra em voz alta!';
 if(mode==='o_termometro')return card.text;
 if(mode==='apenas_uma_dica')return results?'Era: '+card.secret:own?'Quem sou eu?\n'+(card.cat||'Famoso')+(card.dica?'\nCharada: '+card.dica:'')+'\n\nLeia as dicas da mesa e descubra quem você é.':card.secret+'\n'+(card.cat||'')+'\n\nMande UMA palavra de dica, sem dizer o nome.';
 if(mode==='palavra_proibida')return own||results?'Explique: '+card.secret+'\nNão pode dizer: '+card.forbidden.join(', '):card.text;
 return card.text;
}
export function uniqueHints(answers){const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();const vals=Object.values(answers||{});return vals.filter(v=>vals.filter(x=>norm(x)===norm(v)).length===1);}


// Answers finish voting; only the reader explicitly reveals new cards.
export function settleVoting(room,now=Date.now()){settle(room,now);scoreRound(room);return room;}
function settle(room,now){
 const p=room?.partida,c=p?.cartaAtual;if(room?.status!=='jogando'||!c||c.skipped)return room;
 if(c.modeId==='quem_e_mais_provavel'&&c.phase==='voting'){c.phase='public';delete c.voteOpensAt;}
 if(!['public','voting'].includes(c.phase)||c.votingReady===false)return room;
 const eligible=replyIds(room),complete=eligible.length>0&&eligible.every(id=>Object.hasOwn(p.answers||{},id));
 if(complete&&AUTO_RESULTS.includes(c.modeId)){c.phase='results';c.revealedAt=now;if(c.modeId==='o_termometro')c.extremes=extremos(p.answers,c.participants);}
 if(complete&&c.modeId==='apenas_uma_dica')c.hintsRevealed=true;
 if(c.modeId==='palavra_proibida'){const winner=eligible.find(id=>p.answers?.[id]&&normalize(p.answers[id])===normalize(c.secret));if(winner){c.winner=winner;c.phase='results';c.revealedAt=now;}}
 return room;
}


// Pontuação: cada carta concluída dá pontos uma única vez. Pular nunca tira pontos nem revela quem pulou.
export const STAT_TITLES={persuasao:'Advogado do Diabo',holofote:'Holofote da Noite',ousadia:'Sem Vergonha Oficial',blefe:'Mestre do Blefe',sintonia:'Leitor de Mentes',sincero:'Coração Aberto'};
function tally(answers){const counts={};for(const v of Object.values(answers||{}))counts[v]=(counts[v]||0)+1;const max=Math.max(0,...Object.values(counts));const leaders=Object.keys(counts).filter(k=>counts[k]===max);return{counts,max,leaders,top:leaders.length===1?leaders[0]:null};}
export function scoreRound(room){
 const p=room?.partida,c=p?.cartaAtual;if(room?.status!=='jogando'||!c||c.phase!=='results'||c.scored)return room;c.scored=true;if(c.skipped)return room;
 const awards={},ans=p.answers||{},add=(id,n)=>{if(id&&room.jogadores?.[id]&&n)awards[id]=(awards[id]||0)+n;};
 room.stats??={};const stat=(id,k)=>{if(!id||!room.jogadores?.[id])return;room.stats[id]??={};room.stats[id][k]=(room.stats[id][k]||0)+1;};
 const t=tally(ans),voters=v=>Object.keys(ans).filter(id=>ans[id]===v);
 switch(c.modeId){
  case'quem_e_mais_provavel':for(const id of t.leaders){stat(id,'holofote');for(const v of voters(id))add(v,1);}break;
  case'eu_nunca':for(const v of voters('JA_FIZ')){add(v,1);stat(v,'ousadia');}break;
  case'o_que_voce_prefere':case'bandeiras_vermelhas':if(t.top!==null&&Object.keys(ans).length>1)for(const v of voters(t.top)){add(v,1);stat(v,'sintonia');}break;
  case'preencha_a_lacuna':case'carta_branca':add(c.winner,2);break;
  case'duas_verdades_uma_mentira':{let fooled=0;for(const [id,v] of Object.entries(ans)){if(v===String(c.lie))add(id,1);else fooled++;}add(c.readerId,fooled);if(fooled)stat(c.readerId,'blefe');break;}
  case'o_espiao':if(t.top===c.spyId)for(const v of voters(c.spyId))add(v,1);else{add(c.spyId,3);stat(c.spyId,'blefe');}break;
  case'batalha_de_argumentos':if(t.top)add(t.top,2);break;
  case'o_termometro':break;// pontos vêm do tribunal (veredito)
  case'apenas_uma_dica':if(c.correct){add(c.readerId,2);const unique=uniqueHints(ans);for(const [id,v] of Object.entries(ans))if(unique.includes(v))add(id,1);}break;
  case'palavra_proibida':if(c.winner){add(c.winner,2);add(c.readerId,2);}break;
  case'niveis_intimidade':add(c.readerId,1);stat(c.readerId,'sincero');break;
  case'verdade_ou_desafio_hot':if(c.choice==='dare'){add(c.readerId,2);stat(c.readerId,'ousadia');}else if(c.choice==='truth'){add(c.readerId,1);stat(c.readerId,'sincero');}break;
 }
 c.awards=awards;room.scores??={};for(const [id,n] of Object.entries(awards))room.scores[id]=(room.scores[id]||0)+n;return room;
}

// Entradas e saídas durante a partida: avisos para a mesa e regras para a rodada não travar.
export function noteEvent(room,text,now=Date.now()){room.events=[...(Array.isArray(room.events)?room.events:Object.values(room.events||{})),{id:'e'+now+'_'+Math.floor(Math.random()*1e6),text,at:now}].slice(-8);return room;}
export function canJoin(room,uid){if(room.jogadores?.[uid])return true;if(!['lobby','tutorial'].includes(room.status))throw Error('Essa partida já começou! Espere o anfitrião terminar e voltar ao lobby para entrar.');if(Object.keys(room.jogadores||{}).length>=12)throw Error('A mesa tem 12 participantes.');return true;}
export function playerLeft(room,uid,now=Date.now()){
 const name=room.jogadores?.[uid]?.nome||'Alguém';
 if(room.status!=='jogando'){noteEvent(room,'🚪 '+name+' saiu da mesa.',now);return room;}
 const rest=connected(room).filter(id=>id!==uid);
 if(rest.length<2){room.status='finalizada';if(room.partida)room.partida.status='finalizada';room.endReason=name+' saiu e a mesa ficou com menos de 2 jogadores.';noteEvent(room,'🚪 '+name+' saiu. A partida terminou por falta de jogadores.',now);return room;}
 const c=room.partida?.cartaAtual;let extra='';
 if(c&&c.phase!=='results'&&!c.skipped&&(c.readerId===uid||c.spyId===uid||c.debaters?.includes(uid))){c.skipped=true;c.phase='results';room.partida.answers={};extra=c.readerId===uid?' Era a vez dele(a): a carta foi pulada.':' A carta foi pulada.';}
 noteEvent(room,'🚪 '+name+' saiu da partida.'+extra,now);return room;
}

// Quem Sou Eu: o palpite aceita apelidos e pequenos erros de digitação.
function nameTokens(c){return[c.secret,...(c.aliases||[])].flatMap(n=>[normalize(n),...normalize(n).split(/[^a-z0-9]+/).filter(w=>w.length>2&&w!=='dos'&&w!=='das')]);}
function distance(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length];}
export function matchGuess(c,guess){const g=normalize(guess);if(!g)return false;return[c.secret,...(c.aliases||[])].map(normalize).some(n=>g===n||(n.length>=4&&g.length>=4&&(g.includes(n)||n.includes(g)&&g.length>=n.length*.6))||(n.length>5&&distance(g,n)<=2));}

// Termômetro da Treta: a menor e a maior nota vão para o tribunal. Os outros julgam quem convenceu.
export function extremos(answers,order=[]){const e=Object.entries(answers||{}).map(([id,v])=>[id,Number(v)]).filter(([,v])=>Number.isFinite(v));if(e.length<2)return{unanimous:true};const pos=id=>{const i=order.indexOf(id);return i<0?99:i;};e.sort((a,b)=>a[1]-b[1]||pos(a[0])-pos(b[0]));const low=e[0],high=[...e].sort((a,b)=>b[1]-a[1]||pos(a[0])-pos(b[0]))[0];if(low[1]===high[1])return{unanimous:true,value:low[1]};return{low:low[0],high:high[0],lowValue:low[1],highValue:high[1]};}
export function tribunalJudges(room,c){const ext=[c.extremes?.low,c.extremes?.high];const on=c.participants.filter(id=>room.jogadores?.[id]&&room.jogadores[id].conectado!==false);const judges=on.filter(id=>!ext.includes(id));return judges.length?judges:on;}

// Sem Noção: cada jogador recebe 10 cartas brancas diferentes (só repete entre jogadores se o monte acabar).
export const SEP_BRANCAS=' ␟ ';
export function darMaos(ids,pool,rng=Math.random){const deck=[...pool];for(let i=deck.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}let k=0;const hands={};for(const id of ids){const hand=[];while(hand.length<Math.min(10,deck.length)){const w=deck[k++%deck.length];if(!hand.includes(w))hand.push(w);}hands[id]=hand;}return hands;}
// Respostas da rodada embaralhadas pela carta, para o juiz não saber quem jogou o quê.
export function respostasAnonimas(card,answers){const h=s=>{let x=2166136261;for(const ch of card.id+'|'+s)x=Math.imul(x^ch.charCodeAt(0),16777619);return x>>>0;};return Object.values(answers||{}).sort((a,b)=>h(a)-h(b));}
