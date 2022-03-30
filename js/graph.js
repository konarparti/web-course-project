
let chart = am4core.create("graph", am4plugins_forceDirected.ForceDirectedTree);

let series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

series.colors.list = [
    am4core.color("#acd")
];

series.data = [{
        "name": "SBS",
        "value": 1,
        "link": ["PB"]
    }, {
        "name": "PS",
        "value": 1,
        "link": ["PB"]
    }, {
        "name": "PE",
        "value": 1,
        "link": ["PB"]
    },
    {
        "name": "PB",
        "value": 1
    }];
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
series.links.template.strokeOpacity = 1;

series.centerStrength = 0.1;