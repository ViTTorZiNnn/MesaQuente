// Room membership and message metadata are owned by the server.
export function appendChat(room,uid,text,id,now=Date.now()){
 const player=room?.jogadores?.[uid];
 if(!player||player.conectado===false)throw Error('Você não participa desta sala.');
 if(typeof text!=='string')throw Error('Escreva uma mensagem.');
 const clean=text.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g,'').trim();
 if(!clean||clean.length>300)throw Error('Use uma mensagem de 1 a 300 caracteres.');
 if(typeof id!=='string'||!/^[a-zA-Z0-9_-]{16,80}$/.test(id))throw Error('Mensagem inválida.');
 room.chat??={};
 if(room.chat[id]){if(room.chat[id].uid!==uid)throw Error('Mensagem inválida.');return room;}
 const previous=room.chatLimits?.[uid];
 if(typeof previous==='number'&&now-previous<1200)throw Error('Aguarde um instante antes de enviar outra mensagem.');
 room.chatLimits??={};room.chatLimits[uid]=now;
 room.chat[id]={uid,name:player.nome,emoji:player.avatar?.emoji||'🙂',text:clean,at:now};
 room.chat=Object.fromEntries(Object.entries(room.chat).sort((a,b)=>a[1].at-b[1].at||a[0].localeCompare(b[0])).slice(-60));
 return room;
}
