const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const checkboxes = document.querySelectorAll('.checkbox');
const barraForca = document.querySelector('.forca');

// Se não achar a classe .campo-senha, ele cria um alerta ou usa o fundo da página
const campoSenha = document.querySelector('.campo-senha'); 

let tamanhoSenha = 12;
if(numeroSenha) numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

if (botoes.length >= 2) {
    botoes[0].onclick = diminuiTamanho;
    botoes[1].onclick = aumentaTamanho;
}

checkboxes.forEach(checkbox => {
    checkbox.onclick = gerarSenha;
});

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        if(numeroSenha) numeroSenha.textContent = tamanhoSenha;
        gerarSenha();
    }
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        if(numeroSenha) numeroSenha.textContent = tamanhoSenha;
        gerarSenha();
    }
}

function gerarSenha() {
    let caracteresPermitidos = '';
    
    if (checkboxes[0]?.checked) caracteresPermitidos += letrasMaiusculas;
    if (checkboxes[1]?.checked) caracteresPermitidos += letrasMinusculas;
    if (checkboxes[2]?.checked) caracteresPermitidos += numeros;
    if (checkboxes[3]?.checked) caracteresPermitidos += simbolos;

    if (caracteresPermitidos === '') {
        if(campoSenha) campoSenha.textContent = "Selecione uma opção!";
        return;
    }

    let senhaGerada = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaGerada += caracteresPermitidos[indiceAleatorio];
    }

    // Se achou o campo na tela, mostra nele. Se não, mostra no Console (F12)
    if (campoSenha) {
        campoSenha.textContent = senhaGerada;
    } else {
        console.log("Senha gerada (Insira a classe .campo-senha no HTML para ver na tela):", senhaGerada);
    }
    
    atualizarBarraForca();
}

function atualizarBarraForca() {
    if (!barraForca) return;
    
    let opcoesMarcadas = 0;
    checkboxes.forEach(c => { if(c.checked) opcoesMarcadas++; });

    barraForca.classList.remove('fraca', 'media', 'forte');

    if (tamanhoSenha < 8 || opcoesMarcadas <= 1) {
        barraForca.classList.add('fraca');
    } else if (tamanhoSenha >= 8 && tamanhoSenha < 12 && opcoesMarcadas <= 3) {
        barraForca.classList.add('media');
    } else {
        barraForca.classList.add('forte');
    }
}

// Inicializa
gerarSenha();
