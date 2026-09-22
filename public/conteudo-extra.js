// Novas cartas. Edite esta lista para acrescentar perguntas sem mexer no 3D.
(() => {
 const add=(id,texts,mechanic)=>{const deck=obterBaralhoPorId(id);texts.forEach((text,i)=>deck.cartas.push({id:id+'_extra_'+i,deck_id:id,text,mechanic,target:'ALL',age_rating:'16+'}));};
 add('quem_e_mais_provavel',[
 'Quem da mesa toparia uma viagem sem saber o destino?',
 'Quem conseguiria fazer amizade em uma fila de banco?',
 'Quem esconderia uma surpresa por semanas sem contar para ninguém?',
 'Quem viraria famoso por um vídeo completamente sem querer?',
 'Quem transformaria um encontro simples em uma história inesquecível?',
 'Quem mandaria uma mensagem e se arrependeria dois segundos depois?',
 'Quem seria o melhor parceiro para sobreviver numa ilha?',
 'Quem levaria três malas para uma viagem de fim de semana?',
 'Quem conseguiria convencer a mesa a fazer uma loucura?',
 'Quem demoraria mais para perceber que alguém está flertando?',
 'Quem faria uma festa surpresa e entregaria o segredo antes?',
 'Quem daria o melhor conselho amoroso e ignoraria o próprio conselho?',
 'Quem começaria um negócio depois de uma conversa de madrugada?',
 'Quem cantaria no karaokê mesmo sem conhecer a letra?',
 'Quem seria escolhido para negociar com um extraterrestre?',
 'Quem lembraria de um detalhe que todo mundo esqueceu?',
 'Quem escolheria o restaurante e depois pediria a comida do outro?',
 'Quem voltaria de uma viagem com uma nova paixão?',
 'Quem diria que vai embora cedo e fecharia a festa?',
 'Quem conseguiria guardar o maior segredo da mesa?',
 'Quem inventaria uma desculpa absurda para fugir de um encontro?',
 'Quem se apaixonaria pelo personagem errado de um filme?',
 'Quem passaria vergonha com a maior tranquilidade?',
 'Quem faria uma declaração romântica em público?'
 ],'ALVO');
 add('eu_nunca',[
 'Eu nunca ensaiei uma conversa no banho.',
 'Eu nunca fingi entender uma referência só para não perguntar.',
 'Eu nunca ri numa hora em que precisava ficar sério.',
 'Eu nunca mandei uma mensagem para a pessoa errada.',
 'Eu nunca inventei uma desculpa para ficar em casa.',
 'Eu nunca procurei alguém nas redes sociais antes do primeiro encontro.',
 'Eu nunca apaguei uma mensagem antes de a pessoa ler.',
 'Eu nunca fiquei acordado até tarde esperando uma resposta.',
 'Eu nunca cantei uma letra errada com toda a confiança.',
 'Eu nunca comprei algo só porque estava em promoção.',
 'Eu nunca me perdi seguindo o mapa do celular.',
 'Eu nunca contei uma história e aumentei um pequeno detalhe.',
 'Eu nunca disse que estava chegando sem ter saído de casa.',
 'Eu nunca planejei uma viagem que ainda não aconteceu.',
 'Eu nunca gostei de alguém e disfarcei sendo implicante.',
 'Eu nunca reli uma conversa antiga e senti vergonha.',
 'Eu nunca fiquei amigo de uma pessoa por puro acaso.',
 'Eu nunca fiz uma surpresa que deu completamente errado.',
 'Eu nunca tive um crush por causa da voz da pessoa.',
 'Eu nunca mudei de opinião depois de uma conversa nesta mesa.'
 ],'EU_NUNCA');
 const deck=obterBaralhoPorId('preencha_a_lacuna');[
 ['Meu talento secreto é ________.',['Dar conselhos que eu não sigo','Sumir depois de dizer já volto','Dormir em qualquer lugar','Criar teorias sobre mensagens']],
 ['O primeiro encontro seria perfeito se não fosse ________.',['Uma entrevista de emprego disfarçada','Meu histórico de pesquisa','O ex sentado na mesa ao lado','Um áudio de oito minutos']],
 ['O grupo ficou em silêncio depois que alguém mencionou ________.',['A fatura do cartão','O print que não devia existir','A viagem que nunca sai','Minha fase de influencer']],
 ['Se minha vida fosse um filme, o título seria ________.',['Só mais cinco minutos','Foi sem querer querendo','O boleto contra-ataca','Não era para mandar isso']],
 ['A melhor desculpa para chegar atrasado é ________.',['Meu gato precisava conversar','Perdi uma discussão imaginária','O mapa também estava perdido','Fui salvar a reputação de um amigo']],
 ['O verdadeiro luxo da vida adulta é ________.',['Cancelar um compromisso sem culpa','Uma noite sem notificações','A geladeira abastecida','Não precisar explicar um áudio']],
 ['Nosso grupo sobreviveria ao apocalipse graças a ________.',['Uma planilha organizada','A pessoa que leva lanche para tudo','Uma mentira muito convincente','O carregador portátil']],
 ['Eu trocaria qualquer prêmio por ________.',['Um mês sem boletos','Uma resposta sem joguinhos','Férias com a galera','Um botão para desfazer mensagens']]
 ].forEach(([text,respostasBrancas],i)=>deck.cartas.push({id:'lacuna_extra_'+i,deck_id:deck.id,text,respostasBrancas,mechanic:'LACUNA',target:'ALL',age_rating:'16+'}));
})();
