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
let answer = {arrayOfPolymers}

class Polymer {
    constructor(name) {
        this.name = name
    }
};


session.run('MATCH (n) RETURN n')
    .subscribe({
        onKeys: keys => {
            console.log(keys)
        },
        onNext: record => {
            if (record.get('n') != null) {
                arrayOfPolymers.push(record.get('n'));
            }
        },
        onCompleted: async () => {
            await session.close() // returns a Promise
        },
        onError: error => {
            console.log(error)
        }
    });

module.exports = {answer}