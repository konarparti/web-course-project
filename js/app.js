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

session.run('MATCH (n) RETURN n.name')
    .subscribe({
            onKeys: keys => {
                console.log(keys)
            },
            onNext: record => {
                if(record.get('n.name') != null){
                    console.log(record.get("n.name"));
                    arrayOfPolymers.push(record.get('n.name'))
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
    console.table(arrayOfPolymers);
}, 1000)