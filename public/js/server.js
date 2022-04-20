const express = require('express');
const mustacheExpress = require('mustache-express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const {answer} = require('./dbGetAll');
const {main} = require('./dbGetQuery');
const port = 8080;

let dbResponse;
let firstSelected;
let secondSelected;

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('views', path.join(__dirname, '../'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
    res.render('index', answer)
});

app.get('/api/getAllPolymers', (req, res) => {
    res.json(answer);
});

app.post('/api/postPolymers', (req, res) => {
    firstSelected = req.body.firstPolymer;
    secondSelected = req.body.secondPolymer;
    // noinspection JSVoidFunctionReturnValueUsed
    dbResponse = main(firstSelected, secondSelected, (error, dbResponse) => {
        if (error) {
            res.status(500)
            return res.end();
        }
        res.json(dbResponse);
    });
})

app.all("*", (req, res) => {
    res.status(404).send('Resource not found');
})

app.listen(port, () => {
    console.log("server is listening port " + port);
});
