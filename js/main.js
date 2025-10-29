// A função de validação de CPF (Requisito: verificação de consistência de dados)
// Uma validação mais robusta do que apenas a máscara
function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// ----------------------------------------------------
// Módulo de Máscaras (Movido de mask.js para cá)
// ----------------------------------------------------
// Esta função será chamada DEPOIS que o template do formulário for carregado
function initializeInputMasks() {
    // Seleciona todos os inputs de CPF (dentro do template carregado)
    const cpfInputs = document.querySelectorAll('input[name="cpf"]');
    cpfInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, "");
            if (valor.length > 11) valor = valor.slice(0, 11);
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            this.value = valor;
        });
    });

    // Seleciona todos os inputs de telefone
    const telefoneInputs = document.querySelectorAll('input[name="telefone"]');
    telefoneInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, "");
            if (valor.length > 11) valor = valor.slice(0, 11);
            valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
            if (valor.length > 10) {
                valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
            } else {
                valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
            }
            this.value = valor;
        });
    });

    // Seleciona todos os inputs de CEP
    const cepInputs = document.querySelectorAll('input[name="cep"]');
    cepInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, "");
            if (valor.length > 8) valor = valor.slice(0, 8);
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
            this.value = valor;
        });
    });
}


// ----------------------------------------------------
// Módulo Principal do SPA e Interatividade
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const appContent = document.getElementById('app-content');
    const links = document.querySelectorAll('a[data-page]');
    const initialContent = appContent.innerHTML; // Salva o conteúdo inicial (home)

    // Dicionário de templates (Chave: data-page, Valor: ID do template)
    const templates = {
        'home': { 
            id: null, // Conteúdo é o initialContent
            title: 'Projeto Nova Toca - Início' 
        },
        'projetos': { 
            id: 'projetos-template', 
            title: 'Projetos - Projeto Nova Toca' 
        },
        'cadastro': { 
            id: 'cadastro-template', 
            title: 'Formulário de Voluntariado - Projeto Nova Toca' 
        }
    };

    // --- 1. Lógica do Modo Escuro (NOVO) ---
    const themeToggle = document.getElementById('theme-toggle');
    const storageKey = 'theme-preference';

    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem(storageKey);
        if (storedTheme) {
            return storedTheme;
        }
        // Verifica a preferência do OS
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        localStorage.setItem(storageKey, theme);
        
        // Atualiza o botão para acessibilidade
        if (theme === 'dark') {
            themeToggle.setAttribute('aria-label', 'Ativar modo claro');
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
            themeToggle.textContent = '🌙';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Verifica qual é o tema ATUAL e inverte
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    // Define o tema inicial no carregamento da página
    setTheme(getInitialTheme());


    // --- 2. Lógica do Menu Hambúrguer (ATUALIZADA) ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            // Verifica se está ativo e atualiza ARIA
            const isActive = nav.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
            
            if (isActive) {
                menuToggle.setAttribute('aria-label', 'Fechar menu');
            } else {
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });

        // Fechar o menu ao clicar em um link
        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('is-active');
                // Reseta o botão
                menuToggle.setAttribute('aria-expanded', false);
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            });
        });
    }

    // --- 3. Sistema de Templates JavaScript (SPA Básico - ATUALIZADO) ---
    function renderPage(pageName) {
        const pageData = templates[pageName];

        if (pageName === 'home') {
            appContent.innerHTML = initialContent;
        } else if (pageData && pageData.id) {
            const template = document.getElementById(pageData.id);
            if (template) {
                // Cria uma cópia do conteúdo do template
                const clone = template.content.cloneNode(true);
                appContent.innerHTML = '';
                appContent.appendChild(clone);
            }
        }
        
        // Atualiza o título da página
        document.title = pageData ? pageData.title : 'Projeto Nova Toca';
        
        // Adiciona a página ao histórico de navegação
        history.pushState({ page: pageName }, pageData.title, `#${pageName}`);

        // **MELHORIA DE ACESSIBILIDADE (NOVO)**
        // Move o foco para o título da nova página carregada
        const newHeading = appContent.querySelector('h2');
        if (newHeading) {
            newHeading.focus();
        }

        // O SPA recém-carregado pode ter formulários, então religamos os listeners
        if (pageName === 'cadastro') {
             // Damos um pequeno delay para garantir que o DOM foi atualizado
            setTimeout(initializeFormListeners, 0); 
        }
    }

    // Listener para os links de navegação
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const page = link.getAttribute('data-page');
            if (page) {
                e.preventDefault(); // Impede a navegação padrão
                renderPage(page);
                window.scrollTo(0, 0); // Rola para o topo
            }
        });
    });

    // Lógica para o botão de voltar do navegador (SPA)
    window.addEventListener('popstate', (e) => {
        const hash = window.location.hash.substring(1) || 'home';
        renderPage(hash); // Re-renderiza a página correta
    });

    // Inicia a página correta baseada no hash ou na home
    const initialHash = window.location.hash.substring(1) || 'home';
    renderPage(initialHash);


    // --- 4. Script de Validação de Formulário e ViaCEP (ATUALIZADO) ---
    
    // Esta função será chamada após o DOM ser manipulado pelo SPA
    function initializeFormListeners() {
        // Precisa selecionar novamente pois o formulário foi recarregado como template
        const form = document.getElementById('volunteer-form');
        const messageContainer = document.getElementById('message-container');
        const cepInput = document.getElementById('cep');
        const cpfInput = document.getElementById('cpf');
        
        if (!form || !messageContainer) return;

        // **CHAMADA DAS MÁSCARAS (NOVO)**
        // Aplica as máscaras de CPF, Tel e CEP aos inputs recém-carregados
        initializeInputMasks();

        // 4.1. Auto-preenchimento do CEP (ViaCEP)
        if (cepInput) {
            // Adiciona o listener para o fetch do ViaCEP
            cepInput.addEventListener('keyup', (e) => {
                const cep = e.target.value.replace(/\D/g, ''); // Remove máscara
                if (cep.length === 8) {
                    fetch(`https://viacep.com.br/ws/${cep}/json/`)
                        .then(response => response.json())
                        .then(data => {
                            if (!data.erro) {
                                document.getElementById('logradouro').value = data.logradouro;
                                document.getElementById('bairro').value = data.bairro;
                                document.getElementById('cidade').value = data.localidade;
                                document.getElementById('uf').value = data.uf;
                                document.getElementById('numero').focus(); // Foca no número
                            } else {
                                console.log('CEP não encontrado.');
                                // Limpa campos se o CEP for inválido
                                document.getElementById('logradouro').value = "";
                                document.getElementById('bairro').value = "";
                                document.getElementById('cidade').value = "";
                                document.getElementById('uf').value = "";
                            }
                        })
                        .catch(error => console.error('Erro ao buscar CEP:', error));
                }
            });
        }

        // 4.2. Validação de Formulário (com aviso de preenchimento incorreto)
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            messageContainer.className = '';
            messageContainer.textContent = '';
            
            // Validação de campos obrigatórios (HTML5 nativo)
            if (!form.checkValidity()) {
                messageContainer.className = 'error';
                messageContainer.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                form.reportValidity(); // Mostra as mensagens de erro nativas
                const firstInvalidField = form.querySelector(':invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    messageContainer.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            // Validação customizada de CPF (verificação de consistência de dados)
            if (cpfInput && !isValidCPF(cpfInput.value)) {
                messageContainer.className = 'error';
                messageContainer.textContent = 'O CPF informado é inválido. Por favor, verifique.';
                cpfInput.focus();
                messageContainer.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            // Validação de Rádio Button (Disponibilidade - Período)
             const periodoRadios = form.querySelectorAll('input[name="periodo"]');
             const periodoSelected = Array.from(periodoRadios).some(radio => radio.checked);
             if (!periodoSelected) {
                messageContainer.className = 'error';
                messageContainer.textContent = 'Por favor, selecione pelo menos um Período de Disponibilidade.';
                periodoRadios[0].focus();
                messageContainer.scrollIntoView({ behavior: 'smooth' });
                return;
             }

            // Sucesso
            messageContainer.className = 'success';
            messageContainer.textContent = 'Formulário enviado com sucesso! Entraremos em contato em breve.';
            form.reset();
            messageContainer.scrollIntoView({ behavior: 'smooth' });
        });
        
    }
});