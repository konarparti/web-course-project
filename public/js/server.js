const express = require('express');
const mustacheExpress = require('mustache-express')
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const {answer} = require('./dbGetAll');
const {main} = require('./dbGetQuery');
const port = 8080;

let users = [
    {username: 'admin', password: 'admin'}
];

let dbResponse;
let firstSelected;
let secondSelected;

app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
}))
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('views', path.join(__dirname, '../'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.post('/login', function (req, res) {
    let foundUser;
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        if (u.username === req.body.username && u.password === req.body.password) {
            foundUser = u.username;
            break;
        }
    }
    if (foundUser !== undefined) {
        req.session.username = foundUser;
        res.send('?'); //надо как то перенаправить на страницу admin
        return;
    } else {
        console.log('fail: user: ' + req.body.username);
        res.status(401).send('error');
    }
});

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
