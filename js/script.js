const pausePlayButton = document.getElementById("playPauseButton");
let scoreState = "pause";

let doLowerOct = -1;
let firstDo = null;
const scoreContainer = document.getElementById("notation");

let tk = null; // Toolkit rendu GLOBAL ici
let repaintInterval = null; // Timer pour faire avancer le curseur

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

function startRepaint() {
    if (repaintInterval) clearInterval(repaintInterval);
    repaintInterval = setInterval(() => {
        const currentTime = tk.getTime();
        const cursorSVG = tk.renderCursor();
        const svgContainer = scoreContainer.querySelector('svg');

        if (svgContainer && cursorSVG) {
            svgContainer.querySelectorAll('.cursor').forEach(el => el.remove());
            svgContainer.insertAdjacentHTML('beforeend', cursorSVG);
        }
    }, 50); // Toutes les 50ms pour déplacer le curseur
}

function startScrolling() {
    const notationDiv = document.getElementById("notation");

    scrollInterval = setInterval(() => {
        notationDiv.scrollLeft += 2; // Continue là où il en est
    }, 30);
}

function stopScrolling() {
    clearInterval(scrollInterval);
}

pausePlayButton.addEventListener("click", () => {
    if (scoreState === "pause") {
        pausePlayButton.children[0].src = "./assets/images/pause button.png";
        scoreState = "play";
        startScrolling();  // <-- Continue sans reset
        startRepaint();    // <-- Déplace aussi le curseur
    } else {
        pausePlayButton.children[0].src = "./assets/images/play button.png";
        scoreState = "pause";
        stopScrolling();   // <-- Stoppe le scroll
        clearInterval(repaintInterval); // <-- Stoppe aussi le curseur
    }
});

