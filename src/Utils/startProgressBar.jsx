export default function startProgressBar() {
    const panel = document.getElementById("panel");
    const progressBar = document.getElementById("progressBar");    
    

    const maxScrollLeft = panel.scrollWidth - panel.clientWidth;
    const currentScrollLeft = panel.scrollLeft;
    const progress = (currentScrollLeft / maxScrollLeft) * 100;
    progressBar.style.width = progress + "%";
}