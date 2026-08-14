# Mesa Quente — Etapa 1: Esqueleto de Sala

Esta é a **Etapa 1** do projeto: só a parte de criar sala, entrar em sala e
ver os jogadores aparecendo em tempo real. Nenhuma carta ou mecânica de jogo
ainda.

## Arquivos do projeto

```
mesa-quente/
├── index.html          → tela inicial (criar sala / entrar em sala)
├── lobby.html           → tela de lobby (código da sala + lista de jogadores)
├── style.css             → visual (compartilhado pelas duas telas)
├── sala.js               → toda a lógica de comunicação com o Firebase
├── app.js                → lógica da tela inicial
├── lobby.js              → lógica da tela de lobby
├── firebase-config.js    → suas chaves do Firebase (você vai editar este)
└── database.rules.json   → regras de segurança do banco (você vai colar no site do Firebase)
```

Nenhum comando de terminal é necessário para este projeto — é tudo HTML/CSS/JS
puro, sem instalação de nada. Os únicos lugares onde você vai "mexer" são:
sites (Firebase e Vercel) e os arquivos de texto acima.

---

## PARTE 1 — Criar sua conta Firebase gratuita

1. Acesse **https://console.firebase.google.com** e faça login com uma conta
   Google (pode ser a sua conta pessoal do Gmail).
2. Clique em **"Criar projeto"** (ou "Add project").
3. Dê um nome, por exemplo `mesa-quente`. Clique em **Continuar**.
4. Ele vai perguntar sobre o Google Analytics — pode **desativar**
   (não precisamos disso). Clique em **Criar projeto** e aguarde.
5. Quando terminar, clique em **Continuar**.

### Ativar o Realtime Database

1. No menu lateral esquerdo, procure **"Compilação"** (ou "Build") e clique em
   **"Realtime Database"**.
2. Clique em **"Criar banco de dados"**.
3. Escolha a localização (qualquer uma serve, ex: `us-central1`). Clique em
   **Avançar**.
4. Quando perguntar sobre regras de segurança, escolha **"Iniciar no modo de
   teste"** por enquanto — vamos colar nossas próprias regras já ajustadas no
   próximo passo. Clique em **Ativar**.

### Colar as regras de segurança

1. Ainda na tela do Realtime Database, clique na aba **"Regras"** (Rules), no
   topo.
2. Apague o conteúdo que estiver lá e cole o conteúdo do arquivo
   `database.rules.json` (está neste projeto).
3. Clique em **Publicar** (Publish).

> Essas regras liberam leitura/escrita em `/salas/*` para qualquer um — ok
> para este estágio de teste com amigos. Antes de lançar publicamente pra
> desconhecidos, dá pra reforçar isso depois.

### Pegar as chaves de configuração

1. No menu lateral, clique na **engrenagem** (⚙️) ao lado de "Visão geral do
   projeto" → **"Configurações do projeto"**.
2. Role até **"Seus aplicativos"** e clique no ícone **`</>`** (Web).
3. Dê um apelido ao app, ex: `mesa-quente-web`. **Não** marque a opção de
   Firebase Hosting aqui (vamos usar a Vercel, é mais simples). Clique em
   **Registrar app**.
4. Ele vai te mostrar um bloco de código parecido com este:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "mesa-quente-xxxx.firebaseapp.com",
     databaseURL: "https://mesa-quente-xxxx-default-rtdb.firebaseio.com",
     projectId: "mesa-quente-xxxx",
     storageBucket: "mesa-quente-xxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```

5. **Copie esses valores** e cole no arquivo `firebase-config.js` deste
   projeto, substituindo os textos `"COLE_AQUI..."`.
6. Salve o arquivo.

Pronto — o app já está conectado ao seu banco de dados.

---

## PARTE 2 — Publicar num link público e gratuito (Vercel)

Vamos usar a **Vercel** porque ela permite publicar direto pelo navegador,
sem precisar mexer em terminal.

1. Acesse **https://vercel.com** e crie uma conta gratuita (dá pra usar login
   do Google/GitHub).
2. Depois de logado, clique em **"Add New..."** → **"Project"**.
3. A Vercel vai pedir para conectar a um repositório do GitHub. Se você não
   tem um GitHub ainda:
   - Crie uma conta gratuita em **https://github.com**.
   - Crie um novo repositório (botão **"New repository"**), dê um nome como
     `mesa-quente`, deixe como **Público** ou **Privado** (tanto faz), e
     clique em **Create repository**.
   - Na página do repositório recém-criado, clique em **"uploading an
     existing file"** (ou "Add file" → "Upload files").
   - Arraste todos os arquivos deste projeto (menos este README, se quiser)
     para a área de upload: `index.html`, `lobby.html`, `style.css`,
     `sala.js`, `app.js`, `lobby.js`, `firebase-config.js` (já com suas
     chaves preenchidas).
   - Clique em **Commit changes** para salvar.
4. Volte para a Vercel, clique em **"Import Git Repository"**, autorize o
   acesso ao GitHub se pedir, e selecione o repositório `mesa-quente`.
5. Nas configurações de deploy, **não precisa mudar nada** — é um site
   estático simples. Clique em **Deploy**.
6. Em menos de um minuto, a Vercel te dá um link público, algo como:
   `https://mesa-quente-seunome.vercel.app`

Esse é o link que você manda pros seus amigos testarem, cada um no celular
dele. Toda vez que você alterar um arquivo no GitHub, a Vercel republica o
site automaticamente.

---

## Nenhum comando de terminal é necessário

Este projeto foi montado propositalmente sem build tools (sem npm, sem
Node.js) para que você consiga publicar só arrastando arquivos nos sites
acima. Se em alguma etapa futura eu (ou outra IA) sugerir algum comando de
terminal, ele vai te avisar exatamente qual comando copiar e colar — não é
o caso aqui.

---

## Testando

1. Abra o link da Vercel no seu celular → clique **Criar Sala** → digite seu
   nome.
2. Você cai na tela de lobby, vê o código da sala (ex: `AB3X`) e o botão
   **Iniciar Partida**.
3. Peça pra um amigo abrir o mesmo link no celular dele → **Entrar em
   Sala** → digitar o código + o nome dele.
4. Assim que ele confirmar, o nome dele aparece na sua tela **na hora**, sem
   precisar recarregar a página — e vice-versa.
5. Se você fechar o navegador e abrir o link de novo com o mesmo código, seu
   nome não duplica na lista (o app lembra quem você é usando o celular).
6. Só quem criou a sala (o host) vê o botão **Iniciar Partida**. Ao clicar,
   todo mundo na sala vê a mensagem de que a partida começou.

## O que vem nas próximas etapas (ainda não implementado)

A estrutura de dados do banco já reserva um espaço chamado `partida` dentro
de cada sala, pronta para receber, sem precisar reescrever nada da Etapa 1:

- Baralhos ativos
- Carta atual
- Jogador líder da rodada
- Reconexão automática / herança de host se o host cair

Quando você quiser seguir pra Etapa 2, é só pedir.
