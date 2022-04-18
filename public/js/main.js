
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

const selectFirst = document.getElementById('firstPolymer');
let selectedFirstValue = selectFirst.value;
const selectSecond = document.getElementById('secondPolymer');
let selectedSecondValue = selectSecond.value;
const buttonReady = document.getElementById('ready');

const requestPolymer = () =>{
    selectedFirstValue = selectFirst.value;
    selectedSecondValue = selectSecond.value;
    axios.post('/api/postPolymers', {
        firstPolymer: selectedFirstValue.toString(),
        secondPolymer: selectedSecondValue.toString()
    }).then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

buttonReady.addEventListener('click', requestPolymer);

