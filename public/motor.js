import {TONES,toneFor,editorialCards} from './editorial.js';
// Pure game state: the Firebase transaction and tests use the same functions.
export const CATEGORY_DECK={votacao:0,dilemas:1,blefe:5,debate:2,sintonia:4,desafio:3};
export const SPECIAL={niveis_intimidade:4};
export function connected(room){return Object.keys(room.jogadores||{}).filter(id=>room.jogadores[id]?.conectado!==false).sort((a,b)=>(room.jogadores[a].entrouEm||0)-(room.jogadores[b].entrouEm||0)||a.localeCompare(b));}
export function validateConfig(config,modes){const chosen=[...new Set(config.minigames||[])];if(!chosen.length||chosen.some(id=>!modes[id]))throw Error('Escolha pelo menos um minijogo válido.');if(!config.modoLivre&&new Set(chosen.map(id=>modes[id].categoria)).size>1)throw Error('Ative o Modo Livre para misturar categorias.');const n=Number(config.numeroRodadas);if(!Number.isInteger(n)||n<1||n>100)throw Error('Escolha de 1 a 100 rodadas.');const tones=config.tones===undefined?['leve']:config.tones;if(!Array.isArray(tones)||!tones.length||tones.some(t=>!Object.hasOwn(TONES,t)))throw Error('Escolha pelo menos um tom válido.');if(tones.includes('adulto')&&config.adultConfirmed!==true)throw Error('Confirme que a mesa escolheu o conteúdo de relacionamentos 18+.');return{minigames:chosen,modoLivre:!!config.modoLivre,numeroRodadas:n,tones:[...new Set(tones)],adultConfirmed:tones.includes('adulto')};}
function selectUnused(list,prefix,used,rng){let candidates=list.map((x,i)=>({x,key:prefix+'_'+i})).filter(x=>!used.includes(x.key));if(!candidates.length)candidates=list.map((x,i)=>({x,key:prefix+'_'+i}));return candidates[Math.floor(rng()*candidates.length)];}
export function makeRound(room,modes,decks,rng=Math.random,now=Date.now()){
 const ids=connected(room);if(ids.length<(room.local?1:2))throw Error('A partida precisa de pelo menos 2 jogadores conectados.');
 const round=(room.partida?.rodadaAtual||0)+1;if(round>room.numeroRodadas)return{...room.partida,status:'finalizada'};
 const chosen=room.minigames||[],modeId=chosen[(round-1)%chosen.length],mode=modes[modeId];if(!mode)throw Error('Minijogo não encontrado.');if(modeId==='batalha_de_argumentos'&&ids.length<2)throw Error('Adicione outra pessoa para o debate.');if(modeId==='o_espiao'&&ids.length<3)throw Error('O Espião precisa de pelo menos 3 jogadores.');
 const old=room.partida?.cartaAtual?.readerId,index=ids.indexOf(old),readerId=old?ids[(index+1)%ids.length]:ids[Math.floor(rng()*ids.length)];
 const tone=toneFor(room.tones,round),used=room.partida?.used||[],selection=selectUnused(editorialCards(modeId,tone),modeId+'_'+tone,used,rng);
 const card={id:'c_'+now+'_'+Math.floor(rng()*1e9),flowVersion:6,modeId,tone,deckIndex:SPECIAL[modeId]??CATEGORY_DECK[mode.categoria],readerId,participants:ids,phase:'deck',text:'',options:[],createdAt:now,...structuredClone(selection.x)};
 if(modeId==='o_espiao'){card.spyId=ids[Math.floor(rng()*ids.length)];card.text='Façam perguntas uns aos outros sem dizer a palavra secreta.';card.votingReady=false;}
 if(modeId==='batalha_de_argumentos'){card.debaters=[readerId,ids[(ids.indexOf(readerId)+1)%ids.length]];card.votingReady=false;}
 if(modeId==='o_termometro')card.secretNumber=1+Math.floor(rng()*10);
 if(modeId==='apenas_uma_dica')card.text='Os outros escrevem uma dica de uma palavra. O leitor tenta adivinhar.';
 if(modeId==='palavra_proibida')card.text='Ouça a explicação e envie seu palpite. O leitor não pode usar os termos proibidos.';
 return{status:'jogando',rodadaAtual:round,totalRodadas:room.numeroRodadas,cartaAtual:card,answers:{},used:[...used,selection.key]};
}
export const AUTO_RESULTS=['quem_e_mais_provavel','eu_nunca','o_que_voce_prefere','bandeiras_vermelhas','duas_verdades_uma_mentira','o_termometro','o_espiao','batalha_de_argumentos'];
export function replyIds(room){const c=room.partida?.cartaAtual;if(!c)return[];if(['niveis_intimidade','verdade_ou_desafio_hot'].includes(c.modeId))return[];return c.participants.filter(id=>room.jogadores[id]?.conectado!==false&&room.jogadores[id]&&!(['preencha_a_lacuna','duas_verdades_uma_mentira','o_termometro','apenas_uma_dica','palavra_proibida'].includes(c.modeId)&&id===c.readerId));}
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
export function allowedAnswers(card,uid,room){const id=card.modeId;const others=card.participants.filter(x=>x!==card.readerId);if(['quem_e_mais_provavel','o_espiao'].includes(id))return card.participants;
 if(id==='eu_nunca')return['JA_FIZ','INOCENTE'];if(['o_que_voce_prefere','bandeiras_vermelhas'].includes(id))return['0','1'];if(id==='batalha_de_argumentos')return card.debaters;if(id==='preencha_a_lacuna')return uid===card.readerId?[]:card.white;if(id==='duas_verdades_uma_mentira')return uid===card.readerId?[]:['0','1','2'];if(id==='o_termometro')return uid===card.readerId?[]:Array.from({length:10},(_,i)=>String(i+1));return null;}
export function applyAction(room,uid,action,payload={},modes,decks,rng=Math.random,now=Date.now()){
 if(!room||room.schemaVersion!==3)throw Error('Esta sala usa outra versão do jogo. Crie uma sala nova.');if(!room.jogadores?.[uid]||room.jogadores[uid].conectado===false)throw Error('Você não está conectado à sala.');
 settleVoting(room,now);
 const host=room.hostId===uid,p=room.partida,c=p?.cartaAtual,reader=c?.readerId===uid;const requireHost=()=>{if(!host)throw Error('Somente o anfitrião pode fazer isso.');};const requireCard=()=>{if(room.status!=='jogando'||!c||payload.cardId!==c.id)throw Error('A rodada mudou. Tente novamente.');};
 if(action==='config'){requireHost();if(room.status!=='lobby')throw Error('Altere os jogos no lobby.');Object.assign(room,validateConfig(payload,modes));}
 else if(action==='tutorial'){requireHost();if(room.status!=='lobby')throw Error('A partida já começou.');const ids=connected(room);if(ids.length<(room.local?1:2))throw Error('Convide pelo menos mais uma pessoa.');if(room.local&&room.minigames.includes('batalha_de_argumentos')&&ids.length<2)throw Error('O debate precisa de duas pessoas. Adicione um participante no lobby.');if(room.minigames.includes('o_espiao')&&ids.length<3)throw Error('O Espião precisa de 3 jogadores.');room.status='tutorial';room.ready={};}
 else if(action==='ready'){if(room.status!=='tutorial')throw Error('Tutorial encerrado.');room.ready??={};room.ready[uid]=true;}
 else if(action==='start'){requireHost();if(room.status!=='tutorial')throw Error('A partida já começou.');if(connected(room).some(id=>!room.ready?.[id]))throw Error('Aguarde todos confirmarem que estão prontos.');room.partida=makeRound(room,modes,decks,rng,now);room.status='jogando';}
 else if(action==='restart'){requireHost();if(room.status!=='finalizada')throw Error('A partida ainda está em andamento.');room.status='lobby';room.partida=null;room.ready={};}
 else {requireCard();
 if(action==='skip'){if(!c.participants.includes(uid)||c.phase==='results')throw Error('Esta carta não pode mais ser pulada.');c.skipped=true;c.phase='results';p.answers={};}
 else if(action==='openVoting'){if(!reader&&!host)throw Error('Aguarde quem conduz a rodada.');if(c.phase!=='public'||!['o_espiao','batalha_de_argumentos'].includes(c.modeId)||c.votingReady!==false)throw Error('Votação indisponível.');c.votingReady=true;}
 else if(action==='draw'){if(!reader||c.phase!=='deck')throw Error('Aguarde sua vez de puxar.');c.phase='private';}
 else if(action==='truth'){if(!reader||c.modeId!=='verdade_ou_desafio_hot'||c.phase!=='private'||!['truth','dare'].includes(payload.choice))throw Error('Escolha indisponível.');c.text=c[payload.choice];c.choice=payload.choice;}
 else if(action==='statements'){if(!reader||c.modeId!=='duas_verdades_uma_mentira'||c.phase!=='private')throw Error('Aguarde sua vez.');if(!Array.isArray(payload.statements)||payload.statements.length!==3||payload.statements.some(s=>typeof s!=='string'||!s.trim()||s.length>140)||![0,1,2].includes(payload.lie))throw Error('Preencha os três fatos e marque a mentira.');c.statements=payload.statements.map(s=>s.trim());c.lie=payload.lie;c.text=c.statements.map((s,i)=>(i+1)+'. '+s).join('\n');}
 else if(action==='reveal'){if(!reader||c.phase!=='private')throw Error('Somente o leitor pode revelar a carta.');if(c.modeId==='duas_verdades_uma_mentira'&&!c.statements)throw Error('Escreva os três fatos primeiro.');if(c.modeId==='verdade_ou_desafio_hot'&&!c.choice)throw Error('Escolha Verdade ou Desafio primeiro.');c.phase='public';}
 else if(action==='answer'){if(!['public','voting'].includes(c.phase)||!c.participants.includes(uid))throw Error('Aguarde a próxima rodada ou a revelação da carta.');if(c.votingReady===false)throw Error('Conversem antes de abrir a votação.');const value=String(payload.value??'').trim();if(!value||value.length>140)throw Error('Use uma resposta de até 140 caracteres.');const allowed=allowedAnswers(c,uid,room);if(allowed&&!allowed.includes(value))throw Error('Resposta inválida para este jogo.');if(['niveis_intimidade','verdade_ou_desafio_hot'].includes(c.modeId))throw Error('Esta rodada é respondida em voz alta.');if(c.modeId==='apenas_uma_dica'){if(uid===c.readerId||c.hintsRevealed)throw Error('As dicas já foram encerradas.');if(/\s/.test(value))throw Error('A dica deve ter uma só palavra.');if(normalize(value)===normalize(c.secret))throw Error('A dica não pode ser a própria palavra secreta.');}if(c.modeId==='palavra_proibida'&&reader)throw Error('O leitor dá a dica em voz alta.');p.answers??={};p.answers[uid]=value;}
 else if(action==='hints'){if(!reader&&!host)throw Error('Somente o leitor ou anfitrião.');if(c.modeId!=='apenas_uma_dica'||c.phase!=='public')throw Error('Ação indisponível.');if(replyIds(room).some(id=>!Object.hasOwn(p.answers||{},id)))throw Error('Ainda faltam dicas.');c.hintsRevealed=true;}
 else if(action==='guess'){if(!reader||c.modeId!=='apenas_uma_dica'||!c.hintsRevealed||c.phase!=='public')throw Error('Aguarde as dicas.');const g=String(payload.value||'').trim();if(!g||g.length>80)throw Error('Digite seu palpite.');c.guess=g;c.phase='results';}
 else if(action==='judge'){if(!reader||c.modeId!=='preencha_a_lacuna'||c.phase!=='public'||!p.answers?.[payload.winner])throw Error('Escolha uma resposta recebida.');if(replyIds(room).some(id=>!Object.hasOwn(p.answers||{},id)))throw Error('Aguarde todas as respostas antes de escolher.');c.winner=payload.winner;c.phase='results';}
 else if(action==='results'){if(!reader&&!host)throw Error('Aguarde o leitor.');if(c.phase!=='public')throw Error('Revele a carta primeiro.');if(!(room.local&&connected(room).length===1)&&(AUTO_RESULTS.includes(c.modeId)||['apenas_uma_dica','preencha_a_lacuna'].includes(c.modeId)))throw Error('Conclua a atividade da rodada ou pule a carta.');c.phase='results';}
 else if(action==='next'){if(!reader&&!host)throw Error('Aguarde sua vez.');if(c.phase!=='results'&&!host)throw Error('Conclua a rodada primeiro.');room.partida=makeRound(room,modes,decks,rng,now);if(room.partida.status==='finalizada')room.status='finalizada';}
 else throw Error('Ação desconhecida.');}
 settleVoting(room,now);return room;
}
export function textForViewer(card,uid){if(typeof card.viewerText==='string')return card.viewerText;if(card.skipped)return'Carta pulada. Ninguém precisa explicar o motivo.';const own=card.readerId===uid,mode=card.modeId,results=card.phase==='results';if(!own&&['deck','private','voting'].includes(card.phase))return'';
 if(mode==='o_espiao')return results?'Palavra da rodada: '+card.secret:uid===card.spyId?'Você é o ESPIÃO. Descubra a palavra sem levantar suspeitas.':'Palavra secreta: '+card.secret+'. Não diga a palavra em voz alta!';
 if(mode==='o_termometro')return card.text+(own||results?'\nNúmero secreto: '+card.secretNumber+' de 10. Dê um exemplo dessa intensidade sem dizer o número.':'\nOuça o exemplo do leitor e escolha uma intensidade de 1 a 10.');
 if(mode==='apenas_uma_dica')return results?'Palavra: '+card.secret:own?'Você é quem adivinha. Revele a rodada para os outros enviarem dicas; depois tente descobrir a palavra.':'Dê uma única palavra de dica para: '+card.secret;
 if(mode==='palavra_proibida')return own||results?'Explique: '+card.secret+'\nNão pode dizer: '+card.forbidden.join(', '):card.text;
 return card.text;
}
export function uniqueHints(answers){const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();const vals=Object.values(answers||{});return vals.filter(v=>vals.filter(x=>norm(x)===norm(v)).length===1);}


// Answers finish voting; only the reader explicitly reveals new cards.
export function settleVoting(room,now=Date.now()){
 const p=room?.partida,c=p?.cartaAtual;if(room?.status!=='jogando'||!c||c.skipped)return room;
 if(c.modeId==='quem_e_mais_provavel'&&c.phase==='voting'){c.phase='public';delete c.voteOpensAt;}
 if(!['public','voting'].includes(c.phase)||c.votingReady===false)return room;
 const eligible=replyIds(room),complete=eligible.length>0&&eligible.every(id=>Object.hasOwn(p.answers||{},id));
 if(complete&&AUTO_RESULTS.includes(c.modeId)){c.phase='results';c.revealedAt=now;}
 if(complete&&c.modeId==='apenas_uma_dica')c.hintsRevealed=true;
 if(c.modeId==='palavra_proibida'){const winner=eligible.find(id=>p.answers?.[id]&&normalize(p.answers[id])===normalize(c.secret));if(winner){c.winner=winner;c.phase='results';c.revealedAt=now;}}
 return room;
}
