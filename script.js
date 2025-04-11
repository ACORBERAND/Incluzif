const container = document.getElementById("notation");
const pausePlayButton = document.getElementById("playPause");
const progressBar = document.getElementById('progressBar');
const resetButton = document.getElementById("resetButton");
const tempoInput = document.getElementById("tempo");

let scoreState = "pause";
let scrollInterval = null;
let tempo = 80;


window.addEventListener("DOMContentLoaded", () => {
    const tk = new verovio.toolkit();

    if (!container) return;

    const meiPath = container.dataset.meiPath;
    if (!meiPath) {
        console.error("Aucun fichier MEI spécifié");
        return;
    }


    fetch(meiPath)
        .then((res) => res.text())
        .then((meiXML) => {
            const svg = tk.renderData(meiXML, {
                adjustPageWidth: true,
                adjustPageHeight: true,
                breaks: "none",
            });


            if (container) {
                container.innerHTML = svg;
                container.firstChild.classList.add("score");

                const notes = container.querySelectorAll(".note");

                let doLowerOct = -1;
                let firstDo = null;

                notes.forEach((note) => {
                    const attr = tk.getElementAttr(note.id);
                    const pname = attr.pname;
                    const oct = attr.oct;

                    if (pname === "c") {
                        if (doLowerOct === -1) firstDo = note;
                        if (doLowerOct === -1 || oct < doLowerOct) {
                            doLowerOct = oct;
                            if (firstDo && tk.getElementAttr(firstDo.id).oct > doLowerOct) {
                                firstDo.classList.remove("note-c");
                                firstDo.classList.add("note-c-higher");
                            }
                        }

                        if (oct === doLowerOct) {
                            note.classList.add("note-c");
                        } else {
                            note.classList.add("note-c-higher");
                        }
                    }

                    switch (pname) {
                        case "a": note.classList.add("note-a"); break;
                        case "b": note.classList.add("note-b"); break;
                        case "d": note.classList.add("note-d"); break;
                        case "e": note.classList.add("note-e"); break;
                        case "f": note.classList.add("note-f"); break;
                        case "g": note.classList.add("note-g"); break;
                    }
                });
            }
        });
});



container.addEventListener("scroll", () => {
    startProgressBar()
    
})



// tempoInput.addEventListener("input", () => {
//     tempo = parseInt(tempoInput.value);
// });



// --- PLAY/PAUSE ---
pausePlayButton.addEventListener("click", () => {
    if (scoreState === "pause") {
        pausePlayButton.innerText = "Pause";
        scoreState = "play";
        startScrolling();
    } else {
        pausePlayButton.innerText = "Jouer la partition";
        scoreState = "pause";
        stopScrolling();
    }
});



// --- SCROLLING avec mise à jour de la progress bar ---
function startScrolling() {
    const msPerBeat = 60000 / tempo; // Durée d'un beat en ms
    const scrollAmountPerBeat = 50;  // Pixels à défiler par beat

    if (scrollInterval) clearInterval(scrollInterval);

    scrollInterval = setInterval(() => {
        container.scrollLeft += scrollAmountPerBeat / (msPerBeat / 30);
        updateProgressBar(); // <-- Mettre à jour la barre en même temps que ça scroll
    }, 30);
}

// --- Fonction qui met à jour la barre de progression en fonction du scroll ---
function updateProgressBar() {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScrollLeft = container.scrollLeft;
    const progress = (currentScrollLeft / maxScrollLeft) * 100;
    progressBar.style.width = progress + "%";
}


function startProgressBar() {
    const progressBar = document.getElementById("progressBar");

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScrollLeft = container.scrollLeft;
    const progress = (currentScrollLeft / maxScrollLeft) * 100;
    progressBar.style.width = progress + "%";
}

function stopScrolling() {
    clearInterval(scrollInterval);
}


// // --- RESET BUTTON ---
// resetButton.addEventListener("click", () => {
//     // Arrête tout
//     stopScrolling();
//     // Revenir visuellement tout à gauche
//     const notationDiv = document.getElementById("notation");
//     if (notationDiv) {
//         notationDiv.scrollLeft = 0;
//     }

//     // Remet l'icône sur Play
//     pausePlayButton.children[0].src = "./assets/images/play button.png";
//     scoreState = "pause";
//     progressBar.style.width = "0%";  // Remet la barre à zéro

// });