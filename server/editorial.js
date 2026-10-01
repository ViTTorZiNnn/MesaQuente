import {QUENTE,CASAL} from './cartas-quentes.js';
import {TERMOMETRO,FAMOSOS} from './cartas-jogos.js';
// Shared editorial catalogue. Mechanics and tone are independent choices.
export const TONES={leve:'Leve e divertido',profundo:'Sério e pessoal',adulto:'Picante · 18+',casal:'A dois · 18+'};
export const ADULT_TONES=['adulto','casal'];
export function toneFor(tones,round){const selected=Object.keys(TONES).filter(t=>tones?.includes(t));if(!selected.length)return'leve';return selected[(round-1)%selected.length];}
const bank={
 leve:{
 votes:['Quem perderia o celular enquanto está segurando ele?','Quem faria amizade com alguém numa fila?','Quem levaria três malas para uma viagem de dois dias?','Quem cantaria no karaokê sem conhecer a letra?','Quem inventaria uma desculpa criativa para chegar atrasado?','Quem organizaria uma festa e esqueceria de se convidar?'],
 never:['Eu nunca entrei num cômodo e esqueci o que fui buscar.','Eu nunca mandei uma mensagem para a pessoa errada.','Eu nunca ri numa hora em que precisava ficar sério.','Eu nunca disse que estava chegando sem ter saído de casa.','Eu nunca fingi conhecer uma música.','Eu nunca queimei uma receita que parecia fácil.'],
 questions:['Qual comida faz você lembrar da infância?','Qual passeio você gostaria de repetir?','Qual mania sua rende brincadeiras entre os amigos?','Qual foi a compra mais inútil que você já fez?','Que habilidade você gostaria de aprender só por diversão?','Que pequeno acontecimento melhorou seu dia recentemente?'],
 pairs:[['Poder voar','Poder respirar debaixo da água'],['Morar na praia','Morar nas montanhas'],['Nunca mais lavar louça','Nunca mais arrumar a casa'],['Viajar com tudo planejado','Decidir a viagem na hora']],
 flags:[['A pessoa cozinha muito bem','deixa toda a louça para você'],['Vocês gostam dos mesmos filmes','ela conta o final antes da sessão'],['A pessoa sempre anima a festa','nunca quer ir embora'],['A pessoa lembra seu aniversário','faz festa surpresa mesmo sabendo que você não gosta']],
 debates:['O fim de semana deveria durar quatro dias.','Pizza doce deveria vir antes da salgada.','Aniversário deveria dar uma semana de folga.','Áudios deveriam durar no máximo um minuto.'],
 scales:['Uma comida: 1 = não comeria de novo; 10 = minha favorita.','Um passeio: 1 = sem graça; 10 = inesquecível.','Uma bagunça: 1 = quase nada fora do lugar; 10 = caos completo.'],
 blanks:[['Meu talento secreto é ________.',['Dormir sentado','Perder coisas que estão na minha mão','Dar conselhos que não sigo','Queimar água']],['A festa acabou quando apareceu ________.',['Uma conta inesperada','Um karaokê desafinado','O vizinho com um microfone','Uma pizza sem recheio']],['Para sobreviver ao apocalipse, eu levaria ________.',['Um carregador portátil','Uma panela de pressão','Uma planilha','A pessoa que sempre leva lanche']]],
 truth:['Qual foi sua desculpa mais boba para não sair de casa?','Qual hábito engraçado você tem quando está sozinho?','Qual foi seu maior mico numa viagem?'],
 dare:['Faça uma propaganda de dez segundos para um objeto perto de você.','Imite um animal sem dizer qual é. A mesa tenta adivinhar.','Cante uma música usando só a sílaba lá.'],
 words:['Pipoca','Praia','Cinema','Karaokê','Sorvete','Acampamento'],
 forbidden:[['Pipoca','milho','cinema','panela'],['Praia','mar','areia','sol'],['Karaokê','cantar','música','microfone']],
 facts:['Conte três acontecimentos engraçados da sua vida: dois reais e um inventado.','Escreva três coisas que você já tentou fazer. Invente uma delas.','Conte três histórias de viagem: duas verdadeiras e uma falsa.']},
 profundo:{
 votes:['Quem da mesa escutaria um problema sem julgar?','Quem admitiria um erro mesmo sem ninguém perceber?','Quem conseguiria recomeçar numa cidade desconhecida?','Quem costuma cuidar dos outros e esquecer de si?','Quem manteria uma amizade mesmo morando longe?','Quem mudaria de opinião depois de ouvir um bom argumento?'],
 never:['Eu nunca disse que estava bem para evitar uma conversa difícil.','Eu nunca mudei de opinião sobre alguém depois de conhecer sua história.','Eu nunca deixei de pedir ajuda por vergonha.','Eu nunca voltei atrás e pedi desculpas.','Eu nunca adiei uma decisão por medo de decepcionar alguém.','Eu nunca me comparei com alguém e me senti ficando para trás.'],
 questions:['Que opinião importante sua mudou com o tempo?','Qual limite você aprendeu a colocar nas suas relações?','Que decisão difícil você entende melhor hoje?','O que faz você confiar em alguém?','Que conselho você daria para a pessoa que era há cinco anos?','Qual conquista pequena exigiu muito de você?'],
 pairs:[['Receber uma verdade difícil agora','Esperar até se sentir pronto para ouvi-la'],['Trabalhar com o que ama ganhando menos','Ter estabilidade num trabalho que não anima'],['Recomeçar perto de quem você ama','Seguir um sonho longe dessas pessoas'],['Pedir desculpas sem garantia de perdão','Dar espaço e esperar a outra pessoa procurar você']],
 flags:[['A pessoa ajuda quando você precisa','faz você se sentir em dívida depois'],['A pessoa fala com sinceridade','não aceita ouvir críticas'],['A pessoa respeita suas escolhas','desaparece sempre que você precisa conversar'],['A pessoa é leal','espera que você concorde com tudo']],
 debates:['Ser sincero nem sempre é dizer tudo o que se pensa.','Amizades podem acabar sem que ninguém seja culpado.','Estabilidade pode valer mais que realização profissional.','Mudar de opinião é sinal de força.'],
 scales:['Uma decisão: 1 = fácil de tomar; 10 = muda a vida inteira.','Uma atitude de confiança: 1 = pequeno gesto; 10 = grande demonstração.','Um pedido de desculpas: 1 = pouco convincente; 10 = realmente reparador.'],
 blanks:[['Uma amizade fica mais forte quando existe ________.',['Espaço para discordar','Ajuda sem cobrança','Tempo de qualidade','Coragem para pedir desculpas']],['Hoje eu preciso de mais ________.',['Tempo sem pressa','Coragem para mudar','Conversas sinceras','Descanso sem culpa']],['Uma conquista que costuma passar despercebida é ________.',['Aprender a dizer não','Pedir ajuda','Recomeçar','Reconhecer um erro']]],
 truth:['Quando você percebeu que precisava mudar uma atitude?','O que você gostaria que as pessoas entendessem melhor sobre você?','Qual experiência mudou sua ideia de sucesso?'],
 dare:['Agradeça a alguém da mesa por uma atitude concreta.','Conte uma qualidade sua que você costuma minimizar.','Complete em voz alta: neste momento, eu gostaria de aprender a…'],
 words:['Confiança','Amizade','Coragem','Saudade','Escolha','Recomeço'],
 forbidden:[['Confiança','acreditar','segredo','certeza'],['Saudade','falta','lembrança','distância'],['Coragem','medo','bravura','enfrentar']],
 facts:['Conte duas decisões reais que já tomou e invente uma terceira.','Escreva duas habilidades que aprendeu e uma que ainda não sabe fazer.','Conte dois sonhos que já teve e invente outro.']}
};
bank.leve.scales=["Tema: comida. Pense em um prato e dê seu nome como pista. Escala: 1 = você detesta; 10 = é seu favorito.", "Tema: passeio de fim de semana. Descreva um programa como pista. Escala: 1 = muito entediante; 10 = diversão perfeita.", "Tema: bagunça em casa. Descreva como estaria um quarto. Escala: 1 = quase arrumado; 10 = impossível encontrar qualquer coisa.", "Tema: vergonha em público. Invente uma situação. Escala: 1 = pequeno constrangimento; 10 = vontade de desaparecer."];
bank.leve.blanks=[["Você está numa entrevista de emprego e resolve ser sincero: meu talento secreto é ________.", ["dormir sentado", "perder o que está na minha mão", "dar conselhos que não sigo", "queimar até água"]], ["No grupo de amigos, você explica por que a festa acabou: tudo desandou quando apareceu ________.", ["uma conta que ninguém queria pagar", "um karaokê desafinado", "o vizinho reclamando do barulho", "uma pizza sem recheio"]], ["Sua equipe só pode levar mais uma coisa para sobreviver ao apocalipse. Você escolhe ________.", ["um carregador portátil", "uma panela de pressão", "uma planilha de tarefas", "um amigo que sempre leva lanche"]]];
bank.profundo.scales=["Tema: decisões da vida adulta. Cite uma decisão como pista. Escala: 1 = simples e reversível; 10 = muda completamente sua vida.", "Tema: confiança entre amigos. Descreva uma atitude como pista. Escala: 1 = pequeno sinal de confiança; 10 = confiar algo muito importante.", "Tema: pedido de desculpas. Invente o que alguém diria ou faria. Escala: 1 = desculpa vazia; 10 = assume o erro e repara o dano.", "Tema: limites pessoais. Descreva um pedido que alguém faria a você. Escala: 1 = fácil aceitar; 10 = ultrapassa totalmente seu limite."];
bank.profundo.blanks=[["Uma amizade passou por uma briga e vocês querem reconstruí-la. Para isso, precisa haver ________.", ["espaço para discordar", "ajuda sem cobrança", "tempo de qualidade", "coragem para pedir desculpas"]], ["Depois de uma semana difícil, você decide mudar sua rotina. Hoje, precisa de mais ________.", ["tempo sem pressa", "coragem para mudar", "conversas sinceras", "descanso sem culpa"]], ["Na conversa sobre vitórias pessoais, você lembra que também merece reconhecimento quem consegue ________.", ["aprender a dizer não", "pedir ajuda", "recomeçar depois de um erro", "reconhecer que precisa mudar"]]];
// Cartas 18+ ficam em cartas-quentes.js para facilitar a edição.
bank.adulto=QUENTE;bank.casal=CASAL;
// Leve: sem cartas sobre objetos ou compras; mais situações e histórias.
bank.leve.questions=bank.leve.questions.map(q=>q==='Qual foi a compra mais inútil que você já fez?'?'Qual foi o maior mico que você já pagou tentando impressionar alguém?':q);
bank.leve.dare=bank.leve.dare.map(d=>d.startsWith('Faça uma propaganda')?'Faça uma propaganda de dez segundos vendendo a pessoa à sua direita como o melhor partido da cidade.':d);
bank.leve.blanks=bank.leve.blanks.map(([t,w])=>t.includes('apocalipse')?['Num reality show, eu seria eliminado na primeira semana por ________.',['roncar alto demais','flertar com todo mundo','chorar na primeira prova','comer a comida dos outros']]:[t,w]);
bank.leve.votes.push('Quem da mesa já mandou print da conversa para a pessoa errada?','Quem fingiria um sotaque a noite inteira para impressionar um crush?','Quem seria expulso primeiro de um casamento por causa da dança?');
bank.leve.never.push('Eu nunca stalkeei um ex até as fotos de 2015.','Eu nunca chorei vendo um reality show.','Eu nunca dei em cima de alguém e descobri que a pessoa era comprometida.');
for(const t of Object.keys(TERMOMETRO)){bank[t].termometro=TERMOMETRO[t];bank[t].famosos=FAMOSOS[t];}
export const editorialBank=bank;
export function editorialCards(mode,tone){const b=bank[tone]||bank.leve;const simple=(key)=>b[key].map(text=>({text}));
 switch(mode){
 case'quem_e_mais_provavel':return simple('votes');case'eu_nunca':return simple('never');case'niveis_intimidade':return simple('questions');
 case'o_que_voce_prefere':return b.pairs.map(options=>({text:'O que você prefere?\n'+options.join('\nOU\n'),options}));
 case'bandeiras_vermelhas':return b.flags.map(([a,c])=>({text:a+', mas '+c+'. Você daria uma chance?',options:['Daria uma chance','Não daria uma chance']}));
 case'batalha_de_argumentos':return simple('debates');case'o_termometro':return b.termometro.map(scale=>({text:scale.tema,scale}));
 case'preencha_a_lacuna':return b.blanks.map(([text,white])=>({text:'Complete a frase escolhendo uma das respostas disponíveis.\n'+text,white}));
 case'verdade_ou_desafio_hot':return b.truth.map((truth,i)=>({text:'Escolha Verdade ou Desafio. Você pode pular sem explicar.',truth,dare:b.dare[i]}));
 case'duas_verdades_uma_mentira':return simple('facts');
 case'o_espiao':return b.words.map(secret=>({secret}));
 case'apenas_uma_dica':return b.famosos.map(f=>({secret:f.nome,aliases:f.alias||[],cat:f.cat}));
 case'palavra_proibida':return b.forbidden.map(([secret,...forbidden])=>({secret,forbidden}));
 default:throw Error('Minijogo sem conteúdo revisado.');
 }}
