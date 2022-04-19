
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
        axios.get('/api/getByQuery')
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
    class Node{
        constructor(name, link) {
            this.name = name;
            this.link = [];

            for (let i = 0; i < link.length; i++){
                this.link[i] = link[i];
            }
        }
    }

   try{
        let startNode = graphValue.paths[0].start.properties.name;
        let endNode = graphValue.paths[0].end.properties.name;
        let anotherNodes = [];
        for(let i = 0; i < graphValue.paths[0].segments.length; i++){
            anotherNodes.push(graphValue.paths[0].segments[i].end.properties.name);
        }

        data.push(new Node(startNode, []));
        data.push(new Node(endNode, []));

       for(let i = 0; i < anotherNodes.length - 1; i++){
           console.log(anotherNodes[i]);
           data.push(new Node(anotherNodes[i], []));
       }
   }
    catch (e) {
        data.push(new Node('Data', ['No']));
        data.push(new Node('No', ['Data']));

    }

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