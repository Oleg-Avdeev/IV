const fs = require('fs')

exports.getUser = function(user_name) {
    
    var user = { name: user_name, learn_id: 0, learn_session: 0, words_rating: {} };
    if (!fs.existsSync(`./users/${user_name}.json`))
    {
        fs.writeFileSync(`./users/${user_name}.json`, JSON.stringify(user))
    }
    else
    {
        user = JSON.parse(fs.readFileSync(`./users/${user_name}.json`).toString());
    }

    return user;
}

exports.setUser = function(user) {
    fs.writeFileSync(`./users/${user.name}.json`, JSON.stringify(user))
}