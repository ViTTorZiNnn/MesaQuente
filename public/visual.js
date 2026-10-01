export const BUILD='MESA QUENTE 18 · EM CHAMAS';
const get=(key,fallback)=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
// Mapas: cenário de fundo + estilo da interface. A mesa e o baralho são os mesmos em todos.
export const MAPAS={quente:{nome:'Mesa Quente',desc:'Aço, luz vermelha, cartas caindo e chamas em pixel.'},boteco:{nome:'Boteco',desc:'Bar brasileiro, luz quente e varal de lâmpadas.'},galaxia:{nome:'Galáxia',desc:'Nebulosas, planetas e estrelas cadentes.'},noir:{nome:'Noir Glitch',desc:'Preto e branco, chuva, granulado e falhas na tela.'}};
// O mapa vem da sala (escolhido pelo anfitrião). Cada pessoa pode trocar só no próprio aparelho.
let roomMap=null,pref=get('mq_scene_pref','sala');if(pref!=='sala'&&!MAPAS[pref])pref='sala';
export const visual={scene:'quente',motion:get('mq_motion','auto'),get pref(){return pref;},get roomMap(){return roomMap;}};
export function reducedMotion(){return visual.motion==='off'||visual.motion==='auto'&&matchMedia('(prefers-reduced-motion: reduce)').matches;}
function apply(){const scene=pref!=='sala'&&MAPAS[pref]?pref:MAPAS[roomMap]?roomMap:'quente';const changed=scene!==visual.scene;visual.scene=scene;document.documentElement.dataset.scene=scene;document.documentElement.dataset.motion=reducedMotion()?'off':'on';window.dispatchEvent(new Event('mq-visual'));return changed;}
export function setRoomMap(map){const next=MAPAS[map]?map:null;if(next===roomMap)return false;roomMap=next;return apply();}
export function setScenePref(value){pref=value==='sala'||!MAPAS[value]?'sala':value;try{localStorage.setItem('mq_scene_pref',pref);}catch{}return apply();}
export function setVisual(key,value){if(key==='scene')return setScenePref(value);visual[key]=value;try{localStorage.setItem('mq_'+key,value);}catch{}apply();}
apply();
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',apply);
export function mountVisualControls(container){
 const dialog=container||document.createElement('dialog');dialog.id='visual-settings';
 dialog.innerHTML='<header><h2>Visual</h2><button type="button" aria-label="Fechar ajustes">×</button></header><div class="dialog-scroll"><label for="scene-choice">Estilo do cenário</label><select id="scene-choice"><option value="sala">Igual ao mapa da sala (padrão)</option>'+Object.entries(MAPAS).map(([id,m])=>'<option value="'+id+'">'+m.nome+'</option>').join('')+'</select><p class="subtle" id="scene-note"></p><label for="motion-choice">Animações</label><select id="motion-choice"><option value="auto">Seguir preferência do aparelho</option><option value="on">Ativadas</option><option value="off">Desativadas</option></select><p id="graphics-status" role="status"></p><small>Versão '+BUILD+'</small></div>';
 if(!container)document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.closest('dialog')?.close();
 const scene=dialog.querySelector('#scene-choice'),note=dialog.querySelector('#scene-note'),motion=dialog.querySelector('#motion-choice');
 const refresh=()=>{scene.value=pref;note.textContent=pref==='sala'?'Você vê o mapa que o anfitrião escolheu'+(roomMap?' ('+MAPAS[roomMap].nome+').':'.'):'Só neste aparelho você vê '+MAPAS[pref].nome+'. Os outros continuam vendo o mapa da sala.';};
 scene.onchange=()=>{setScenePref(scene.value);refresh();};motion.value=visual.motion;motion.onchange=()=>setVisual('motion',motion.value);
 window.addEventListener('mq-visual',refresh);refresh();
 document.querySelectorAll('[data-visual-settings]').forEach(b=>b.onclick=()=>{dialog.querySelector('#graphics-status').textContent=(reducedMotion()?'Movimento reduzido':'Animações ativadas');dialog.showModal();});
}
