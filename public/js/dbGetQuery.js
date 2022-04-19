
const main = (firstPolymer, secondPolymer) => {

    const neo4j = require('neo4j-driver');
    const {error} = require("neo4j-driver");

    const driver = neo4j.driver(
        'neo4j://localhost',
        neo4j.auth.basic('neo4j', 'root')
    )

    const session = driver.session({
        database: 'neo4j',
        defaultAccessMode: neo4j.session.READ
    })

    let paths = [];
    let answer = {paths};

    let query = `MATCH (f1{name:"${firstPolymer}"}) 
    MATCH (f2{name:"${secondPolymer}"})
    MATCH path = shortestPath( (f1)-[relation*1..]->(f2) )
    RETURN path;`

    session.run(query)
        .subscribe({
            onKeys: keys => {
            },
            onNext: record => {
                paths.push(record.get('path'));
            },
            onCompleted: async () => {
                await session.close() // returns a Promise
            },
            onError: error => {
                console.log(error)
            }
        });
    setTimeout(()=>{
        console.dir(answer.paths[0].start.properties.name);
    }, 1000);
    return answer;

}

module.exports = {main};