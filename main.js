// Captura dos elementos do HTML
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

let tamanhoSenha = 12;

// Conjuntos de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Só ativa os eventos se os botões realmente existirem no HTML
if (botoes.length >= 2) {
    botoes[0].onclick = diminuiTamanho;
    botoes[1].onclick = aumentaTamanho;
}

// Ativa o clique para os checkboxes existentes
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Inicializa a tela com o valor padrão
if (numeroSenha) {
    numeroSenha.textContent = tamanhoSenha;
}

// Roda a primeira geração automática
geraSenha();

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    if (numeroSenha) numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    if (numeroSenha) numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function geraSenha() {
    let alfabeto = '';

    // Verifica de forma segura se cada checkbox existe e está marcado
    if (checkbox[0] && checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1] && checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2] && checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3] && checkbox[3].checked) alfabeto += simbolos;

    let senha = '';

    // Só gera a senha se houver pelo menos um grupo de caracteres selecionado
    if (alfabeto.length > 0) {
        for (let i = 0; i < tamanhoSenha; i++) {
            let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
            senha += alfabeto[numeroAleatorio];
        }
    } else {
        senha = "Selecione uma opção";
    }

    if (campoSenha) {
        campoSenha.value = senha;
    }
    
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    if (!forcaSenha) return; // Se a barra não existir no HTML, ignora para não dar erro

    let alfabetoValido = Math.max(1, tamanhoAlfabeto);
    let entropia = tamanhoSenha * Math.log2(alfabetoValido);
    
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (tamanhoAlfabeto === 0) {
        // Se nada estiver marcado, não mostra força nenhuma
        forcaSenha.style.width = "0%";
        if (valorEntropia) valorEntropia.textContent = "Marque pelo menos uma das opções acima.";
        return;
    } else {
        // Reseta o estilo inline para voltar a usar as larguras do CSS (.fraca, .media, .forte)
        forcaSenha.style.width = ""; 
    }

    // Regras de entropia
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    // Calcula o tempo estimado em dias
    let tempoEstimadoDias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));

    if (valorEntropia) {
        valorEntropia.textContent = "Um computador pode levar até " + tempoEstimadoDias + " dias para descobrir essa senha.";
    }
}
