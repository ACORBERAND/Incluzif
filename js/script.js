document.addEventListener("DOMContentLoaded", (event) => {
    verovio.module.onRuntimeInitialized = () => {
        let tk = new verovio.toolkit();
        fetch("./src/score.mei")
            .then(function (response) {
                return response.text();
            })
            .then(function (meiXML) {
                let svg = tk.renderData(meiXML, {});
                document.getElementById("notation").innerHTML = svg;
                // console.log(tk.getElementAttr(pname));

                const notes = document.querySelectorAll('.note');

                Array.from(notes).forEach(note => {
                    const pname = tk.getElementAttr(note.id).pname

                    switch (pname) {
                        case 'a':
                            note.classList.add('note-a');
                            break;
                        case 'b':
                            note.classList.add('note-b');
                            break;
                        case 'c':
                            note.classList.add('note-c');
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
                        default:
                            note.classList.add('note-unknown');
                            break;
                    }
                })
            }
            )
    };
});

