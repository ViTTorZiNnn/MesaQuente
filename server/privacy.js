import {textForViewer,replyIds} from './motor.js';
// Build a new response from allowed fields; never send the database snapshot.
export function viewFor(room,uid){
 if(!room?.jogadores?.[uid])throw Error('Você não participa desta sala.');
 const out={};for(const k of ['schemaVersion','hostId','status','minigames','modoLivre','numeroRodadas','ready','reactions','tones','adultConfirmed'])if(room[k]!==undefined)out[k]=structuredClone(room[k]);
 out.jogadores={};for(const [id,p] of Object.entries(room.jogadores))out.jogadores[id]={nome:p.nome,avatar:p.avatar,conectado:p.conectado,entrouEm:p.entrouEm};
 const p=room.partida,c=p?.cartaAtual;if(!c)return out;
 const own=c.readerId===uid,participant=c.participants.includes(uid),results=c.phase==='results'&&!c.skipped,visible=results||!c.skipped&&participant&&(c.phase==='public'||own&&['private','voting'].includes(c.phase));
 const card={};for(const k of ['id','modeId','deckIndex','readerId','participants','phase','createdAt','level','hintsRevealed','debaters','voteOpensAt','revealedAt','tone','votingReady','skipped','flowVersion'])if(c[k]!==undefined)card[k]=structuredClone(c[k]);
 card.viewerText=visible?textForViewer(c,uid):'';card.options=[];card.white=[];
 if(visible){for(const k of ['options','white','statements','choice','debaters','winner','guess'])if(c[k]!==undefined)card[k]=structuredClone(c[k]);}
 if(results){for(const k of ['secret','secretNumber','spyId','lie'])if(c[k]!==undefined)card[k]=c[k];}
 else if(own&&visible&&c.lie!==undefined)card.lie=c.lie;
 const answers=p.answers||{};let shown={};
 if(!c.skipped&&(results||c.phase==='public'&&(c.modeId==='preencha_a_lacuna'||c.modeId==='apenas_uma_dica'&&c.hintsRevealed)))shown=structuredClone(answers);
 else if(answers[uid]!==undefined)shown[uid]=answers[uid];
 out.partida={status:p.status,rodadaAtual:p.rodadaAtual,totalRodadas:p.totalRodadas,cartaAtual:card,answers:shown,answerCount:replyIds(room).filter(id=>Object.hasOwn(answers,id)).length,expectedCount:replyIds(room).length,answeredIds:replyIds(room).filter(id=>Object.hasOwn(answers,id))};return out;
}

