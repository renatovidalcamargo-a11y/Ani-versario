// ==========================================
// VARIÁVEIS
// ==========================================

const telaInicial = document.getElementById("telaInicial");
const telaPresente = document.getElementById("telaPresente");
const telaCarta = document.getElementById("telaCarta");
const telaFinal = document.getElementById("telaFinal");

const nomeInput = document.getElementById("nomeInput");
const nomePessoa = document.getElementById("nomePessoa");
const nomeFinal = document.getElementById("nomeFinal");

const btnComecar = document.getElementById("btnComecar");
const btnReiniciar = document.getElementById("btnReiniciar");

const presente = document.getElementById("presente");

const contador = document.getElementById("contador");

const mensagemClique =
    document.getElementById("mensagemClique");

const instrucao =
    document.getElementById("instrucao");

const carta =
    document.getElementById("carta");

const musica =
    document.getElementById("musica");


// ==========================================
// CONFIGURAÇÕES
// ==========================================

let nome = "";

let cliques = 0;

const LIMITE_CLIQUES = 5;


// ==========================================
// COMEÇAR
// ==========================================

btnComecar.addEventListener("click", iniciar);

nomeInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        iniciar();

    }

});


function iniciar() {

    nome = nomeInput.value.trim();

    if (nome === "") {

        document.getElementById("erroNome").textContent =
            "Digite seu nome primeiro! 😅";

        return;

    }


    nomePessoa.textContent = nome;


    trocarTela(
        telaInicial,
        telaPresente
    );


    // Tenta iniciar música
    musica.play().catch(() => {

        console.log(
            "A música só poderá começar após interação."
        );

    });

}


// ==========================================
// TROCAR DE TELA
// ==========================================

function trocarTela(atual, proxima) {

    atual.classList.remove("ativa");

    proxima.classList.add("ativa");

}


// ==========================================
// CLICAR NO PRESENTE
// ==========================================

presente.addEventListener("click", abrirPresente);


function abrirPresente() {

    if (cliques >= LIMITE_CLIQUES) {

        return;

    }


    cliques++;


    contador.textContent = cliques;


    // Animação de tremida

    presente.classList.remove("tremendo");

    void presente.offsetWidth;

    presente.classList.add("tremendo");


    // Mensagens diferentes

    if (cliques === 1) {

        mensagemClique.textContent =
            "Hmm... parece que não foi suficiente 😏";

    }

    else if (cliques === 2) {

        mensagemClique.textContent =
            "Mais uma vez! 👀";

    }

    else if (cliques === 3) {

        mensagemClique.textContent =
            "Está começando a abrir! 🎁";

    }

    else if (cliques === 4) {

        mensagemClique.textContent =
            "QUASE! 😱";

    }

    else if (cliques === 5) {

        mensagemClique.textContent =
            "ABRIU!!! 🎉";

        abrirPresenteDeVerdade();

    }

}


// ==========================================
// ABRIR PRESENTE
// ==========================================

function abrirPresenteDeVerdade() {

    presente.classList.add("aberto");


    instrucao.textContent =
        "Você conseguiu! 🎉";


    setTimeout(() => {

        trocarTela(
            telaPresente,
            telaCarta
        );

    }, 1200);

}


// ==========================================
// CLICAR NA CARTA
// ==========================================

carta.addEventListener("click", abrirCarta);


function abrirCarta() {

    carta.classList.add("aberta");


    document.getElementById("cliqueCarta").textContent =
        "💌";


    setTimeout(() => {

        mostrarFinal();

    }, 1500);

}


// ==========================================
// FINAL
// ==========================================

function mostrarFinal() {

    nomeFinal.textContent =
        nome + "! 🎉";


    trocarTela(
        telaCarta,
        telaFinal
    );


    criarConfetes();


    // Música tenta tocar novamente

    musica.play().catch(() => {});

}


// ==========================================
// CONFETES
// ==========================================

function criarConfetes() {

    const container =
        document.getElementById("confetes");


    container.innerHTML = "";


    const quantidade = 120;


    for (let i = 0; i < quantidade; i++) {

        const confete =
            document.createElement("div");


        confete.classList.add("confete");


        confete.style.left =
            Math.random() * 100 + "%";


        confete.style.animationDelay =
            Math.random() * 3 + "s";


        confete.style.animationDuration =
            3 + Math.random() * 3 + "s";


        const tamanho =
            5 + Math.random() * 10;


        confete.style.width =
            tamanho + "px";


        confete.style.height =
            tamanho * 2 + "px";


        container.appendChild(confete);

    }

}


// ==========================================
// REINICIAR
// ==========================================

btnReiniciar.addEventListener(
    "click",
    reiniciar
);


function reiniciar() {

    cliques = 0;

    contador.textContent = "0";

    nomeInput.value = "";

    presente.classList.remove(
        "aberto",
        "tremendo"
    );

    carta.classList.remove(
        "aberta"
    );


    mensagemClique.textContent =
        "👆 Clique!";


    instrucao.textContent =
        "Clique no presente para abrir.";


    document.getElementById(
        "cliqueCarta"
    ).textContent =
        "Clique na carta 💌";


    document.getElementById(
        "confetes"
    ).innerHTML = "";


    trocarTela(
        telaFinal,
        telaInicial
    );

}