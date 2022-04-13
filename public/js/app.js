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
let answer = { arrayOfPolymers}
class Polymer{
    constructor(name) {
        this.name = name
    }
};


session.run('MATCH (n) RETURN n.name')
    .subscribe({
            onKeys: keys => {
                console.log(keys)
            },
            onNext: record => {
                if(record.get('n.name') != null){
                    arrayOfPolymers.push(new Polymer(record.get('n.name')));
                }
            },
            onCompleted: async () => {
                await session.close() // returns a Promise
            },
            onError: error => {
                console.log(error)
            }
    });
setTimeout(()=>{
    console.dir(answer);
}, 1000)

module.exports = {answer}