// Cartas dos minijogos de festa (inspirados em jogos de cartas de humor; textos originais da Mesa Quente).
// Copie também para public/cartas-festa.js depois de editar.

// AMIGO DA ONÇA: todos apontam ao mesmo tempo; o mais votado leva a carta.
export const ONCA={
 leve:['Quem daqui contaria o seu segredo em menos de 24 horas?','Quem fingiria estar doente para fugir do seu aniversário?','Quem esqueceria o seu nome no meio do discurso do seu casamento?','Quem seria eliminado primeiro de um reality show?','Quem trairia a mesa num jogo de tabuleiro por um ponto?','Quem manda áudio de 5 minutos para dizer "ok"?','Quem sumiria do grupo assim que a conta do bar chegasse?','Quem postaria a sua foto mais feia "sem querer"?','Quem riria primeiro se você caísse na rua?','Quem daria spoiler da série que você está vendo?'],
 profundo:['Quem daqui some quando o grupo mais precisa?','Quem dá o melhor conselho e nunca segue nenhum?','Quem guarda mágoa por mais tempo?','Quem fala que "está tudo bem" sem estar?','Quem seria o primeiro a pedir desculpas depois de uma briga?','Quem mais mudou desde que vocês se conheceram?'],
 adulto:['Quem daqui tem o histórico de busca mais pesado?','Quem ficaria com o ex de alguém desta mesa?','Quem tem o pior gosto para escolher crush?','Quem seria expulso do motel por fazer barulho demais?','Quem mandaria nude no grupo da família por engano?','Quem dá mais trabalho na cama?','Quem já mentiu para a mesa sobre com quem ficou?','Quem tem mais contatinhos salvos com nome falso?','Quem voltaria com o ex depois de duas cervejas?','Quem contaria detalhes da sua noite para todo mundo no dia seguinte?','Quem daqui finge que é santo, mas é o mais safado?'],
 casal:['Quem de nós esqueceria a data do nosso aniversário de namoro?','Quem de nós ganharia uma briga na base do drama?','Quem de nós fuçaria o celular do outro?','Quem de nós dorme primeiro no meio do filme?','Quem de nós rouba o cobertor a noite toda?','Quem de nós ficaria mais tempo sem pedir desculpa?']
};

// DECISÃO DIFÍCIL: uma situação absurda e duas saídas ruins.
export const DECISOES={
 leve:[
  {text:'Você é padrinho no casamento do seu melhor amigo e o microfone é seu.',options:['Conto o maior mico dele','Choro do começo ao fim']},
  {text:'Seu chefe te adiciona no grupo dos amigos por engano.',options:['Saio do grupo na hora','Fico quieto e leio tudo']},
  {text:'Você encontra seu ex no mesmo bloco de carnaval.',options:['Finjo que não vi','Puxo o bloco para dançar perto']},
  {text:'O seu crush curte uma foto sua de 2014.',options:['Curto uma dele de 2013','Finjo que não vi e surto em silêncio']},
  {text:'Você cai na frente de todo mundo na festa.',options:['Levanto e faço uma dancinha','Fico deitado até todos irem embora']},
  {text:'Seu amigo pede opinião sincera sobre a tatuagem nova, que está horrível.',options:['Falo a verdade','Elogio e choro por dentro']}
 ],
 profundo:[
  {text:'Você descobre que seu melhor amigo mentiu para te proteger.',options:['Agradeço','Cobro a verdade sempre']},
  {text:'Uma proposta dos sonhos aparece, mas é em outro país.',options:['Vou sem pensar duas vezes','Fico perto de quem eu amo']},
  {text:'Alguém da sua família te pede um favor que vai te custar caro.',options:['Ajudo mesmo assim','Coloco um limite']},
  {text:'Você pode ler a mente de uma pessoa da mesa por um dia.',options:['Quero saber tudo','Prefiro não saber nada']}
 ],
 adulto:[
  {text:'No meio do sexo, seu celular toca com o nome da sua mãe.',options:['Atendo e finjo normalidade','Ignoro e perco o clima mesmo assim']},
  {text:'Você chama a pessoa pelo nome do ex na hora H.',options:['Finjo que foi outra palavra','Assumo e peço desculpas']},
  {text:'O seu crush manda: "Tô sozinho em casa".',options:['Vou agora, de pijama mesmo','Faço charme e respondo amanhã']},
  {text:'Você descobre que a sua ficante é amiga do seu ex.',options:['Continuo e fico na minha','Pulo fora antes da treta']},
  {text:'Seu vizinho reclama do barulho às 3 da manhã.',options:['Peço desculpas no dia seguinte','Aumento a música e continuo']},
  {text:'Você pode ter a melhor transa da vida, mas nunca poderá contar a ninguém.',options:['Topo e guardo o segredo','Sem história para contar não vale']},
  {text:'Seu date chega e é muito diferente das fotos.',options:['Fico e dou uma chance','Invento uma emergência']},
  {text:'O ex manda "saudade" às 2 da manhã.',options:['Respondo "eu também"','Bloqueio e vou dormir em paz']}
 ],
 casal:[
  {text:'Seu amor quer assistir a série favorita de vocês sem você.',options:['Perdoo','É traição']},
  {text:'Vocês ganham uma noite num hotel, mas no mesmo dia do aniversário da sua mãe.',options:['Vamos para o hotel','Vamos para o aniversário']},
  {text:'Seu amor ronca alto toda noite.',options:['Durmo de tampão','Gravo e mostro no café da manhã']},
  {text:'Vocês brigam por besteira bem antes de sair.',options:['Resolvemos na hora','Resolvemos na cama depois']}
 ]
};

// CAOS NA MESA: regra instantânea. O leitor marca quem ganhou (pontos positivos) ou quem perdeu (negativos).
export const CAOS={
 leve:[
  {text:'O mais alto da mesa ganha 2 pontos. Na dúvida, fiquem de pé lado a lado.',delta:2},
  {text:'Pedra, papel e tesoura: o leitor desafia quem quiser. Quem vencer ganha 2 pontos.',delta:2},
  {text:'Todo mundo toca o nariz agora! O último a tocar perde 1 ponto.',delta:-1},
  {text:'Quem está usando alguma peça preta ganha 1 ponto.',delta:1},
  {text:'A melhor imitação de galinha, escolhida pelo leitor, ganha 2 pontos.',delta:2},
  {text:'Quem nasceu no mesmo semestre do leitor ganha 1 ponto.',delta:1},
  {text:'O leitor faz uma careta. Quem rir primeiro perde 1 ponto.',delta:-1},
  {text:'Mão na cabeça! O último a perceber perde 1 ponto.',delta:-1},
  {text:'Quem tiver o nome mais comprido da mesa ganha 2 pontos.',delta:2}
 ],
 profundo:[
  {text:'Quem fizer um elogio sincero a alguém da mesa agora ganha 1 ponto.',delta:1},
  {text:'Quem já morou em outra cidade ganha 1 ponto.',delta:1},
  {text:'Jogo do sério com o leitor: quem rir primeiro perde 1 ponto.',delta:-1},
  {text:'Quem contar a lembrança mais bonita com alguém da mesa, escolhida pelo leitor, ganha 2 pontos.',delta:2}
 ],
 adulto:[
  {text:'Quem beijou alguém nesta semana ganha 1 ponto.',delta:1},
  {text:'Quem está usando roupa íntima vermelha ganha 2 pontos.',delta:2},
  {text:'Duelo de cantada: o leitor e um desafiante mandam uma cantada. O mais votado pela mesa ganha 2 pontos.',delta:2},
  {text:'Quem mandou mensagem para um ex neste mês perde 1 ponto.',delta:-1},
  {text:'Todo mundo morde o lábio agora! O último perde 1 ponto.',delta:-1},
  {text:'Quem dormiu de conchinha ontem ganha 1 ponto.',delta:1},
  {text:'A melhor rebolada de 5 segundos, escolhida pelo leitor, ganha 2 pontos.',delta:2},
  {text:'Quem tem uma marca ou chupão escondido agora ganha 2 pontos (mostrar é opcional).',delta:2}
 ],
 casal:[
  {text:'Quem disse "eu te amo" primeiro hoje ganha 1 ponto.',delta:1},
  {text:'Quem lembrar a data do primeiro beijo ganha 2 pontos.',delta:2},
  {text:'Quem roubar um beijo primeiro ganha 2 pontos.',delta:2},
  {text:'Jogo do sério olhando nos olhos: quem rir primeiro perde 1 ponto.',delta:-1}
 ]
};

// VIRA-VIRA: quem se encaixa bebe os goles (ou paga uma prenda, se a mesa não bebe).
export const VIRA={
 leve:[{text:'Bebe 1 quem chegou atrasado hoje.',goles:1},{text:'Bebe 2 quem já dormiu no meio de uma festa.',goles:2},{text:'Bebe 1 quem já cantou no karaokê sem saber a letra.',goles:1},{text:'Bebe 2 quem já mandou mensagem para a pessoa errada.',goles:2},{text:'Bebe 1 quem já riu num velório.',goles:1},{text:'Bebe 3 quem já disse "último copo" e não era.',goles:3}],
 profundo:[{text:'Bebe 1 quem já chorou vendo filme este ano.',goles:1},{text:'Bebe 2 quem já pediu desculpas sem ter culpa.',goles:2},{text:'Bebe 1 quem já mudou de opinião sobre alguém da mesa.',goles:1},{text:'Bebe 2 quem está guardando um segredo agora.',goles:2}],
 adulto:[{text:'Bebe 2 quem já transou no primeiro encontro.',goles:2},{text:'Bebe 1 quem tem um contatinho ativo.',goles:1},{text:'Bebe 3 quem já ficou com alguém desta mesa.',goles:3},{text:'Bebe 2 quem já mandou nudes.',goles:2},{text:'Bebe 1 quem já fingiu orgasmo.',goles:1},{text:'Bebe 2 quem já foi pego no flagra.',goles:2},{text:'Bebe 1 quem já transou em lugar público.',goles:1},{text:'Bebe 3 quem já voltou com o ex mais de uma vez.',goles:3}],
 casal:[{text:'Bebe 1 quem tomou a iniciativa no primeiro beijo.',goles:1},{text:'Bebe 2 quem já sentiu ciúme hoje.',goles:2},{text:'Bebe 1 quem pensou no outro de um jeito safado hoje.',goles:1},{text:'Bebe 2 quem já fingiu dormir para não levantar.',goles:2}]
};

// FATO OU FAKE: curiosidades reais e mitos populares. answer: 'FATO' ou 'FAKE'.
export const FATOS={
 leve:[
  {text:'O polvo tem três corações.',answer:'FATO',explain:'Dois bombeiam sangue para as brânquias e um para o resto do corpo.'},
  {text:'Os humanos usam só 10% do cérebro.',answer:'FAKE',explain:'Exames mostram atividade em praticamente todo o cérebro.'},
  {text:'Mel bem armazenado praticamente não estraga.',answer:'FATO',explain:'Já encontraram mel comestível em tumbas egípcias.'},
  {text:'Dá para ver a Muralha da China a olho nu da Lua.',answer:'FAKE',explain:'Ela é longa, mas estreita demais para isso.'},
  {text:'Flamingos são rosados por causa do que comem.',answer:'FATO',explain:'Os pigmentos vêm de algas e camarões da dieta.'},
  {text:'Um raio nunca cai duas vezes no mesmo lugar.',answer:'FAKE',explain:'Prédios altos levam vários raios por ano.'},
  {text:'Morcegos são cegos.',answer:'FAKE',explain:'Eles enxergam; muitos também usam ecolocalização.'},
  {text:'Existem mais árvores na Terra do que estrelas na Via Láctea.',answer:'FATO',explain:'São cerca de 3 trilhões de árvores, contra algumas centenas de bilhões de estrelas.'},
  {text:'Peixinho-dourado tem memória de 3 segundos.',answer:'FAKE',explain:'Eles lembram de coisas por meses.'}
 ],
 profundo:[
  {text:'Cleópatra viveu mais perto da invenção do iPhone do que da construção da Grande Pirâmide.',answer:'FATO',explain:'A pirâmide é de cerca de 2560 a.C.; Cleópatra morreu em 30 a.C.'},
  {text:'Einstein foi reprovado em matemática na escola.',answer:'FAKE',explain:'Ele era ótimo em matemática desde jovem.'},
  {text:'O Brasil foi o último país das Américas a abolir a escravidão.',answer:'FATO',explain:'A Lei Áurea é de 1888.'},
  {text:'Os vikings usavam capacetes com chifres em batalha.',answer:'FAKE',explain:'Essa imagem surgiu em óperas e ilustrações do século XIX.'},
  {text:'A Universidade de Oxford é mais antiga que o Império Asteca.',answer:'FATO',explain:'Oxford já dava aulas por volta de 1096; Tenochtitlán é de 1325.'}
 ],
 adulto:[
  {text:'O clitóris tem milhares de terminações nervosas, mais do que a glande do pênis.',answer:'FATO',explain:'Estudos estimam cerca de 8 a 10 mil.'},
  {text:'O tamanho do pé de um homem indica o tamanho do pênis.',answer:'FAKE',explain:'Pesquisas não encontraram relação entre os dois.'},
  {text:'O clitóris também fica ereto com a excitação.',answer:'FATO',explain:'Ele tem tecido erétil, como o pênis.'},
  {text:'Não dá para engravidar na primeira relação.',answer:'FAKE',explain:'Dá, sim. Qualquer relação sem proteção pode resultar em gravidez.'},
  {text:'Usar duas camisinhas ao mesmo tempo protege mais.',answer:'FAKE',explain:'O atrito entre elas aumenta a chance de romper.'},
  {text:'O orgasmo libera ocitocina, hormônio ligado ao vínculo e ao carinho.',answer:'FATO',explain:'Por isso o clima de chamego depois.'},
  {text:'O "ponto G" tem esse nome por causa do médico Ernst Gräfenberg.',answer:'FATO',explain:'O nome é uma homenagem a ele.'},
  {text:'Ostra é um afrodisíaco comprovado pela ciência.',answer:'FAKE',explain:'Não há prova científica forte; o efeito é mais clima do que química.'},
  {text:'Sexo frequente deixa a vagina "larga".',answer:'FAKE',explain:'É um mito: os músculos e tecidos são elásticos e voltam ao normal.'},
  {text:'É comum ter ereção ou excitação várias vezes durante o sono.',answer:'FATO',explain:'Acontece naturalmente nas fases de sono REM.'}
 ],
 casal:[
  {text:'Ficar de mãos dadas com quem você ama pode diminuir a sensação de dor.',answer:'FATO',explain:'Estudos observaram esse efeito em casais.'},
  {text:'Os opostos sempre se atraem mais do que os parecidos.',answer:'FAKE',explain:'Pesquisas mostram que valores parecidos costumam aproximar mais.'},
  {text:'Abraços longos liberam ocitocina.',answer:'FATO',explain:'O contato físico afetuoso estimula esse hormônio.'},
  {text:'Casais que riem juntos tendem a se sentir mais satisfeitos na relação.',answer:'FATO',explain:'O humor compartilhado aparece com frequência em pesquisas sobre casais felizes.'}
 ]
};

// MÍMICA RELÂMPAGO: o leitor faz mímica; o primeiro a acertar pontua.
export const MIMICA={
 leve:[{secret:'Titanic',cat:'Filme',alias:[]},{secret:'Homem-Aranha',cat:'Personagem',alias:['homem aranha','spiderman']},{secret:'Minecraft',cat:'Jogo',alias:[]},{secret:'Surfar',cat:'Ação',alias:['surf','surfe']},{secret:'Tirar selfie',cat:'Ação',alias:['selfie']},{secret:'Super Mario',cat:'Jogo',alias:['mario']},{secret:'O Rei Leão',cat:'Filme',alias:['rei leao']},{secret:'Harry Potter',cat:'Filme',alias:['harry']},{secret:'Zumbi',cat:'Personagem',alias:[]},{secret:'Karaokê',cat:'Situação',alias:['karaoke']}],
 profundo:[{secret:'Saudade',cat:'Sentimento',alias:[]},{secret:'Despedida no aeroporto',cat:'Situação',alias:['despedida','aeroporto']},{secret:'Formatura',cat:'Situação',alias:[]},{secret:'Primeiro emprego',cat:'Situação',alias:['emprego']},{secret:'Abraço de urso',cat:'Ação',alias:['abraco','abraço']}],
 adulto:[{secret:'Strip-tease',cat:'Ação',alias:['striptease','strip']},{secret:'Beijo de cinema',cat:'Ação',alias:['beijo']},{secret:'Ressaca',cat:'Situação',alias:[]},{secret:'Massagem',cat:'Ação',alias:[]},{secret:'Motel',cat:'Lugar',alias:[]},{secret:'Dança sensual',cat:'Ação',alias:['danca sensual']},{secret:'Flerte no bar',cat:'Situação',alias:['flerte','paquera']},{secret:'50 Tons de Cinza',cat:'Filme',alias:['cinquenta tons','50 tons']},{secret:'Banho a dois',cat:'Situação',alias:['banho']},{secret:'Rapidinha',cat:'Situação',alias:[]}],
 casal:[{secret:'Jantar romântico',cat:'Situação',alias:['jantar']},{secret:'Pedido de casamento',cat:'Situação',alias:['pedido','casamento']},{secret:'Dormir de conchinha',cat:'Ação',alias:['conchinha']},{secret:'Primeiro beijo',cat:'Situação',alias:['beijo']},{secret:'Lua de mel',cat:'Situação',alias:[]},{secret:'DR',cat:'Situação',alias:['discutir a relacao','discussao']}]
};
