let doLowerOct = -1
let firstDo = null
document.addEventListener("DOMContentLoaded", () => {
    verovio.module.onRuntimeInitialized = () => {
        let tk = new verovio.toolkit();
        fetch("./src/score.mei")
            .then(function (response) {
                return response.text();
            })
            .then(function (meiXML) {
                let svg = tk.renderData(meiXML,
                    {
                        scale: 150,
                        adjustPageWidth: true,
                        adjustPageHeight: true,
                        breaks: "none",
                    }
                );

                console.log(tk.getOptions())
                document.getElementById("notation").innerHTML = svg;

                const notes = document.querySelectorAll('.note');

                Array.from(notes).forEach(note => {
                    const pname = tk.getElementAttr(note.id).pname
                    const oct = tk.getElementAttr(note.id).oct


                    if (pname === "c") {

                        if (doLowerOct === -1) {
                            firstDo = note
                        }

                        if (doLowerOct === -1 || oct < doLowerOct) {
                            doLowerOct = oct
                            console.log(oct + " do with higher oct than this will be red")

                            if (firstDo !== null && tk.getElementAttr(firstDo.id).oct > doLowerOct) {
                                firstDo.classList.remove('note-c')
                                firstDo.classList.add('note-c-higher')
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
                        case 'a':
                            note.classList.add('note-a');
                            break;
                        case 'b':
                            note.classList.add('note-b');
                            break;
                        case 'd':
                            note.classList.add('note-d');
                            break;
                        case 'e':
                            note.classList.add('note-e');
                            break;
                        case 'f':
                            note.classList.add('note-f');
                            break;
                        case 'g':
                            note.classList.add('note-g');
                            break;
                    }
                })
            }
            )
    };
});

