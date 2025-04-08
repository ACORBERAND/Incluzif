import { useEffect, useRef } from "react";
import { toolkit } from "verovio";
import "./score.css";

export default function Player() {
  const container = useRef(null);
  const config = JSON.parse(localStorage.getItem("scoreInfos"));

  useEffect(() => {
    const tk = new toolkit();

    fetch(config?.path)
      .then((res) => res.text())
      .then((meiXML) => {
        const svg = tk.renderData(meiXML, {
          scale: 150,
          adjustPageWidth: true,
          adjustPageHeight: true,
          breaks: "none",
        });

        if (container.current) {
          container.current.innerHTML = svg;
          container.current.firstChild?.classList.add("score");

          // Styliser les notes
          const notes = container.current.querySelectorAll(".note");

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

                if (
                  firstDo !== null &&
                  tk.getElementAttr(firstDo.id).oct > doLowerOct
                ) {
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
              case "a":
                note.classList.add("note-a");
                break;
              case "b":
                note.classList.add("note-b");
                break;
              case "d":
                note.classList.add("note-d");
                break;
              case "e":
                note.classList.add("note-e");
                break;
              case "f":
                note.classList.add("note-f");
                break;
              case "g":
                note.classList.add("note-g");
                break;
            }
          });
        }
      });
  }, []);

  return (
    <>
      <section className="player gc-full">
        <div id="notation" className="panel-body">
          <div ref={container} className="panel" />
        </div>
      </section>
    </>
  );
}
