// Conteúdo estruturado de dois minijogos. Edite à vontade (copie também para public/cartas-jogos.js).
// TERMÔMETRO: tema (aparece em cima), pista (o que o leitor deve dizer) e as duas pontas da escala.
// QUEM SOU EU: pessoas públicas e personagens. "alias" são outras formas aceitas no palpite.

export const TERMOMETRO={
 leve:[
  {tema:'Comida de boteco',pista:'Diga uma comida',min:'Nem de graça',max:'Pediria toda semana'},
  {tema:'Programa de sábado',pista:'Diga um programa',min:'Tédio total',max:'Rolê perfeito'},
  {tema:'Mico em público',pista:'Conte uma situação curta',min:'Ninguém notou',max:'Mudaria de cidade'},
  {tema:'Música para o karaokê',pista:'Diga uma música ou cantor',min:'Esvazia a sala',max:'Todo mundo canta junto'},
  {tema:'Desculpa para faltar ao rolê',pista:'Invente uma desculpa',min:'Ninguém acredita',max:'Convence até a sua mãe'},
  {tema:'Fama',pista:'Diga uma pessoa famosa',min:'Ninguém conhece',max:'Até a avó conhece'},
  {tema:'Novela das nove',pista:'Diga um acontecimento de novela',min:'Bem comum',max:'Absurdo total'}
 ],
 profundo:[
  {tema:'Decisão de vida',pista:'Diga uma decisão',min:'Fácil de desfazer',max:'Muda tudo'},
  {tema:'Prova de confiança',pista:'Diga uma atitude',min:'Gesto pequeno',max:'Confiaria a vida'},
  {tema:'Pedido de desculpas',pista:'Diga uma frase ou atitude',min:'Desculpa vazia',max:'Reparou de verdade'},
  {tema:'Saudade',pista:'Diga algo de que se sente falta',min:'Nem lembro',max:'Dói no peito'},
  {tema:'Coragem',pista:'Diga uma atitude',min:'Qualquer um faria',max:'Coisa de herói'}
 ],
 adulto:[
  {tema:'Lugar para transar',pista:'Diga um lugar',min:'Seguro e confortável',max:'Risco total de ser pego'},
  {tema:'Fantasia',pista:'Descreva uma fantasia em poucas palavras',min:'Bem tradicional',max:'Só acontece em filme'},
  {tema:'Mensagem safada',pista:'Diga a primeira frase da mensagem',min:'Quase inocente',max:'Só dá para ler sozinho'},
  {tema:'Preliminar',pista:'Descreva um toque ou atitude',min:'Esquenta devagar',max:'Perde o controle'},
  {tema:'Look para um encontro quente',pista:'Descreva o visual',min:'Discreto',max:'Nem precisava de roupa'},
  {tema:'Barulho na cama',pista:'Descreva uma cena',min:'Silêncio de biblioteca',max:'O vizinho aplaude'},
  {tema:'Ousadia em público',pista:'Descreva uma atitude',min:'Mão dada',max:'Quase preso'},
  {tema:'Famoso mais desejável',pista:'Diga uma pessoa famosa',min:'Passo a vez',max:'Largaria tudo'}
 ],
 casal:[
  {tema:'Provocação em público',pista:'Diga algo que eu poderia fazer',min:'Ninguém percebe',max:'A gente vai embora na hora'},
  {tema:'Nossa noite ideal',pista:'Diga um detalhe da noite',min:'Romântica e calma',max:'Selvagem'},
  {tema:'Mensagem minha no meio do dia',pista:'Diga a frase',min:'Fofinha',max:'Você sai da reunião'},
  {tema:'Lugar para a gente estrear',pista:'Diga um lugar',min:'Nossa cama',max:'Adrenalina pura'},
  {tema:'Desejo por mim agora',pista:'Diga o que você faria',min:'Um abraço',max:'Ninguém sai do quarto'}
 ]
};

export const FAMOSOS={
 leve:[
  {nome:'Anitta',cat:'Cantora',emoji:'🎤',alias:['larissa']},
  {nome:'Neymar',cat:'Jogador de futebol',emoji:'⚽',alias:['ney']},
  {nome:'Xuxa',cat:'Apresentadora',emoji:'📺',alias:['xuxa meneghel']},
  {nome:'Ivete Sangalo',cat:'Cantora',emoji:'🎤',alias:['ivete']},
  {nome:'Pelé',cat:'Jogador de futebol',emoji:'⚽',alias:['pele','edson']},
  {nome:'Silvio Santos',cat:'Apresentador',emoji:'📺',alias:['silvio']},
  {nome:'Ludmilla',cat:'Cantora',emoji:'🎤',alias:['lud']},
  {nome:'Pabllo Vittar',cat:'Cantora e drag queen',emoji:'💃',alias:['pabllo']},
  {nome:'Rebeca Andrade',cat:'Ginasta olímpica',emoji:'🤸',alias:['rebeca']},
  {nome:'Marta',cat:'Jogadora de futebol',emoji:'⚽',alias:['marta vieira']},
  {nome:'Lázaro Ramos',cat:'Ator',emoji:'🎬',alias:['lazaro']},
  {nome:'Taís Araújo',cat:'Atriz',emoji:'🎬',alias:['tais']},
  {nome:'Whindersson Nunes',cat:'Humorista',emoji:'😂',alias:['whindersson']},
  {nome:'Gil do Vigor',cat:'Ex-BBB e economista',emoji:'📱',alias:['gil']},
  {nome:'Paulo Gustavo',cat:'Humorista e ator',emoji:'😂',alias:['paulo gustavo']},
  {nome:'Gilberto Gil',cat:'Cantor e compositor',emoji:'🎸',alias:['gil']},
  {nome:'Iza',cat:'Cantora',emoji:'🎤',alias:[]},
  {nome:'Ana Maria Braga',cat:'Apresentadora',emoji:'🍳',alias:['ana maria']},
  {nome:'Casimiro',cat:'Streamer',emoji:'🎮',alias:['cazé','caze']},
  {nome:'Ronaldinho Gaúcho',cat:'Jogador de futebol',emoji:'⚽',alias:['ronaldinho']}
 ],
 profundo:[
  {nome:'Machado de Assis',cat:'Escritor',emoji:'✍️',alias:['machado']},
  {nome:'Carolina Maria de Jesus',cat:'Escritora',emoji:'📓',alias:['carolina']},
  {nome:'Santos Dumont',cat:'Inventor',emoji:'✈️',alias:['dumont']},
  {nome:'Zumbi dos Palmares',cat:'Líder quilombola',emoji:'✊',alias:['zumbi']},
  {nome:'Dandara dos Palmares',cat:'Guerreira quilombola',emoji:'✊',alias:['dandara']},
  {nome:'Tarsila do Amaral',cat:'Pintora',emoji:'🎨',alias:['tarsila']},
  {nome:'Paulo Freire',cat:'Educador',emoji:'📚',alias:['freire']},
  {nome:'Chico Mendes',cat:'Ambientalista',emoji:'🌳',alias:['chico']},
  {nome:'Ayrton Senna',cat:'Piloto de Fórmula 1',emoji:'🏎️',alias:['senna']},
  {nome:'Elis Regina',cat:'Cantora',emoji:'🎤',alias:['elis']},
  {nome:'Tom Jobim',cat:'Compositor',emoji:'🎹',alias:['jobim']},
  {nome:'Clarice Lispector',cat:'Escritora',emoji:'✍️',alias:['clarice']},
  {nome:'Oscar Niemeyer',cat:'Arquiteto',emoji:'🏛️',alias:['niemeyer']},
  {nome:'Glória Maria',cat:'Jornalista',emoji:'🎙️',alias:['gloria']},
  {nome:'Ailton Krenak',cat:'Escritor e líder indígena',emoji:'🌿',alias:['krenak']},
  {nome:'Cartola',cat:'Sambista',emoji:'🎶',alias:[]}
 ],
 adulto:[
  {nome:'Paolla Oliveira',cat:'Atriz',emoji:'🎬',alias:['paolla']},
  {nome:'Cauã Reymond',cat:'Ator',emoji:'🎬',alias:['caua']},
  {nome:'Juliana Paes',cat:'Atriz',emoji:'🎬',alias:['juliana']},
  {nome:'Rodrigo Hilbert',cat:'Apresentador e "homem perfeito"',emoji:'🪓',alias:['hilbert']},
  {nome:'Bruna Marquezine',cat:'Atriz',emoji:'🎬',alias:['marquezine','bruna']},
  {nome:'Reynaldo Gianecchini',cat:'Ator',emoji:'🎬',alias:['gianecchini','giane']},
  {nome:'Sabrina Sato',cat:'Apresentadora',emoji:'📺',alias:['sabrina']},
  {nome:'Rodrigo Santoro',cat:'Ator',emoji:'🎬',alias:['santoro']},
  {nome:'Anitta',cat:'Cantora',emoji:'🎤',alias:['larissa']},
  {nome:'Ludmilla',cat:'Cantora',emoji:'🎤',alias:['lud']},
  {nome:'Rihanna',cat:'Cantora',emoji:'🎤',alias:[]},
  {nome:'Shakira',cat:'Cantora',emoji:'💃',alias:[]},
  {nome:'Jason Momoa',cat:'Ator',emoji:'🔱',alias:['momoa','aquaman']},
  {nome:'Pedro Pascal',cat:'Ator',emoji:'🎬',alias:['pascal']},
  {nome:'Zendaya',cat:'Atriz',emoji:'🎬',alias:[]},
  {nome:'Bad Bunny',cat:'Cantor',emoji:'🐰',alias:['bunny']}
 ],
 casal:[
  {nome:'Romeu e Julieta',cat:'Casal da literatura',emoji:'📖',alias:['romeu','julieta']},
  {nome:'Jack e Rose',cat:'Casal de filme (Titanic)',emoji:'🚢',alias:['jack','rose','titanic']},
  {nome:'Shrek e Fiona',cat:'Casal de animação',emoji:'🧅',alias:['shrek','fiona']},
  {nome:'Lázaro Ramos e Taís Araújo',cat:'Casal de atores',emoji:'🎬',alias:['lazaro','tais']},
  {nome:'Beyoncé e Jay-Z',cat:'Casal da música',emoji:'🎤',alias:['beyonce','jay-z','jay z']},
  {nome:'Simba e Nala',cat:'Casal de animação',emoji:'🦁',alias:['simba','nala']},
  {nome:'Mickey e Minnie',cat:'Casal de desenho',emoji:'🐭',alias:['mickey','minnie']},
  {nome:'Ross e Rachel',cat:'Casal de série (Friends)',emoji:'☕',alias:['ross','rachel','friends']},
  {nome:'Carl e Ellie',cat:'Casal de animação (Up)',emoji:'🎈',alias:['carl','ellie','up']},
  {nome:'Homer e Marge',cat:'Casal de desenho',emoji:'🍩',alias:['homer','marge','simpsons']},
  {nome:'Barbie e Ken',cat:'Casal de brinquedo',emoji:'💖',alias:['barbie','ken']},
  {nome:'Bella e Edward',cat:'Casal de filme (Crepúsculo)',emoji:'🧛',alias:['bella','edward','crepusculo']}
 ]
};
