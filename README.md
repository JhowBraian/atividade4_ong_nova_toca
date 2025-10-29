# Projeto Nova Toca - ONG Fictícia
## Website de ONG Fictícia para Adoção de Coelhos

![License](https://img.shields.io/badge/license-MIT-blue.svg) 
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

Este projeto é um site SPA (Single Page Application) desenvolvido como parte da atividade prática da faculdade de Análise e Desenvolvimento de Sistemas (ADS).

O projeto simula o website de uma ONG fictícia ("Nova Toca") dedicada ao resgate e adoção de coelhos, com foco em profissionalismo, acessibilidade e boas práticas de desenvolvimento web.

> ### 🔗 **Acesse o site:** [https://jhowbraian.github.io/atividade4_ong_nova_toca/](https://jhowbraian.github.io/atividade4_ong_nova_toca/)

---

## 📋 Tabela de Conteúdos

* [Sobre o Projeto](#-sobre-o-projeto)
* [Funcionalidades Principais](#-funcionalidades-principais)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Como Executar o Projeto Localmente](#-como-executar-o-projeto-localmente)
* [Requisitos da Atividade IV (Acessibilidade e Otimização)](#-requisitos-da-atividade-iv-atendidos)
* [Autor](#-autor)
* [Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Projeto Nova Toca** é um site institucional completo construído como uma **SPA (Single Page Application)**, utilizando HTML5, CSS3 e JavaScript puro. A navegação entre as páginas "Início", "Projetos" e "Cadastro" ocorre de forma dinâmica, sem recarregar a página, através da manipulação do DOM e da History API.

O objetivo foi criar uma experiência de usuário fluida, moderna e, acima de tudo, **acessível** a todos os públicos, seguindo as diretrizes da WCAG 2.1.

## ✨ Funcionalidades Principais

* **🌐 Single Page Application (SPA):** Navegação dinâmica entre as páginas (Início, Projetos, Cadastro) sem recarregamento, utilizando JavaScript puro e a History API.
* **🎨 Tema Escuro (Dark Mode):** Alternador de tema (claro/escuro) com:
    * Salvamento da preferência do usuário no `localStorage`.
    * Detecção automática da preferência do sistema (`prefers-color-scheme`).
* **📱 Design Responsivo (Mobile-First):** Layout 100% adaptável para todos os tamanhos de tela, de celulares a desktops, utilizando CSS Grid e Flexbox.
* **✅ Formulário de Voluntariado Interativo:**
    * **Validação de Dados:** Verificação de campos obrigatórios e validação de consistência de CPF (algoritmo).
    * **Integração com API:** Preenchimento automático de endereço via API (`ViaCEP`) a partir do CEP.
    * **Máscaras de Input:** Formatação automática em tempo real para campos de CPF, CEP e Telefone.
    * **Feedback Acessível:** Mensagens de sucesso ou erro apresentadas de forma acessível para leitores de tela (`role="alert"`).

## 🚀 Tecnologias Utilizadas

* **HTML5 (Semântico):** Estruturação do conteúdo (`<header>`, `<main>`, `<footer>`, `<nav>`, `<template>`).
* **CSS3:**
    * **Variáveis CSS (Custom Properties):** Para gerenciamento de temas (Design System).
    * **Flexbox e Grid Layout:** Para construção de layouts responsivos e complexos.
    * **Media Queries:** Para adaptação a múltiplos dispositivos.
* **JavaScript (ES6+):**
    * Manipulação do DOM.
    * **Fetch API:** Para consumo da API ViaCEP.
    * **History API:** Para gerenciamento do roteamento da SPA.
    * **Web Storage (localStorage):** Para persistência do tema (Dark Mode).

## 🚀 Como Executar o Projeto Localmente

Você precisará do [Git](https://git-scm.com/) e de um editor de código como o [VS Code](https://code.visualstudio.com/) com a extensão **Live Server** para rodar este projeto.

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/jhowbraian/atividade4_ong_nova_toca.git](https://github.com/jhowbraian/atividade4_ong_nova_toca.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd atividade4_ong_nova_toca
    ```

3.  **Inicie o projeto com um servidor local:**
    * Abra a pasta do projeto no VS Code.
    * Clique com o botão direito no arquivo `index.html`.
    * Selecione a opção `Open with Live Server` (Abrir com Live Server).

> **Nota Importante:** O projeto **precisa** ser executado a partir de um servidor local (como o Live Server) e não apenas abrindo o `index.html` diretamente no navegador. Isso é necessário para que o roteamento da SPA (Single Page Application) e a integração com a API do ViaCEP funcionem corretamente.

## 🎯 Requisitos da Atividade IV Atendidos

Esta entrega focou em profissionalizar o projeto, atendendo aos seguintes requisitos:

### 1. Controle de Versão com Git/GitHub

* **GitFlow:** O projeto foi gerenciado seguindo uma estratégia de **GitFlow simplificada**, com branches `main` (produção), `develop` (desenvolvimento) e `feature/*` (novas funcionalidades).
* **Commits Semânticos:** O histórico de commits segue o padrão **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** (ex: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`) para um histórico claro e organizado.
* **Versionamento:** O projeto utiliza **Versionamento Semântico (SemVer)**, com a versão `1.0.0` representando a primeira entrega estável.

### 2. Acessibilidade (WCAG 2.1 Nível AA)

O site foi desenvolvido com foco na conformidade **WCAG 2.1 (Nível AA)**:

* **⌨️ Navegação por Teclado:** Todos os elementos interativos (links, botões, campos de formulário) são 100% acessíveis via teclado (`Tab`), com estados de `:focus` visíveis e claros.
* **📈 Estrutura Semântica:** Uso correto de tags HTML5 para estruturação de conteúdo, permitindo que leitores de tela entendam a hierarquia da página.
* **👓 Alto Contraste:** As cores do Design System (tanto no modo claro quanto no escuro) foram verificadas para garantir um **contraste mínimo de 4.5:1** para texto normal, corrigindo paletas de cores que falhavam nos testes (como botões com fundo laranja).
* **🔊 Leitores de Tela (ARIA):**
    * Implementação de atributos ARIA (`aria-expanded`, `aria-controls`, `aria-label`) para o menu hambúrguer, informando ao usuário se o menu está aberto ou fechado.
    * Uso de `role="alert"` e `aria-live="assertive"` para mensagens de feedback do formulário, garantindo que sejam lidas automaticamente.
    * Gerenciamento de foco na navegação SPA, movendo o foco para o título `<h2>` da nova página carregada.
* **🌙 Tema Escuro Acessível:** O modo escuro foi implementado como um recurso de acessibilidade, respeitando também todas as regras de contraste.

### 3. Otimização para Produção

Para o "deploy" em produção (GitHub Pages):

* **🖼️ Compressão de Imagens:** Todas as imagens `.jpg` e `.png` do projeto foram otimizadas (via [TinyPNG](https://tinypng.com/)) para reduzir o tempo de carregamento.
* **📦 Minificação:** Os arquivos CSS (`styler.css`) e JavaScript (`main.js`) foram minificados para reduzir o tamanho dos arquivos, otimizando o *parse time* do navegador.

---

## 👨‍💻 Autor

Desenvolvido por **Jônatas Braian** como atividade prática para o curso de Análise e Desenvolvimento de Sistemas.

---

## 📄 Licença

Este projeto está sob a licença MIT.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)