
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
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    setTimeout(() => {
        axios.get('/api/test')
            .then(function (response) {
                graphFunction(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, 1000);
}

buttonReady.addEventListener('click', requestPolymer);

//Graph
const graphFunction = (graphValue) => {
    let chart = am4core.create("graph", am4plugins_forceDirected.ForceDirectedTree);

    let series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

    series.colors.list = [
        am4core.color("#7ac")
    ];

    let data = [];
    let link = [];
    class Node{
        constructor(name, link) {
            this.name = name;
            this.value = 1;
            this.link = [];

            for (let i = 0; i < link.length; ++i){
                this.link[i] = link[i];
            }
        }
    }

    link.push(selectedFirstValue, selectedSecondValue);

    data.push(new Node(selectedFirstValue, [graphValue.arrayOfPolymers[0].properties.name]));
    data.push(new Node(graphValue.arrayOfPolymers[0].properties.name, link));
    data.push(new Node(selectedSecondValue, [graphValue.arrayOfPolymers[0].properties.name]));

    series.data = data;
// Set up data fields
    series.dataFields.id = "name";
    series.dataFields.value = "value"
    series.dataFields.linkWith = "link";
// Add labels
    series.nodes.template.label.text = "{name}";
    series.fontSize = 16;
    series.minRadius = 35;
    series.maxRadius = 50;
    series.links.template.strokeWidth = 3;
    series.links.template.strokeOpacity = 0.7;

    series.centerStrength = 0.5;
}