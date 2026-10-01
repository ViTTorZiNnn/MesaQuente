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

// Charada de cada famoso: o leitor vê junto com a categoria, como primeira pista.
const CHARADAS={"Taylor Swift": "Escreve músicas sobre os ex-namorados", "MrBeast": "Faz desafios milionários no YouTube", "Cristiano Ronaldo": "Comemora gol gritando \"Siuuu\"", "Lionel Messi": "Argentino campeão do mundo em 2022", "Neymar": "Camisa 10 do Brasil famoso pelos dribles", "Billie Eilish": "Cantora de voz sussurrada que já pintou o cabelo de verde", "Bad Bunny": "Cantor porto-riquenho de reggaeton", "Super Mario": "Encanador de bigode e boné vermelho", "Pikachu": "Ratinho amarelo que solta choque", "Sonic": "Ouriço azul super rápido", "Steve do Minecraft": "Personagem quadradão que constrói com blocos", "Kratos": "Guerreiro careca que enfrentou os deuses gregos", "Homem-Aranha": "Herói que solta teia pelos pulsos", "Harry Potter": "Bruxo de óculos com cicatriz de raio na testa", "Wandinha": "Garota sombria de tranças da família Addams", "Shrek": "Ogro verde que mora num pântano", "Donald Trump": "Líder de uma nação, cabelo loiro e topete famoso", "Elon Musk": "Dono de carros elétricos, foguetes e de uma rede social", "Beyoncé": "Chamada de \"Queen B\"", "Michael Jackson": "Rei do pop, dono do moonwalk", "Kim Kardashian": "Estrela do reality da família com K", "The Rock": "Ex-lutador careca que virou ator de ação", "Anitta": "Cantora brasileira do \"Envolver\"", "Casimiro": "Streamer que reage a futebol e solta \"CAZÉ\"", "Silvio Santos": "Apresentador do \"Quem quer dinheiro?\"", "Darth Vader": "Vilão de capacete preto que diz \"Eu sou seu pai\"", "Barbie": "Boneca loira mais famosa do mundo", "Mbappé": "Atacante francês muito veloz", "Albert Einstein": "Cientista do cabelo bagunçado e da foto com a língua de fora", "Barack Obama": "Primeiro presidente negro dos Estados Unidos", "Nelson Mandela": "Passou 27 anos preso e depois virou presidente", "Martin Luther King": "Fez o discurso \"Eu tenho um sonho\"", "Frida Kahlo": "Pintora mexicana de sobrancelhas marcantes", "Marie Curie": "Primeira pessoa a ganhar dois prêmios Nobel", "Malala": "Jovem que lutou pelo direito das meninas estudarem", "Steve Jobs": "Fundador da empresa da maçã", "Leonardo da Vinci": "Pintou a Mona Lisa", "Papa Francisco": "Líder religioso argentino", "Gandhi": "Líder pacifista da independência da Índia", "Princesa Diana": "A \"princesa do povo\" britânica", "Stephen Hawking": "Físico que falava por uma voz de computador", "Cleópatra": "Rainha do Egito antigo", "Napoleão": "Imperador francês", "Ayrton Senna": "Piloto brasileiro tricampeão de Fórmula 1", "Carolina Maria de Jesus": "Escritora do livro \"Quarto de Despejo\"", "Zumbi dos Palmares": "Líder do maior quilombo do Brasil", "Santos Dumont": "Brasileiro que voou com o 14-Bis", "Oprah Winfrey": "Apresentadora mais famosa dos Estados Unidos", "Henry Cavill": "Ator que já foi Superman e The Witcher", "Margot Robbie": "Atriz que viveu a Barbie", "Jason Momoa": "Ator que viveu o Aquaman", "Pedro Pascal": "Ator de The Last of Us", "Zendaya": "Atriz de Euphoria e do Homem-Aranha", "Timothée Chalamet": "Ator de Duna", "Ryan Gosling": "Ator que viveu o Ken", "Sydney Sweeney": "Atriz de Euphoria", "Rihanna": "Cantora de \"Umbrella\"", "Shakira": "Cantora colombiana cujos quadris não mentem", "Megan Fox": "Atriz de Transformers", "Brad Pitt": "Ator de Clube da Luta", "Angelina Jolie": "Atriz que viveu a Malévola", "Christian Grey": "Milionário dos 50 Tons", "James Bond": "Agente secreto 007", "Jessica Rabbit": "Ruiva de desenho que \"não é má, só foi desenhada assim\"", "Paolla Oliveira": "Atriz brasileira e rainha de bateria", "Cauã Reymond": "Galã brasileiro de novelas", "Harley Quinn": "Namorada do Coringa", "Romeu e Julieta": "Casal de famílias rivais de Shakespeare", "Jack e Rose": "Casal do navio que afundou", "Shrek e Fiona": "Casal de ogros", "Beyoncé e Jay-Z": "Casal mais poderoso da música", "Mario e Peach": "Encanador e princesa do Reino dos Cogumelos", "Homer e Marge": "Casal amarelo de Springfield", "Barbie e Ken": "Casal de bonecos mais famoso", "Mickey e Minnie": "Casal de ratinhos da Disney", "Ross e Rachel": "\"A gente estava dando um tempo!\"", "Bella e Edward": "Uma humana e um vampiro", "Taylor Swift e Travis Kelce": "Cantora pop e jogador de futebol americano", "Brad Pitt e Angelina Jolie": "Ex-casal mais famoso de Hollywood", "Gomez e Morticia": "Casal sombrio da família Addams", "Simba e Nala": "Casal de leões da savana", "Aladdin e Jasmine": "Ladrão e princesa com tapete voador", "Coringa e Arlequina": "Casal de vilões de Gotham", "Lázaro Ramos e Taís Araújo": "Casal de atores brasileiros", "Carl e Ellie": "Casal da casa voando com balões"};
for(const lista of Object.values(FAMOSOS))for(const f of lista)f.dica=CHARADAS[f.nome]||'';
