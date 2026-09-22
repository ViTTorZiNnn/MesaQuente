# Ativar Mesa Quente 3D com cartas protegidas

O visual foi refeito com arcos iluminados, partículas, materiais de mesa e iluminação próprios. `mesa.png` e `parede.png` não são usados. `public/cenario.html` é uma prévia interativa sem conexão ao Firebase.

Esta versão inclui o cenário 3D, 13 minijogos, lobby, convites por código e um servidor que valida as ações. Não basta publicar os arquivos no GitHub Pages: esta versão usa a API Node da Vercel.

## O que já foi preparado

- `public/`: site, artes e cenário 3D.
- `api/game.js`: API autenticada; o UID vem do token verificado, nunca do corpo do pedido.
- `server/`: regras e seleção das cartas, estado completo somente no servidor.
- `server/privacy.js`: resposta permitida para cada jogador. Texto privado, espião, número, mentira e dicas ficam protegidos conforme a fase.
- `database.rules.json`: bloqueia leitura/escrita direta por aplicativos clientes. O servidor usa Firebase Admin.
- `vercel.json`: publica `public/` e a API; mantém o código e credenciais de servidor fora dos arquivos estáticos.
- Novas salas ficam em `mqSecureRooms`, separadas das antigas. As salas antigas não migram.

## 1. Firebase: login anônimo

Abra o projeto **mesaquente-d7ec5** em https://console.firebase.google.com/.
Em Authentication, abra os métodos de login e habilite **Anônimo**. Os amigos não precisam informar e-mail nem senha. Em configurações de Authentication, confira os domínios autorizados e inclua o domínio da sua publicação quando necessário.

## 2. Vercel: credencial somente no servidor

No Firebase, Configurações do projeto → Contas de serviço → Firebase Admin SDK → Gerar nova chave privada. Guarde o JSON com segurança.

Na Vercel, abra o projeto conectado a este repositório → Settings → Environment Variables. Configure, nos ambientes em que for testar/publicar:

| Nome | Valor |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Conteúdo completo do JSON da conta de serviço |
| `FIREBASE_DATABASE_URL` | `https://mesaquente-d7ec5-default-rtdb.firebaseio.com` |

**Não envie a chave pelo chat, não faça commit dela e não coloque em `public/` ou `firebase-config.js`.** A configuração pública do aplicativo já está em `public/firebase-config.js`; ela é diferente da credencial administrativa.

Confira: Framework Preset **Other**, Root Directory na raiz do repositório, Output Directory **public**, sem Build Command customizado. A instalação usa `npm install` e o arquivo de lock. A API exige hospedagem com Node, portanto abrir index.html localmente ou usar GitHub Pages não executa esta versão.

## 3. Regras e troca de versão

Antes de disponibilizar novas salas, em Realtime Database → Regras publique o conteúdo de `database.rules.json`. Isso bloqueia clientes antigos imediatamente; faça a troca quando ninguém estiver em uma partida antiga. Se esse Firebase atender outros aplicativos, revise as regras desses aplicativos antes de substituir a raiz inteira.

Depois de configurar os ambientes, faça o deploy da branch para testar, ou integre a alteração em `main` para publicar pelo fluxo da Vercel. Nenhuma regra do seu Firebase nem variável da Vercel foi alterada automaticamente por este PR.

## 4. Conferir em dois aparelhos

1. Abra o novo endereço no celular e no computador. Crie sala em um e entre pelo código no outro.
2. Confirme os avatares, inicie e compre a carta. O outro aparelho recebe somente o verso até a revelação.
3. Teste Espião com três jogadores, Termômetro e Apenas uma dica. Verifique também respostas, troca de turno e fim/reinício.
4. Confira os dados da resposta `/api/game` no navegador: segredos não autorizados devem estar ausentes. Tentar acessar o Realtime Database diretamente deve retornar permissão negada.
5. Confira o cenário em aparelho com WebGL; existe modo leve de fallback.

## Validação realizada e limites

`npm test` passou: testes dos 13 modos, proibição de compra por outro jogador e respostas filtradas, incluindo segredos e dicas. A configuração da Vercel, tokens reais de Authentication e as regras implantadas ainda exigem teste após os passos acima. A inspeção visual automatizada desta revisão foi bloqueada pelo navegador do ambiente. O cenário 3D deve ser conferido em aparelho com WebGL. Esta versão protegida não foi testada ponta a ponta contra seu ambiente real, pois a credencial de servidor e o acesso aos painéis não foram fornecidos.

A sincronização consulta a API a cada 2 segundos. Uma desconexão é reconhecida após 90 segundos sem atividade, e a próxima consulta transfere o anfitrião. Salas expiram após 24 horas; os registros expirados e contadores de acesso precisam de limpeza periódica se houver uso contínuo. Há limite básico por usuário, mas autenticação anônima não substitui proteção contra abuso em um lançamento amplo. Verifique os limites e custos da sua hospedagem/Firebase antes de abrir para grande público.

As artes e o banco de perguntas são públicos. O segredo protegido é a carta selecionada e os papéis/respostas privados da rodada, não a lista de todas as perguntas possíveis.

Documentação: https://firebase.google.com/docs/auth/web/anonymous-auth ; https://firebase.google.com/docs/auth/admin/verify-id-tokens ; https://firebase.google.com/docs/admin/setup ; https://vercel.com/docs/functions/runtimes/node-js .
