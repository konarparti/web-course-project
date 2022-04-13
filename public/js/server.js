const express = require('express');
const mustacheExpress = require('mustache-express')
const path = require('path');
const app = express();
const {answer} = require('./app.js')
const port = 8080;

app.use(express.static(path.join(__dirname, '../')));

app.set('views', path.join(__dirname, '../'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/', (req,res) => {
    res.render('index', answer)
});

app.get('/api/polymers', (req,res) => {
    res.json(answer);
});

app.all("*", (req, res) =>{
    res.status(404).send('Resource not found');
})

app.listen(port, () => {
    console.log("server is listening port " + port);
});
