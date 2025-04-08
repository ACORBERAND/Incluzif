const pausePlayButton = document.getElementById("playPauseButton");
const resetButton = document.getElementById("resetButton");
let scoreState = "pause";

let doLowerOct = -1;
let firstDo = null;
const scoreContainer = document.getElementById("notation");

let tk = null; // Toolkit rendu GLOBAL ici
let repaintInterval = null; // Timer pour faire avancer le curseur
let scrollInterval = null;  // Timer pour faire défiler

document.addEventListener("DOMContentLoaded", () => {
    verovio.module.onRuntimeInitialized = () => {
        tk = new verovio.toolkit(); // Affecte à la variable globale
        fetch("./src/score.mei")
            .then(function (response) {
                return response.text();
            })
            .then(function (meiXML) {
                let svg = tk.renderData(meiXML,
                    {
                        scale: 125,
                        adjustPageWidth: true,
                        adjustPageHeight: true,
                        breaks: "none",
                    }
                );

                console.log(tk.getOptions())
                scoreContainer.innerHTML = svg;
                scoreContainer.children[0].classList.add("score");

                const notes = document.querySelectorAll('.note');

                Array.from(notes).forEach(note => {
                    console.log(tk.getElementAttr(note.id))
                    const pname = tk.getElementAttr(note.id).pname
                    const oct = tk.getElementAttr(note.id).oct

                    if (pname === "c") {
                        if (doLowerOct === -1) {
                            firstDo = note;
                        }

                        if (doLowerOct === -1 || oct < doLowerOct) {
                            doLowerOct = oct;

                            if (firstDo !== null && tk.getElementAttr(firstDo.id).oct > doLowerOct) {
                                firstDo.classList.remove('note-c');
                                firstDo.classList.add('note-c-higher');
                            }
                        }

                        if (oct === doLowerOct) {
                            note.classList.add('note-c');
                        }

                        if (oct > doLowerOct) {
                            note.classList.add('note-c-higher');
                        }
                    }

                    switch (pname) {
                        case 'a': note.classList.add('note-a'); break;
                        case 'b': note.classList.add('note-b'); break;
                        case 'd': note.classList.add('note-d'); break;
                        case 'e': note.classList.add('note-e'); break;
                        case 'f': note.classList.add('note-f'); break;
                        case 'g': note.classList.add('note-g'); break;
                    }
                });
            });
    };
});

// --- TEMPO ---
let tempo = 80; // tempo par défaut
const tempoInput = document.getElementById("tempo");

tempoInput.addEventListener("input", () => {
    tempo = parseInt(tempoInput.value);
});

// --- SCROLLING ---
function startScrolling() {
    const notationDiv = document.getElementById("notation");

    const msPerBeat = 60000 / tempo; // Durée d'un beat en millisecondes
    const scrollAmountPerBeat = 50;   // Pixels par beat

    if (scrollInterval) clearInterval(scrollInterval);

    scrollInterval = setInterval(() => {
        notationDiv.scrollLeft += scrollAmountPerBeat / (msPerBeat / 30);
    }, 30); // Fluide
}

function stopScrolling() {
    clearInterval(scrollInterval);
}

// --- PLAY/PAUSE ---
pausePlayButton.addEventListener("click", () => {
    if (scoreState === "pause") {
        pausePlayButton.children[0].src = "./assets/images/pause button.png";
        scoreState = "play";
        startScrolling();
    } else {
        pausePlayButton.children[0].src = "./assets/images/play button.png";
        scoreState = "pause";
        stopScrolling();
    }
});

// --- RESET BUTTON ---
resetButton.addEventListener("click", () => {
    // Arrête tout
    stopScrolling();

    // Réinitialiser le rendu de la partition
    if (tk) {
        fetch("./src/score.mei")
            .then(function (response) {
                return response.text();
            })
            .then(function (meiXML) {
                let svg = tk.renderData(meiXML,
                    {
                        scale: 125,
                        adjustPageWidth: true,
                        adjustPageHeight: true,
                        breaks: "none",
                    }
                );

                // Remplace le contenu de la partition avec la nouvelle version
                scoreContainer.innerHTML = svg;
                scoreContainer.children[0].classList.add("score");

                // Restaure les couleurs des notes
                const notes = document.querySelectorAll('.note');

                Array.from(notes).forEach(note => {
                    const pname = tk.getElementAttr(note.id).pname
                    const oct = tk.getElementAttr(note.id).oct

                    if (pname === "c") {
                        if (doLowerOct === -1) {
                            firstDo = note;
                        }

                        if (doLowerOct === -1 || oct < doLowerOct) {
                            doLowerOct = oct;

                            if (firstDo !== null && tk.getElementAttr(firstDo.id).oct > doLowerOct) {
                                firstDo.classList.remove('note-c');
                                firstDo.classList.add('note-c-higher');
                            }
                        }

                        if (oct === doLowerOct) {
                            note.classList.add('note-c');
                        }

                        if (oct > doLowerOct) {
                            note.classList.add('note-c-higher');
                        }
                    }

                    switch (pname) {
                        case 'a': note.classList.add('note-a'); break;
                        case 'b': note.classList.add('note-b'); break;
                        case 'd': note.classList.add('note-d'); break;
                        case 'e': note.classList.add('note-e'); break;
                        case 'f': note.classList.add('note-f'); break;
                        case 'g': note.classList.add('note-g'); break;
                    }
                });

                // Revenir visuellement tout à gauche
                const notationDiv = document.getElementById("notation");
                if (notationDiv) {
                    notationDiv.scrollLeft = 0;
                }

                // Remet l'icône sur Play
                pausePlayButton.children[0].src = "./assets/images/play button.png";
                scoreState = "pause";
            });
    }
    progressBar.style.width = "0%";  // Remet la barre à zéro

});


const progressBar = document.getElementById('progress-bar');
const notationDiv = document.getElementById('notation');

// --- Fonction qui met à jour la barre de progression en fonction du scroll ---
function updateProgressBar() {
    const maxScrollLeft = notationDiv.scrollWidth - notationDiv.clientWidth;
    const currentScrollLeft = notationDiv.scrollLeft;
    const progress = (currentScrollLeft / maxScrollLeft) * 100;
    progressBar.style.width = progress + "%";
}

// --- SCROLLING avec mise à jour de la progress bar ---
function startScrolling() {
    const msPerBeat = 60000 / tempo; // Durée d'un beat en ms
    const scrollAmountPerBeat = 50;  // Pixels à défiler par beat

    if (scrollInterval) clearInterval(scrollInterval);

    scrollInterval = setInterval(() => {
        notationDiv.scrollLeft += scrollAmountPerBeat / (msPerBeat / 30);
        updateProgressBar(); // <-- Mettre à jour la barre en même temps que ça scroll
    }, 30);
}

function stopScrolling() {
    clearInterval(scrollInterval);
}
