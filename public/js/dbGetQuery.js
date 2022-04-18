
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

    let arrayOfPolymers = [];
    let pathOne = [];
    let pathTwo = [];
    let answer = { arrayOfPolymers, pathOne, pathTwo};

    let query = `MATCH (f1{name:"${firstPolymer}"})-[p1]-(Polymer)-[p2]-(f2{name:"${secondPolymer}"}) return Polymer, p1, p2`

    session.run(query)
        .subscribe({
            onKeys: keys => {
            },
            onNext: record => {
                arrayOfPolymers.push(record.get('Polymer'));
                pathOne.push(record.get('p1'));
                pathTwo.push(record.get('p2'));
            },
            onCompleted: async () => {
                await session.close() // returns a Promise
            },
            onError: error => {
                console.log(error)
            }
        });
    return answer;

}

module.exports = {main};