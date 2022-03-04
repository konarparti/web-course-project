const navPanel = document.getElementById('nav-panel');
const navToggleItem = document.getElementById('nav-toggle-item');
//TODO: наверное можно как то через события

const makeActive = () => {
    navPanel.classList.toggle("active");
    navToggleItem.classList.toggle("active")
}
