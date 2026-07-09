// ==========================================
// 1. DECLARAÇÕES DE VARIÁVEIS E CONSTANTES
// ==========================================
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// Conjuntos de caracteres (Alfabetos)
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleções de elementos do DOM
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

// ==========================================
// 2. CONFIGURAÇÃO DOS EVENTOS (CLIQUES)
// ==========================================
botoes[0].onclick = diminuiTamanho; // Botão "-"
botoes[1].onclick = aumentaTamanho; // Botão "+"

// Atribui evento de atualização automática para cada checkbox
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Inicializa o gerador ao carregar a página
geraSenha();

// ==========================================
// 3. FUNÇÕES DE CONTROLE DE INTERFACE
// ==========================================
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// ==========================================
// 4. LÓGICA DO GERADOR DE SENHA
// ==========================================
function geraSenha() {
    let alfabeto = '';

    // Montagem dinâmica do alfabeto disponível baseado nos checados
    if (checkbox[0].checked) alfabeto = alfabeto + letrasMaiusculas;
    if (checkbox[1].checked) alfabeto = alfabeto + letrasMinusculas;
    if (checkbox[2].checked) alfabeto = alfabeto + numeros;
    if (checkbox[3].checked) alfabeto = alfabeto + simbolos;

    let senha = '';

    // Caso nenhum checkbox seja marcado, evita erros e retorna vazio
    if (alfabeto.length > 0) {
        for (let i = 0; i < tamanhoSenha; i++) {
            let numeroAleatorio = Math.random() * alfabeto.length;
            numeroAleatorio = Math.floor(numeroAleatorio);
            senha = senha + alfabeto[numeroAleatorio];
        }
    }

    campoSenha.value = senha;
    
    // Dispara a análise matemática da segurança passando o tamanho final do conjunto usado
    classificaSenha(alfabeto.length);
}

// ==========================================
// 5. CÁLCULO DA ENTROPIA E FORMATÇÃO DO TEXTO
// ==========================================
function classificaSenha(tamanhoAlfabeto) {
    // Evita o cálculo de logaritmo com valor zero usando fallback numérico mínimo (1)
    let alfabetoValido = Math.max(1, tamanhoAlfabeto);
    
    // Equação da entropia: Comprimento * log2(Tamanho do Alfabeto)
    let entropia = tamanhoSenha * Math.log2(alfabetoValido);
    
    // Limpeza das classes visuais da barra
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // Regras de negócio baseadas em bits de aleatoriedade
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    // Operação completa envelopada dentro do Math.floor para entrega em inteiros limpos
    let tempoEstimadoDias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));

    // Concatenação contextual apresentando a resposta de forma compreensível ao usuário
    valorEntropia.textContent = "Um computador pode levar até " + tempoEstimadoDias + " dias para descobrir essa senha.";
}
