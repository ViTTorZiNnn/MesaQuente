export function withDeadline(promise, ms, message, onTimeout = () => {}) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => { onTimeout(); reject(Error(message)); }, ms);
  })]).finally(() => clearTimeout(timer));
}
export function authMessage(error) {
  const code = error?.code || '';
  if (code.includes('api-key')) return 'A chave pública do Firebase foi rejeitada. Confira public/firebase-config.js.';
  if (code === 'auth/operation-not-allowed') return 'Ative o método de login Anônimo no Firebase Authentication.';
  if (code === 'auth/unauthorized-domain') return 'Este domínio não está autorizado no Firebase Authentication.';
  if (code === 'auth/network-request-failed') return 'Não foi possível acessar o login do Firebase. Verifique sua conexão.';
  return error?.message || 'Não foi possível autenticar o jogador.';
}
export class RoomService {
  constructor({onRoom,onConnection,onError,onProgress=()=>{}}) {
    Object.assign(this,{onRoom,onConnection,onError,onProgress});
    this.code=null; this.uid=null; this.sequence=0; this.applied=0;
    this.online=navigator.onLine!==false; this.onConnection(this.online);
    if(!window.firebase?.auth) throw Error('O módulo de login não carregou. Recarregue a página.');
    if(!firebase.apps.length) firebase.initializeApp(window.MQ_FIREBASE_CONFIG);
    this.auth=firebase.auth();
    // Log in only when joining/creating, so browsing the menu cannot leave a rejected login cached.
    this.login=null;
  }
  async authenticate() {
    if(!this.login) {
      this.login=(async()=>{
        await this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        const user=await new Promise((resolve,reject)=>{
          const off=this.auth.onAuthStateChanged(u=>{off();resolve(u);},reject);
        });
        return user || (await this.auth.signInAnonymously()).user;
      })();
      const current=this.login;
      current.catch(()=>{if(this.login===current)this.login=null;});
    }
    try {
      const user=await withDeadline(this.login,15000,'O login demorou mais de 15 segundos. Verifique a conexão e tente novamente.');
      this.uid=user.uid; return user;
    } catch(e) { throw Error(authMessage(e)); }
  }
  async request(op,data={}) {
    const sequence=++this.sequence, progress=op!=='state';
    const report=message=>{if(progress)this.onProgress(message);};
    try {
      report('Identificando você…');
      const user=await this.authenticate();
      const token=await withDeadline(user.getIdToken(),10000,'Não foi possível renovar o login em 10 segundos. Recarregue a página.');
      report(op==='create'?'Criando sua sala…':op==='join'?'Entrando na sala…':'Enviando…');
      const controller=new AbortController();
      const value=await withDeadline((async()=>{
        const response=await fetch('/api/game',{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({op,code:this.code,...data})});
        const raw=await response.text(); let value;
        try {value=JSON.parse(raw);} catch {
          if(response.status===404)throw Error('A API da sala não foi publicada (404). Confira a pasta api e a configuração da Vercel.');
          if(response.status===504)throw Error('O servidor excedeu o tempo de resposta (504). Confira os logs da Vercel.');
          throw Error('O servidor retornou uma resposta inesperada (HTTP '+response.status+'). Confira os logs da Vercel.');
        }
        if(!response.ok)throw Error(value?.error||'Falha no servidor (HTTP '+response.status+').');
        if(!value||typeof value!=='object')throw Error('O servidor enviou uma resposta inválida.');
        if(['create','join'].includes(op)&&(!/^[A-Z]{4}$/.test(value.code)||!value.room?.jogadores?.[this.uid]))throw Error('O servidor não confirmou sua entrada na sala.');
        return value;
      })(),25000,'O servidor não respondeu em 25 segundos. A operação pode ter sido concluída; confira os logs da Vercel antes de repetir.',()=>controller.abort());
      this.online=true;this.onConnection(true);
      if(sequence>=this.applied){this.applied=sequence;if(op==='create'||op==='join')this.code=value.code;if(value.room){const serialized=JSON.stringify(value.room);if(serialized!==this.lastRoom){this.lastRoom=serialized;this.onRoom(value.room);}}}
      return value;
    } catch(e) {
      if(navigator.onLine===false||e instanceof TypeError){this.online=false;this.onConnection(false);throw Error('Não foi possível conectar ao servidor. Verifique a internet e tente novamente.');}
      throw e;
    } finally {report('');}
  }
  remember(name,avatar){this.profile={nome:name,avatar};sessionStorage.setItem('mq3_room',this.code);sessionStorage.setItem('mq3_profile',JSON.stringify(this.profile));this.poll();}
  poll(){clearTimeout(this.timer);if(!this.code)return;this.timer=setTimeout(async()=>{try{await this.request('state');this.lastPollError=null;}catch(e){if(this.lastPollError!==e.message){this.lastPollError=e.message;this.onError(e);}}finally{this.poll();}},2000);}
  async create(name,avatar,config){const result=await this.request('create',{name,avatar,config});this.remember(name,avatar);return result.code;}
  async join(code,name,avatar){const result=await this.request('join',{code:code.trim().toUpperCase(),name,avatar});this.remember(name,avatar);return result.code;}
  async action(type,payload={}){await this.request('action',{type,payload});}
  async chat(text,messageId){await this.request('chat',{text,messageId});}
  async react(emoji){await this.request('react',{emoji});}
  async leave(){clearTimeout(this.timer);try{if(this.code)await this.request('leave');}catch(e){this.poll();throw e;}this.code=null;this.lastRoom=null;sessionStorage.removeItem('mq3_room');sessionStorage.removeItem('mq3_profile');}
}

