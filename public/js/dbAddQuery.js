const neo4j = require("neo4j-driver");
const addPolymer = (newPolymerName, oldPolymerName, isReverse, callback) => {

    const neo4j = require('neo4j-driver');
    const {error} = require("neo4j-driver");

    const driver = neo4j.driver(
        'neo4j://localhost',
        neo4j.auth.basic('neo4j', 'root')
    )

    const session = driver.session({
        database: 'neo4j',
        defaultAccessMode: neo4j.session.WRITE
    })
    let query;
    if (isReverse) {
        query = `MATCH(a:Polymer)
        WHERE a.name = "${oldPolymerName}"
        CREATE (p:Polymer{name: "${newPolymerName}"}) 
        CREATE (p)-[r1:source]->(a) 
        CREATE (a)-[r2:source]->(p)`
    } else {
        query = `MATCH(a:Polymer)
        WHERE a.name = "${oldPolymerName}"
        CREATE (p:Polymer{name: "${newPolymerName}"}) 
        CREATE (p)-[r1:source]->(a)`
    }

    session.run(query)
        .subscribe({
            onKeys: keys => {
            },
            onNext: record => {
            },
            onCompleted: async () => {
                await session.close() // returns a Promise
                callback(null, 'ok');
            },
            onError: error => {
                console.log(error)
                callback(error);
            }
        });

}

module.exports = {addPolymer};