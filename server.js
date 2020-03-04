const express = require('express')

const users = require('./users/controller')
const words = require('./words/controller')
const learn_page = require('./pages/learn')
const practice_page = require('./pages/practice')

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/:user/', (req, res) => {
    var user = users.getUser(req.params.user);
    var response = `Hello World, ${JSON.stringify(user)}!`;
    res.send(response);
});

app.get('/:user/learn', (req, res) => {
    var user = users.getUser(req.params.user);
    var line = words.getVerb(user.learn_id)
    var response = learn_page.getPage(user, line);
    res.send(response);
});

app.post('/:user/learn', (req, res) => {
    var user = users.getUser(req.params.user);
        user.learn_id++;
        user.learn_session++;
    users.setUser(user);

    var line = words.getVerb(user.learn_id)
    var response = learn_page.getPage(user, line);
    res.send(response);
});

app.get('/:user/practice', (req, res) => {
    var user = users.getUser(req.params.user);
    
    var index = getRandomInt(user.learn_id + 1);
    var line = words.getVerb(index)
    var response = practice_page.getPage(user, line);
    res.send(response);
});

app.post('/:user/practice', (req, res) => {
    var user = users.getUser(req.params.user);
        console.log(req.body)
        console.log(req.params)
        user.words_rating[req.body.word] = (user.words_rating[req.body.word] || 0) + 1;;
    users.setUser(user);

    var index = getRandomInt(user.learn_id + 1);
    var line = words.getVerb(index)
    var response = practice_page.getPage(user, line);
    res.send(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}