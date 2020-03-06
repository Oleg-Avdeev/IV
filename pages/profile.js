const fs = require('fs')

exports.getPage = function (user) {
    
    var style = fs.readFileSync(__dirname+"/style.css")

    return `<html>
<head>
    <title>Профиль пользователя ${user.name}</title>
    <style>${style}</style>
</head>
<body>
    <div class="card">
        <h1><p>Здравствуй, ${user.name}</p></h1>
        <h3><p>Выучено слов: ${user.learn_id}</p></h3>
        <h2><p>Что хочешь делать?</p></h2>
        
        <form action="/${user.name}/practice" method="GET">
          <input style="padding: 5px; width: 50%; right: 0px; left: 50%;" type="submit" class="button" value="Повторять">
        </form>

        <form action="/${user.name}/learn" method="GET">
          <input style="padding: 5px; width: 50%;" type="submit" class="button" value="Учить">
        </form>
    </div>
    <div id="preload"> <img src="../2.jpg" width="1" height="1" alt="Image 01" /> </div>
</body>
</html>`;
}
