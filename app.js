let listaDeNumerosSorteados = [];// Armazena os números já sorteados para evitar repetições
let numeroLimite = 1000;// Limite superior do número secreto
let numeroSecreto = gerarNumeroAleatorio();// Gera um número secreto aleatório
let tentativas = 1;// Contador de tentativas

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);// Seleciona um elemento HTML pela tag
    campo.innerHTML = texto;// Insere o texto no elemento
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});// Fala o texto (API de voz)
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');// Define o título
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000');// Define a instrução inicial
}

exibirMensagemInicial();//Assim que a página carrega, a função é chamada e mostra as mensagens iniciais

function verificarChute() {
    let chute = document.querySelector('input').value;// Obtém o número digitado pelo usuário
    
    if (chute == numeroSecreto) {// Se o número estiver correto:
        exibirTextoNaTela('h1', 'Acertou!');// Exibe a mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';// Plural ou singular
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');// Habilita o botão "Reiniciar"
    } else {
        if (chute > numeroSecreto) {// Se errar:
            exibirTextoNaTela('p', 'O número secreto é menor');// Dica: o número é menor
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');// Dica: o número é maior
        }
        tentativas++;// Aumenta o número de tentativas
        limparCampo();// Limpa o campo de entrada
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);// Gera um número aleatório entre 1 e 1000
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];// Se todos os números já foram sorteados, a lista é reiniciada
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();// Se o número já foi sorteado, gera outro
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);// Adiciona o número na lista de sorteados
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';// Limpa o campo de entrada
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();// Gera um novo número secreto
    limparCampo();// Limpa o campo de entrada
    tentativas = 1;// Reseta o número de tentativas
    exibirMensagemInicial();// Reexibe a mensagem inicial
    document.getElementById('reiniciar').setAttribute('disabled', true)// Desabilita o botão "Reiniciar"
}







