# 🐰 Projeto Nova Toca – Entrega III: Interatividade e SPA

### Descrição

Nesta terceira entrega, o site da **ONG Nova Toca** (Resgate de Coelhos) evoluiu de uma interface estática para uma **Aplicação de Página Única (SPA) dinâmica e interativa**, utilizando **JavaScript avançado**.

O objetivo principal foi transformar a navegação em uma **SPA funcional**, implementando um **Sistema de Templates JavaScript** e validação robusta de formulários, simulando uma aplicação web real e atendendo integralmente às exigências da atividade.

* **Estrutura SPA:** O projeto foi consolidado em um único arquivo `index.html`. Os arquivos `projetos.html` e `cadastro.html` foram **removidos**, pois seu conteúdo é carregado via templates JS.

### Acesse o Site

Você pode acessar a versão publicada no GitHub Pages:

https://jhowbraian.github.io/atividade4_ong_nova_toca/

### Objetivos

* Transformar a interface estática em uma aplicação web dinâmica.
* Demonstrar domínio de manipulação do DOM e eventos.
* **Implementar SPA básico e Templates JavaScript.**
* **Validar formulários com verificação de consistência de dados** e aviso ao usuário.
* Organizar código JavaScript de forma modular.

### Tecnologias

* **HTML5** (Com o uso estratégico da tag `<template>`)
* **CSS3** (Grid, Flexbox, Variáveis CSS, Responsividade)
* **JavaScript ES6+** (SPA, Templates, DOM, `fetch`, Validação, Eventos)
* **APIs:** ViaCEP (Para preenchimento automático de endereço)

### Layout, Responsividade e SPA

* **Design System:** Uso de **Variáveis CSS** no `:root` para cores e espaçamento.
* **Layout:** Combinação de **Grid Layout** (estrutura de 12 colunas, grids de impacto e work) e **Flexbox** (componentes).
* **5 Breakpoints:** O layout é otimizado para as seguintes larguras:
    * `1200px` → desktop médio
    * `992px` → tablet horizontal
    * `768px` → tablet vertical (ativa menu hambúrguer)
    * `576px` → celular grande
    * `480px` → celular pequeno
* **SPA Funcional:** Navegação instantânea e fluida entre as seções, com o conteúdo de cada página carregado via `js/main.js` a partir dos templates.

### Funcionalidades Implementadas

* **Sistema de Templates JS:** O `main.js` utiliza os templates definidos no `index.html` para renderizar o conteúdo da seção `<main>`, garantindo uma transição rápida e eficiente.
* **Validação de Formulários (Avançada):**
    * Validação de campos obrigatórios nativa do HTML5.
    * **Verificação de Consistência de CPF:** Implementação de função JavaScript para validação lógica do número de CPF.
    * **Autocompletar Endereço:** Integração com ViaCEP via `fetch` a partir do campo CEP.
    * Mensagens de sucesso e **avisos de erro específicos** exibidas dinamicamente no `#message-container`.
* **Scripts Modularizados:** O código foi separado em:
    * `js/main.js` (Controlador do SPA, ViaCEP, Validação).
    * `js/mask.js` (Máscaras de CPF, Telefone e CEP).

### Conclusão

A entrega III garante que o site do Projeto Nova Toca é **dinâmico, interativo e modular**, mantendo a excelência em responsividade e consistência visual. A transição para o modelo SPA e a validação avançada dos formulários simulam de forma eficaz uma aplicação web real.