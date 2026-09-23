export const BUILD='MESA VIVA 07';
const get=(key,fallback)=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
export const visual={scene:get('mq_scene_version','')==='arcade07'?get('mq_scene','arcade'):'arcade',motion:get('mq_motion','auto')};
export function reducedMotion(){return visual.motion==='off'||visual.motion==='auto'&&matchMedia('(prefers-reduced-motion: reduce)').matches;}
export function setVisual(key,value){visual[key]=value;try{localStorage.setItem('mq_'+key,value);}catch{}document.documentElement.dataset.scene=visual.scene;document.documentElement.dataset.motion=reducedMotion()?'off':'on';window.dispatchEvent(new Event('mq-visual'));}
setVisual('scene',['arcade','galaxia','floresta','lava'].includes(visual.scene)?visual.scene:'arcade');
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>setVisual('motion',visual.motion));
export function mountVisualControls(container){
 const dialog=container||document.createElement('dialog');dialog.id='visual-settings';dialog.innerHTML='<header><h2>Cenário e movimento</h2><button type="button" aria-label="Fechar ajustes">×</button></header><div class="dialog-scroll"><label for="scene-choice">Seu cenário</label><select id="scene-choice"><option value="arcade">Clube Mesa Quente</option><option value="galaxia">Galáxia espiral</option><option value="floresta">Floresta de vaga-lumes</option><option value="lava">Templo de lava</option></select><label for="motion-choice">Animações</label><select id="motion-choice"><option value="auto">Seguir preferência do aparelho</option><option value="on">Ativadas</option><option value="off">Desativadas</option></select><p>Esta escolha muda o visual apenas neste aparelho.</p><p id="graphics-status" role="status"></p><small>Versão '+BUILD+'</small></div>';
 if(!container)document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.closest('dialog')?.close();
 for(const [id,key]of [['scene-choice','scene'],['motion-choice','motion']]){const s=dialog.querySelector('#'+id);s.value=visual[key];s.onchange=()=>setVisual(key,s.value);}
 document.querySelectorAll('[data-visual-settings]').forEach(b=>b.onclick=()=>{dialog.querySelector('#graphics-status').textContent=(document.querySelector('#stage')?.dataset.renderer||'O cenário é carregado ao iniciar a partida')+' · '+(reducedMotion()?'Movimento reduzido':'Animações ativadas');dialog.showModal();});
}

try{localStorage.setItem('mq_scene_version','arcade07');}catch{}
