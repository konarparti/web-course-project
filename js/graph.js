
var viz;

function draw() {
    var config = {
        container_id: "graph",
        server_url: "bolt://localhost:7687",
        server_user: "neo4j",
        server_password: "root",
        labels: {
            "Polymer": {
                "caption": "name"
            }
        },
        relationships: {
            "INTERACTS": {
                "thickness": "weight",
                "caption": false
            }
        },
        initial_cypher: "MATCH (n)-[r]->(m) RETURN *"
    };

    viz = new NeoVis.default(config);
    viz.render();
}