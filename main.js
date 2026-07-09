// --- Elementos do DOM ---
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const checkboxes = document.querySelectorAll('.checkbox');
const barraForca = document.querySelector('.forca');

// Criar um campo na sua tela para exibir a senha gerada (ou use o que você tiver no HTML)
// Aqui vamos simular que você tem um input ou container para mostrar a senha
// Se você tiver uma classe específica para o campo da senha, mude aqui:
const campoSenha = document.querySelector('.campo-senha') || document.body; 

// --- Variáveis de Controle ---
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// --- Dicionário de Caracteres ---
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// --- Eventos dos Botões ---
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Atualiza a senha sempre que marcar/desmarcar um checkbox
checkboxes.forEach(checkbox => {
    checkbox.onclick = gerarSenha;
});

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        gerarSenha(); // Gera uma nova senha com o novo tamanho
    }
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        gerarSenha(); // Gera uma nova senha com o novo tamanho
    }
}

// --- Função Principal: Gerador de Senha ---
function gerarSenha() {
    let caracteresPermitidos = '';
    
    // Verifica quais checkboxes estão marcados (na ordem do seu HTML)
    if (checkboxes[0].checked) caracteresPermitidos += letrasMaiusculas;
    if (checkboxes[1].checked) caracteresPermitidos += letrasMinusculas;
    if (checkboxes[2].checked) caracteresPermitidos += numeros;
    if (checkboxes[3].checked) caracteresPermitidos += simbolos;

    // Se nenhum checkbox estiver marcado, não gera nada
    if (caracteresPermitidos === '') {
        console.log('Selecione pelo menos uma opção!');
        return;
    }

    let senhaGerada = '';
    // Loop para escolher caracteres aleatórios até dar o tamanho da senha
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaGerada += caracteresPermitidos[indiceAleatorio];
    }

    // Exibe a senha no console ou na tela
    console.log("Senha Gerada:", senhaGerada);
    
    // Altera a barra de força dinamicamente
    atualizarBarraForca();
}

// --- Função para Mudar a Barra de Força ---
function atualizarBarraForca() {
    // Conta quantos checkboxes estão marcados
    let opcoesMarcadas = 0;
    checkboxes.forEach(c => { if(c.checked) opcoesMarcadas++; });

    // Limpa as classes anteriores
    barraForca.classList.remove('fraca', 'media', 'forte');

    // Lógica simples de força baseada no tamanho e opções
    if (tamanhoSenha < 8 || opcoesMarcadas <= 1) {
        barraForca.classList.add('fraca');
    } else if (tamanhoSenha >= 8 && tamanhoSenha < 12 && opcoesMarcadas <= 3) {
        barraForca.classList.add('media');
    } else {
        barraForca.classList.add('forte');
    }
}

// Executa uma vez ao carregar a página para já iniciar com uma senha
gerarSenha();
