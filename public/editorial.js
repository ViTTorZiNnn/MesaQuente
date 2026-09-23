// Shared editorial catalogue. Mechanics and tone are independent choices.
export const TONES={leve:'Leve e divertido',profundo:'Sério e pessoal',adulto:'Relacionamentos · 18+'};
export function toneFor(tones,round){const selected=Object.keys(TONES).filter(t=>tones?.includes(t));if(!selected.length)return'leve';const rhythm=['leve','profundo','leve','adulto'].filter(t=>selected.includes(t));return rhythm[(round-1)%rhythm.length];}
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
 facts:['Conte duas decisões reais que já tomou e invente uma terceira.','Escreva duas habilidades que aprendeu e uma que ainda não sabe fazer.','Conte dois sonhos que já teve e invente outro.']},
 adulto:{
 votes:['Quem tomaria a iniciativa depois de um encontro muito bom?','Quem se apaixonaria primeiro e demoraria para admitir?','Quem diria com clareza o que espera de uma relação?','Quem planejaria um encontro inteiro pensando nos detalhes?','Quem confundiria simpatia com flerte?','Quem toparia conversar sobre ciúme sem transformar tudo numa briga?'],
 never:['Eu nunca ensaiei uma mensagem de flerte antes de enviar.','Eu nunca voltei a conversar com alguém com quem já tive uma história.','Eu nunca escondi interesse por medo de rejeição.','Eu nunca mudei de ideia sobre alguém depois de um beijo.','Eu nunca precisei conversar sobre limites num relacionamento.','Eu nunca saí de um encontro sabendo que não queria um segundo.'],
 questions:['Que atitude desperta seu interesse além da aparência?','O que faz um encontro parecer íntimo de verdade?','Que limite você considera importante conversar antes de se envolver?','Qual diferença existe, para você, entre desejo e conexão?','Como você prefere demonstrar que está interessado em alguém?','O que você gostaria de conseguir dizer com mais clareza numa relação?'],
 pairs:[['Uma química intensa com planos incompatíveis','Uma relação tranquila que cresce aos poucos'],['Falar sobre expectativas no primeiro encontro','Esperar alguns encontros para tocar no assunto'],['Manter amizade com alguém com quem já se envolveu','Encerrar o contato para seguir em frente'],['Um encontro surpresa','Planejar o encontro juntos']],
 flags:[['A pessoa demonstra muito interesse','cobra respostas imediatas às mensagens'],['A química entre vocês é ótima','vocês querem relações diferentes'],['A pessoa é carinhosa a sós','evita reconhecer a relação perto dos amigos'],['Vocês conversam sobre tudo','ela faz piada quando você fala de um limite']],
 debates:['Química não compensa falta de respeito.','Ciúme não é prova de amor.','Expectativas precisam ser conversadas antes de virarem cobranças.','É possível manter amizade depois de um envolvimento romântico.'],
 scales:['Um flerte: 1 = quase imperceptível; 10 = totalmente direto.','Um encontro: 1 = distante; 10 = muita conexão.','Uma demonstração de carinho: 1 = discreta; 10 = muito intensa.'],
 blanks:[['Eu perderia o interesse num encontro por causa de ________.',['Falta de respeito','Uma cobrança sem sentido','Desinteresse pela conversa','Uma mentira desnecessária']],['O melhor sinal de química é ________.',['Uma conversa que flui','Um silêncio confortável','Vontade de se ver de novo','Um sorriso que não dá para esconder']],['Para um encontro ter minha cara, precisa de ________.',['Bom humor','Uma conversa sem pressa','Um plano diferente','Espaço para ser eu mesmo']]],
 truth:['Qual foi o flerte mais direto que você já fez?','Que detalhe tornou um beijo inesquecível para você?','Qual conversa você acha indispensável antes de começar uma relação?'],
 dare:['Invente uma cantada engraçada e apresente para a mesa.','Descreva seu encontro ideal em três frases.','Faça um elogio respeitoso a alguém da mesa, se a pessoa quiser participar.'],
 words:['Encontro','Romance','Flerte','Ciúme','Carinho','Química'],
 forbidden:[['Flerte','cantada','interesse','paquera'],['Romance','amor','casal','namoro'],['Ciúme','posse','insegurança','traição']],
 facts:['Conte duas histórias reais de encontros e invente uma terceira, sem expor nomes.','Escreva duas atitudes que você gosta num encontro e invente uma terceira.','Conte duas situações de flerte que já viveu e invente outra.']}
};
export const editorialBank=bank;
export function editorialCards(mode,tone){const b=bank[tone]||bank.leve;const simple=(key)=>b[key].map(text=>({text}));
 switch(mode){
 case'quem_e_mais_provavel':return simple('votes');case'eu_nunca':return simple('never');case'niveis_intimidade':return simple('questions');
 case'o_que_voce_prefere':return b.pairs.map(options=>({text:'O que você prefere?\n'+options.join('\nOU\n'),options}));
 case'bandeiras_vermelhas':return b.flags.map(([a,c])=>({text:a+', mas '+c+'. Você daria uma chance?',options:['Daria uma chance','Não daria uma chance']}));
 case'batalha_de_argumentos':return simple('debates');case'o_termometro':return simple('scales');
 case'preencha_a_lacuna':return b.blanks.map(([text,white])=>({text,white}));
 case'verdade_ou_desafio_hot':return b.truth.map((truth,i)=>({text:'Escolha Verdade ou Desafio. Você pode pular sem explicar.',truth,dare:b.dare[i]}));
 case'duas_verdades_uma_mentira':return simple('facts');
 case'o_espiao':case'apenas_uma_dica':return b.words.map(secret=>({secret}));
 case'palavra_proibida':return b.forbidden.map(([secret,...forbidden])=>({secret,forbidden}));
 default:throw Error('Minijogo sem conteúdo revisado.');
 }}
