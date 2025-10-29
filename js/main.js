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

    // --- 1. Lógica do Menu Hambúrguer (Modular) ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('is-active');
        });
        // Fechar o menu ao clicar em um link
        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('is-active');
            });
        });
    }

    // --- 2. Sistema de Templates JavaScript (SPA Básico) ---
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
        const page = e.state ? e.state.page : 'home';
        // A função renderPage precisa ser chamada, mas sem atualizar o history
        // Uma implementação mais avançada faria isso, mas para o requisito básico, o renderPage simples é suficiente.
        // Como o popstate já define o URL, vamos apenas forçar o reload do conteúdo.
        // Para simplificar no requisito de SPA Básico:
        const hash = window.location.hash.substring(1) || 'home';
        renderPage(hash); // Re-renderiza a página correta
    });

    // Inicia a página correta baseada no hash ou na home
    const initialHash = window.location.hash.substring(1) || 'home';
    renderPage(initialHash);


    // --- 3. Script de Validação de Formulário e ViaCEP (Modular) ---
    
    // Esta função será chamada após o DOM ser manipulado pelo SPA
    function initializeFormListeners() {
        // Precisa selecionar novamente pois o formulário foi recarregado como template
        const form = document.getElementById('volunteer-form');
        const messageContainer = document.getElementById('message-container');
        const cepInput = document.getElementById('cep');
        const cpfInput = document.getElementById('cpf');
        
        if (!form || !messageContainer) return;

        // 3.1. Auto-preenchimento do CEP (ViaCEP)
        // O código da máscara de CEP está no mask.js e deve ser recarregado/re-bindado
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

        // 3.2. Validação de Formulário (com aviso de preenchimento incorreto)
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