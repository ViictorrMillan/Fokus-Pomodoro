const html = document.querySelector('html');
const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const starPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const reiniciarBt = document.querySelector('#reset');
const imagemPlayOuPause = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musicaDeIniciar = new Audio ('/sons/play.wav');
const musicaDePausar = new Audio ('/sons/pause.mp3');
const musicaDeFinalizar = new Audio ('/sons/beep.mp3');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
musica.loop = true;


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
let contexto = 'foco';

musicaFocoInput.addEventListener('change', () => {
   if (musica.paused) {
       musica.play();    
    }
    else {
        musica.pause();
    } 

});	

focoBT.addEventListener('click', () => {
    contexto = 'foco';
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    banner.setAttribute('src', 'imagens/foco.png');
    focoBT.classList.add('active');
});

curtoBT.addEventListener('click', () => {
    contexto = 'descanso-curto';
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    banner.setAttribute('src', 'imagens/descanso-curto.png');
    curtoBT.classList.add('active');
});

longoBT.addEventListener('click', () => {
    contexto = 'descanso-longo';
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    banner.setAttribute('src', 'imagens/descanso-longo.png');
    longoBT.classList.add('active');
});


function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    
   botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })

    switch (contexto) {
        case ('foco'):
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case ('descanso-curto'):
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break

        case ('descanso-longo'):
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`
        break 
}}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaDeFinalizar.play();
        alert ('Tempo finalizado!');	
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();

}

starPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar () {

    if (intervaloId) {
        musicaDePausar.play();
        zerar();
        return;

    }

    musicaDeIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemPlayOuPause.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId)     
    iniciarOuPausarBt.textContent = 'Começar'; 
    imagemPlayOuPause.setAttribute('src', '/imagens/play_arrow.png');       
    intervaloId = null;
    
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit', second: '2-digit'
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();

reiniciarBt.addEventListener('click', () => {
    reset();
    console.log('reset');
});

function reset() {
    if (contexto === 'foco') {
        tempoDecorridoEmSegundos = 1500;
    }
    if (contexto === 'descanso-curto') {
        tempoDecorridoEmSegundos = 300;
    }
    if (contexto === 'descanso-longo') {
        tempoDecorridoEmSegundos = 900;
    }
    mostrarTempo();
}