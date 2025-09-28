# jslings 🐙

Olá, amigos!

Bem-vindos ao `jslings`, uma ferramenta interativa de linha de comando que te guia pelos detalhes do JavaScript, um exercício por vez.

![jslings-home](./assets/images/jslings-home.png)

## Começando

Clone o repositório para sua máquina local, instale as dependências e encha seu cérebro de conhecimento!

```bash
git clone https://github.com/XifeiNi/jslings.git
cd jslings
yarn
yarn jslings watch
```

## Completando os Exercícios

Todos os exercícios podem ser encontrados em `jslings/exercises/<conceito>`. Para cada tópico temos múltiplos exercícios para você aprender do básico ao avançado.

Cada exercício vem com alguns testes (`jslings/src/__tests__/` para os curiosos). A ferramenta CLI executa esses testes para garantir que seu código faça o que deveria fazer. Para começar a aprender, simplesmente execute:

```bash
yarn jslings watch
```

A partir daí, você verá nossa interface de linha de comando. Você pode pressionar `c` para testar seu código e atualizar seu progresso conforme avança!

## Obtendo Dicas

Incluímos algumas dicas para cada exercício. Uma vez que você tenha iniciado a CLI do `jslings`, você pode simplesmente pressionar `h` para receber uma dica para o exercício em que está trabalhando. Pressionar `h` múltiplas vezes irá alternar entre as dicas que fornecemos.

![hints](./assets/images/hints.png)

## Guia de Contribuição

Damos as boas-vindas a PRs para melhorar o `jslings` e torná-lo a melhor ferramenta educacional para aprender JavaScript!

### Testes

A base de código atual permite que você adicione testes usando `yarn generate`, isso cria exercícios assim como arquivos de teste. Para adicionar seus testes ao `jslings`, tudo que você precisa fazer é:

1. Criar uma função (com entradas apropriadas) e exportá-la do arquivo js
2. Escrever um teste para a função na pasta `__tests__`
3. Iniciar seu `jslings` personalizado! 🔥

P.S. Se você gostaria de ver seus testes adicionados ao `jslings`, sinta-se à vontade para enviar PRs e rotulá-los como `tests`

### CLI

A CLI é feita usando [`ink`](https://www.npmjs.com/package/ink) e usamos [`jest`](https://www.npmjs.com/package/jest) para todos os nossos testes.

Antes de enviar PRs para CLI e outras coisas não relacionadas a testes, por favor rotule-os como `dev`
