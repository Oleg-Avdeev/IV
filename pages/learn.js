const fs = require('fs')

exports.getPage = function (user, word) {
    
    var style = fs.readFileSync(__dirname+"/style.css")
    var learned = user.learn_id - user.learn_session * 5 + 1;
    var text = "OK!";
    if (learned == 5) text = "Закончить!"

    return `<html>
<head>
    <title>Learn new verbs</title>
    <style>${style}</style>
</head>
<body>
    <div class="card">
        <h1><p class="word">${word[3]}</p></h1>
        <h2><p>${word[0]} <span>|</span> ${word[1]} <span>|</span> ${word[2]}</p></h2>
        <form action="/${user.name}/learn" method="POST">
          <input type="submit" class="button" value="${text}">
        </form>

        <a href="/${user.name}/" class="previous">&#8249;</a>
        <div class="counter">${learned}/5</div>
    </div>
    <div id="preload"> <img src="../2.jpg" width="1" height="1" alt="Image 01" /> </div>
</body>
</html>`;
}
