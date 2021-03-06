const express = require('express')

const users = require('./users/controller')
const words = require('./words/controller')

const learn_page = require('./pages/learn')
const practice_page = require('./pages/practice')
const profile_page = require('./pages/profile')

const app = express()
const port = 4444

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/:user/', (req, res) => {
    var user = users.getUser(req.params.user);
    var response = profile_page.getPage(user);
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
        if (user.learn_id - user.learn_session * 5 == 5)
        {
            user.learn_session++;
            users.setUser(user);
            res.redirect(`/${user.name}/`)
            return;
        }
    users.setUser(user);

    var line = words.getVerb(user.learn_id)
    var response = learn_page.getPage(user, line);
    res.send(response);
});

app.get('/:user/practice', (req, res) => {
    var user = users.getUser(req.params.user);
    var line = getWord(user, 10);
    
    var response = practice_page.getPage(user, line);
    res.send(response);
});

app.post('/:user/practice', (req, res) => {
    var user = users.getUser(req.params.user);
        console.log(req.body)
        console.log(req.params)
        user.words_rating[req.body.word] = (user.words_rating[req.body.word] || 0) + 1;;
    users.setUser(user);

    var line = getWord(user, 10);
    var response = practice_page.getPage(user, line);
    res.send(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getWord(user, maxRating) {
    var r = 0;
    var length = user.learn_id;
    var index = getRandomInt(length);
    while (r < length) {
        var line = words.getVerb(index)
        var rating = user.words_rating[line[0]]
        if (!rating || rating < maxRating) {
            return line;
        }
        index = (index + 1) % length
        r++;
    }
}