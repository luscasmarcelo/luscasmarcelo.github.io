document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const resultadoDiv = document.getElementById('resultado');

    //verificase a API é suportada no navegador
    if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Desculpe, o seu navegador não suporta reconhecimento de voz.");
        return;
    }

    //cria uma instancia de reconhecimento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    //configurando o reconhecimento de voz
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    //iniciando o reconhecimento de voz quando o botão é clicado
    startButton.addEventListener('click', () => {
        recognition.start();
        resultadoDiv.textContent = 'Escutando...';
    });

    //quando o reconhecimento de voz obtém um resultado
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resultadoDiv.textContent = `Você disse: ${transcript}`;
    };

    //tratando erros
    recognition.onerror = (event) => {
        resultadoDiv.textContent = `Erro m=no reconhecimento de voz. ${event.error}`;
    };
});