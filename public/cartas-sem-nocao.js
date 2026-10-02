// Minijogo "Sem Noção": cartas pretas (pergunta ou frase com lacuna ____) e cartas brancas (respostas).
// Cada jogador recebe 10 brancas só dele; o juiz da rodada escolhe a melhor sem saber de quem é.
// Regras de escrita: zoar situações e atitudes, nunca grupos de pessoas.
export const PRETAS={
 leve:[
  'O grupo da família entrou em pânico quando alguém mandou ____.',
  'Minha terapeuta disse que o meu problema é ____.',
  'Fui demitido por causa de ____.',
  'O segredo para um casamento feliz é ____.',
  'Qual é o verdadeiro motivo do atraso do ônibus?',
  'Nova série da Netflix: "Eu, ____ e um apartamento de 30m²".',
  'O que tem dentro da bolsa da sua mãe?',
  'Minha avó descobriu ____ e agora não para de falar disso.',
  'No meu velório, eu quero ____.',
  'Por que o seu ex não para de te mandar mensagem?',
  'Coach motivacional: "O sucesso começa com ____."',
  'Plantão urgente: cientistas confirmam que ____ causa ressaca.',
  'O que realmente acontece no churrasco depois das 22h?',
  'A próxima trend do TikTok vai ser ____.',
  'Meu talento escondido é ____.',
  'O que o síndico falou na reunião de condomínio?'
 ],
 profundo:[
  'A maior lição que a vida adulta me ensinou foi ____.',
  'O que eu diria pra mim mesmo de 15 anos?',
  'Daqui a 10 anos, a gente vai rir de ____.',
  'O que me mantém de pé numa segunda-feira?',
  'Minha maior conquista desse ano foi ____.',
  'A terapia mais barata do mundo é ____.',
  'O que separa um amigo de verdade de um conhecido?',
  'Eu seria uma pessoa muito melhor sem ____.'
 ],
 adulto:[
  'O motel tinha de tudo, menos ____.',
  'O que eu sussurraria no ouvido do crush pra estragar tudo?',
  'Minha noite foi incrível até aparecer ____.',
  'Nossa primeira vez foi inesquecível por causa de ____.',
  'Lançamento do sex shop: ____.',
  'O que tem no histórico da aba anônima?',
  'Meu fetiche secreto envolve ____.',
  'Na hora H, eu gritei ____ sem querer.',
  'O que o porteiro viu às 4 da manhã?',
  'Minha lista de contatinhos está organizada por ____.',
  'O que acabou com o clima na hora mais quente?',
  'Meu ex dizia que eu era muito bom em ____.',
  'O nudes foi recusado por causa de ____.',
  'Depois da terceira caipirinha, eu sempre acabo ____.'
 ],
 acido:[
  'O que eu realmente penso quando digo "a gente marca"?',
  'Fui cancelado por causa de ____.',
  'Meu ex tá namorando ____ e eu tô ótimo, juro.',
  'A amizade acabou no dia em que apareceu ____.',
  'O grupo dos amigos sem mim existe por causa de ____.',
  'Indireta do dia: "Tem gente que confunde ____ com personalidade."',
  'O que eu falo de você quando você sai da mesa?',
  'No casamento do meu ex, eu levei ____.',
  'Meu currículo diz "proativo", mas a verdade é ____.',
  'A terapia não resolveu, mas ____ resolveu.',
  'O motivo real de eu ter bloqueado aquela pessoa foi ____.',
  'Minha mãe acha que eu trabalho com ____.',
  'Minha maior red flag é ____.',
  'O que o fofoqueiro do grupo descobriu sobre você?'
 ],
 casal:[
  'O segredo do nosso relacionamento é ____.',
  'A gente quase terminou por causa de ____.',
  'Nosso date perfeito termina com ____.',
  'O que você esconde de mim no celular?',
  'Na DR mais feia, você jogou na minha cara ____.',
  'O que me faz te perdoar na hora?',
  'A coisa mais romântica que você já fez foi ____.',
  'O que eu penso quando você diz "precisamos conversar"?',
  'Na cama, você é ótimo em ____.',
  'Nossa próxima viagem vai ser lembrada por ____.'
 ]
};
// Brancas: o clima leve usa só as leves; os climas 18+ misturam as pesadas com algumas leves.
export const BRANCAS={
 leve:['Um áudio de 7 minutos.','Pagar de rico no Instagram.','A tia do pavê.','Um churrasco sem carvão.','Fingir que entendeu a piada.','Dormir de meia.','O Wi-Fi da casa da vó.','Um boleto vencido.','Chorar vendo propaganda de margarina.','Responder "kkkk" com a cara séria.','A fila do banco às 15h59.','Um crush que só curte e nunca fala.','Um pagodinho triste.','Um carregador de outra marca.','Sair do grupo e voltar no mesmo dia.','Pedir "só uma batata" do prato dos outros.','Uma dancinha do TikTok na hora errada.','A conta do bar dividida por igual.','Esquecer o nome de alguém que sabe o seu.','Uma figurinha de bom dia com flores.','Ligar sem avisar.','Uma ressaca de três dias.','Uma promoção de academia em janeiro.','Uma playlist de sofrência.','Dormir no ônibus e acordar no ponto final.','O cachorro caramelo.','Dar tchau e andar pro mesmo lado.','Um Pix de 1 centavo com mensagem.','Um vizinho com furadeira às 7 da manhã.','Coentro.','A senha que eu acabei de trocar.','Fingir que está trabalhando no home office.','Stories de 40 segundos de show.','Um pão de queijo frio.','A sogra.','Comer miojo cru.','Uma promessa de ano novo.','O primo que "faz uns corre".','Mandar áudio cantando.','O grupo do condomínio.','O famoso "a gente marca".','Uma reunião que podia ser um e-mail.','Pagar a academia e não ir.','O filtro de cachorrinho.','Um brigadeiro de colher às 3 da manhã.','Uma fofoca quentinha.','Ficar online e não responder.','Um ex arrependido.','O tio do churrasco que sabe de tudo.','Um karaokê sem ninguém afinado.','Um signo de fogo.','Uma corrente de WhatsApp.'],
 pesadas:['Uma rapidinha no estacionamento.','Algemas de pelúcia.','O ex às 3 da manhã.','Uma lingerie que não fecha.','Gemer mais alto que o vizinho.','Um nudes com o dedo na frente.','O chuveiro desligando na hora H.','Uma camisinha sabor tutti-frutti.','Chamar pelo nome errado.','A conchinha que termina em torcicolo.','Um date que trouxe a mãe.','Um contatinho em cada bairro.','O motel com espelho no teto.','Um chupão no lugar errado.','Fingir orgasmo e ser aplaudido.','Um vibrador barulhento demais.','Uma DR no meio da transa.','Dar match com o chefe.','A preliminar mais curta da história.','Mandar print pra pessoa errada.','Um strip-tease com câimbra.','Uma chamada de vídeo com a câmera de baixo pra cima.','A cama que range.','Uma pegação no banheiro da balada.','O casal do quarto ao lado.','Ficar com o ex do melhor amigo.','Uma traição descoberta pelo extrato do cartão.','Stalkear até a foto de 2014.','Um fetiche por pés.','Um banho a dois com água gelada.','O "foi bom pra você?".','A camisinha que sumiu.','Um tapa na bunda mal calculado.','Transar com a TV ligada no jornal.','Uma indireta no story.','Um print vazado.','Uma recaída.','Um terapeuta que desistiu de mim.','Um áudio gemendo enviado no grupo da família.','Ser corno com estilo.','Um contatinho salvo como "Pedreiro".','A ficha que só caiu depois do término.','Uma lista de defeitos do ex em ordem alfabética.','O falso "tô sem bateria".','Um beijo com gosto de cigarro e arrependimento.','Uma pessoa que diz "sou sincero" e é só grossa.','Um vácuo de dois dias.','O melhor amigo que dá em cima de todo mundo.']
};
export function brancasPara(tone){return tone==='leve'||tone==='profundo'?BRANCAS.leve:[...BRANCAS.pesadas,...BRANCAS.leve.slice(0,20)];}
