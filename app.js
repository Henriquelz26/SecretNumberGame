let raffledNumberList = [];
let maxQttNum = 10;
let secretNumber = randomNumber();
let attempt = 1;

function getElementByHtml(tag, text) {
    let tittle = document.querySelector(tag);
    tittle.innerHTML = text;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function showStartMsg() {
    getElementByHtml('h1', 'Jogo  do Número Secreto');
    getElementByHtml('p', 'Escolha um número entre 1 e 3');
}

showStartMsg();

function verifyKick() {
    let kick = document.querySelector('input').value;

    if (kick == secretNumber) {
        getElementByHtml('h1', 'Correto');
        let wrdTry = attempt > 1 ? 'tentativas' : 'tentativa';
        let msgTry = `Você achou o número secreto com ${attempt} ${wrdTry}`;
        getElementByHtml('p', msgTry);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (kick > secretNumber) {
            getElementByHtml('p', 'O número secreto é menor');
        } else {
            getElementByHtml('p', 'O número secreto é maior');
        }
        attempt++;
        clearInput()
    }
}

function randomNumber() {
    let choicedNumber = parseInt(Math.random() * 3 + 1);
    let qttElementsList = raffledNumberList.length;
    if (qttElementsList == maxQttNum) {
        raffledNumberList = [];
    }
    if (raffledNumberList.includes(choicedNumber)) {
        return randomNumber();
    } else {
        raffledNumberList.push(choicedNumber);
        console.log(raffledNumberList);
        
        return choicedNumber;
    }
}

function clearInput() {
    kick = document.querySelector('input');
    kick.value = '';
}

function resetGame() {
    secretNumber = randomNumber();
    clearInput();
    attempt = 1;
    showStartMsg();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
