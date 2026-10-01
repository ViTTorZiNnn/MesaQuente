// Conteúdo estruturado de dois minijogos. Edite à vontade (copie também para public/cartas-jogos.js).
// TERMÔMETRO: tema (aparece em cima), pista (o que o leitor deve dizer) e as duas pontas da escala.
// QUEM SOU EU: pessoas e personagens famosos no mundo todo (música, cinema, games, internet, política). "alias" são outras formas aceitas no palpite.

export const TERMOMETRO={
 leve:[
  {tema: "Vergonha alheia", pista: "Conte uma situação", min: "Nem ligo", max: "Quero sumir"},
  {tema: "Atraso no rolê", pista: "Diga quanto tempo e a desculpa", min: "Tranquilo", max: "Imperdoável"},
  {tema: "Comida para um primeiro encontro", pista: "Diga uma comida", min: "Escolha perfeita", max: "Desastre total"},
  {tema: "Saudade da infância", pista: "Diga algo da sua infância", min: "Nem lembro", max: "Daria tudo para voltar"},
  {tema: "Coragem", pista: "Diga algo que você faria", min: "Qualquer um faz", max: "Só um louco faz"},
  {tema: "Paciência na fila", pista: "Diga uma situação de fila", min: "Nem percebo", max: "Perco a cabeça"},
  {tema: "Fofoca", pista: "Diga um tipo de fofoca, sem nomes", min: "Nada a ver", max: "Bomba"}
 ],
 profundo:[
  {tema: "Mágoa", pista: "Diga uma atitude de alguém", min: "Esqueço no dia seguinte", max: "Nunca perdoaria"},
  {tema: "Confiança", pista: "Diga um tipo de segredo", min: "Conto para qualquer um", max: "Só para uma pessoa no mundo"},
  {tema: "Medo", pista: "Diga uma situação", min: "Nada", max: "Pânico total"},
  {tema: "Orgulho", pista: "Diga uma conquista", min: "Pequena vitória", max: "Maior orgulho da vida"},
  {tema: "Ciúme entre amigos", pista: "Diga uma situação", min: "Normal", max: "Me afastaria"}
 ],
 adulto:[
  {tema: "Ousadia num primeiro encontro", pista: "Diga uma atitude", min: "Bem comportado", max: "Sem vergonha nenhuma"},
  {tema: "Ciúme do crush", pista: "Diga uma situação", min: "De boa", max: "Surto total"},
  {tema: "Atração", pista: "Diga uma característica de alguém", min: "Me broxa", max: "Me derrete"},
  {tema: "Lugar para transar", pista: "Diga um lugar", min: "Seguro e confortável", max: "Risco total de ser pego"},
  {tema: "Mensagem de flerte", pista: "Diga uma frase que você mandaria", min: "Inocente", max: "Muito safada"},
  {tema: "Red flag num date", pista: "Diga uma atitude", min: "Deixo passar", max: "Vou embora na hora"},
  {tema: "Fantasia", pista: "Diga uma fantasia, pode ser vaga", min: "Bem tradicional", max: "Bem ousada"}
 ],
 casal:[
  {tema: "Saudade de mim", pista: "Diga uma situação longe de mim", min: "Nem senti", max: "Morri de saudade"},
  {tema: "Ciúme de mim", pista: "Diga uma situação", min: "De boa", max: "Fico louco"},
  {tema: "Romance", pista: "Diga um programa a dois", min: "Bem normal", max: "Romântico de filme"},
  {tema: "Vontade de mim agora", pista: "Diga o que você faria", min: "Um abraço", max: "Ninguém sai do quarto"},
  {tema: "Briga de casal", pista: "Diga um motivo de briga", min: "Besteira", max: "DR de horas"}
 ]
};

export const FAMOSOS={
 leve:[
  {nome:"Taylor Swift",cat:"Cantora pop",alias:["taylor"]},
  {nome:"MrBeast",cat:"Youtuber",alias:["mr beast", "jimmy"]},
  {nome:"Cristiano Ronaldo",cat:"Jogador de futebol",alias:["cristiano", "cr7"]},
  {nome:"Lionel Messi",cat:"Jogador de futebol",alias:["messi"]},
  {nome:"Neymar",cat:"Jogador de futebol",alias:["ney"]},
  {nome:"Billie Eilish",cat:"Cantora",alias:["billie"]},
  {nome:"Bad Bunny",cat:"Cantor",alias:["bunny"]},
  {nome:"Super Mario",cat:"Personagem de videogame",alias:["mario"]},
  {nome:"Pikachu",cat:"Personagem de videogame e desenho",alias:["pokemon"]},
  {nome:"Sonic",cat:"Personagem de videogame",alias:[]},
  {nome:"Steve do Minecraft",cat:"Personagem de videogame",alias:["steve", "minecraft"]},
  {nome:"Kratos",cat:"Personagem de videogame (God of War)",alias:["god of war"]},
  {nome:"Homem-Aranha",cat:"Super-herói",alias:["homem aranha", "spider-man", "spiderman", "peter parker"]},
  {nome:"Harry Potter",cat:"Personagem de filme",alias:["harry"]},
  {nome:"Wandinha",cat:"Personagem de série",alias:["wednesday", "wandinha addams"]},
  {nome:"Shrek",cat:"Personagem de animação",alias:[]},
  {nome:"Donald Trump",cat:"Político",alias:["trump"]},
  {nome:"Elon Musk",cat:"Empresário",alias:["musk", "elon"]},
  {nome:"Beyoncé",cat:"Cantora",alias:["beyonce"]},
  {nome:"Michael Jackson",cat:"Cantor",alias:["michael"]},
  {nome:"Kim Kardashian",cat:"Celebridade",alias:["kim", "kardashian"]},
  {nome:"The Rock",cat:"Ator e ex-lutador",alias:["dwayne johnson", "dwayne"]},
  {nome:"Anitta",cat:"Cantora",alias:["larissa"]},
  {nome:"Casimiro",cat:"Streamer",alias:["caze", "cazé"]},
  {nome:"Silvio Santos",cat:"Apresentador",alias:["silvio"]},
  {nome:"Darth Vader",cat:"Vilão de filme",alias:["vader", "anakin"]},
  {nome:"Barbie",cat:"Boneca e personagem de filme",alias:[]},
  {nome:"Mbappé",cat:"Jogador de futebol",alias:["mbappe"]}
 ],
 profundo:[
  {nome:"Albert Einstein",cat:"Cientista",alias:["einstein"]},
  {nome:"Barack Obama",cat:"Ex-presidente dos EUA",alias:["obama"]},
  {nome:"Nelson Mandela",cat:"Líder político",alias:["mandela"]},
  {nome:"Martin Luther King",cat:"Ativista",alias:["luther king", "mlk"]},
  {nome:"Frida Kahlo",cat:"Pintora",alias:["frida"]},
  {nome:"Marie Curie",cat:"Cientista",alias:["curie"]},
  {nome:"Malala",cat:"Ativista",alias:["malala yousafzai"]},
  {nome:"Steve Jobs",cat:"Empresário",alias:["jobs"]},
  {nome:"Leonardo da Vinci",cat:"Artista e inventor",alias:["da vinci", "leonardo"]},
  {nome:"Papa Francisco",cat:"Líder religioso",alias:["francisco", "papa"]},
  {nome:"Gandhi",cat:"Líder pacifista",alias:["mahatma"]},
  {nome:"Princesa Diana",cat:"Princesa",alias:["diana", "lady di"]},
  {nome:"Stephen Hawking",cat:"Cientista",alias:["hawking"]},
  {nome:"Cleópatra",cat:"Rainha do Egito",alias:["cleopatra"]},
  {nome:"Napoleão",cat:"Imperador",alias:["napoleao", "bonaparte"]},
  {nome:"Ayrton Senna",cat:"Piloto de Fórmula 1",alias:["senna"]},
  {nome:"Carolina Maria de Jesus",cat:"Escritora",alias:["carolina"]},
  {nome:"Zumbi dos Palmares",cat:"Líder quilombola",alias:["zumbi"]},
  {nome:"Santos Dumont",cat:"Inventor",alias:["dumont"]},
  {nome:"Oprah Winfrey",cat:"Apresentadora",alias:["oprah"]}
 ],
 adulto:[
  {nome:"Henry Cavill",cat:"Ator (Superman)",alias:["cavill"]},
  {nome:"Margot Robbie",cat:"Atriz",alias:["margot"]},
  {nome:"Jason Momoa",cat:"Ator",alias:["momoa", "aquaman"]},
  {nome:"Pedro Pascal",cat:"Ator",alias:["pascal"]},
  {nome:"Zendaya",cat:"Atriz",alias:[]},
  {nome:"Timothée Chalamet",cat:"Ator",alias:["timothee", "chalamet"]},
  {nome:"Ryan Gosling",cat:"Ator",alias:["gosling"]},
  {nome:"Sydney Sweeney",cat:"Atriz",alias:["sydney"]},
  {nome:"Rihanna",cat:"Cantora",alias:[]},
  {nome:"Shakira",cat:"Cantora",alias:[]},
  {nome:"Bad Bunny",cat:"Cantor",alias:["bunny"]},
  {nome:"Megan Fox",cat:"Atriz",alias:["megan"]},
  {nome:"Brad Pitt",cat:"Ator",alias:["brad"]},
  {nome:"Angelina Jolie",cat:"Atriz",alias:["angelina", "jolie"]},
  {nome:"Christian Grey",cat:"Personagem (50 Tons de Cinza)",alias:["grey", "50 tons"]},
  {nome:"James Bond",cat:"Personagem (007)",alias:["bond", "007"]},
  {nome:"Jessica Rabbit",cat:"Personagem de filme",alias:["jessica"]},
  {nome:"Anitta",cat:"Cantora",alias:["larissa"]},
  {nome:"Paolla Oliveira",cat:"Atriz",alias:["paolla"]},
  {nome:"Cauã Reymond",cat:"Ator",alias:["caua"]},
  {nome:"Harley Quinn",cat:"Personagem de quadrinhos",alias:["arlequina", "harley"]}
 ],
 casal:[
  {nome:"Romeu e Julieta",cat:"Casal da literatura",alias:["romeu", "julieta"]},
  {nome:"Jack e Rose",cat:"Casal de filme (Titanic)",alias:["jack", "rose", "titanic"]},
  {nome:"Shrek e Fiona",cat:"Casal de animação",alias:["shrek", "fiona"]},
  {nome:"Beyoncé e Jay-Z",cat:"Casal da música",alias:["beyonce", "jay-z", "jay z"]},
  {nome:"Mario e Peach",cat:"Casal de videogame",alias:["mario", "peach"]},
  {nome:"Homer e Marge",cat:"Casal de desenho",alias:["homer", "marge", "simpsons"]},
  {nome:"Barbie e Ken",cat:"Casal de filme",alias:["barbie", "ken"]},
  {nome:"Mickey e Minnie",cat:"Casal de desenho",alias:["mickey", "minnie"]},
  {nome:"Ross e Rachel",cat:"Casal de série (Friends)",alias:["ross", "rachel", "friends"]},
  {nome:"Bella e Edward",cat:"Casal de filme (Crepúsculo)",alias:["bella", "edward", "crepusculo"]},
  {nome:"Taylor Swift e Travis Kelce",cat:"Casal famoso",alias:["taylor", "travis"]},
  {nome:"Brad Pitt e Angelina Jolie",cat:"Ex-casal de Hollywood",alias:["brad", "angelina", "brangelina"]},
  {nome:"Gomez e Morticia",cat:"Casal de série (Família Addams)",alias:["gomez", "morticia", "addams"]},
  {nome:"Simba e Nala",cat:"Casal de animação",alias:["simba", "nala"]},
  {nome:"Aladdin e Jasmine",cat:"Casal de animação",alias:["aladdin", "jasmine"]},
  {nome:"Coringa e Arlequina",cat:"Casal de quadrinhos",alias:["coringa", "arlequina", "harley", "joker"]},
  {nome:"Lázaro Ramos e Taís Araújo",cat:"Casal de atores",alias:["lazaro", "tais"]},
  {nome:"Carl e Ellie",cat:"Casal de animação (Up)",alias:["carl", "ellie", "up"]}
 ]
};
