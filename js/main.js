const navToggle = document.getElementById('nav-toggle');
const navPanel = document.getElementById('nav-panel');
const navToggleItem = document.getElementById('nav-toggle-item');

const makeActive = () => {
    navPanel.classList.toggle("active");
    navToggleItem.classList.toggle("active")
}
navToggle.addEventListener('click', makeActive);

const blockView = document.getElementById('block-view');
const inlineView = document.getElementById('inline-view');

const changeOnBlockView = () =>{
    blockView.style.display = "";
    inlineView.style.display = "none";
}
const changeOnInlineView = () =>{
    inlineView.style.display = "";
    blockView.style.display = "none";
}