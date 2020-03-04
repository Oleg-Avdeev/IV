const fs = require('fs')

exports.getPage = function (user, word) {
    
    var style = fs.readFileSync("./pages/style.css")

    return `<html>
<head>
    <title>Learn new verbs</title>
    <style>${style}</style>
</head>
<body>
    <div id="ru" class="card">
        <h1><p>${word[3]}</p></h1>
        <button class="button" onClick="flip()">Проверить</button>
    </div>

    <div id="eng" style="display: none;" class="card">
        <h1><p>${word[0]} | ${word[1]} | ${word[2]}</p></h1>
        
        <form action="/${user.name}/practice" method="POST">
          <input id="word" name="word" type="hidden" value="${word[0]}">
          <input style="padding: 5px; width: 50%; right: 0px;" type="submit" class="button" value="Вспомнила">
        </form>

        <form action="/${user.name}/practice" method="GET">
          <input style="padding: 5px; width: 50%;" type="submit" class="button" value="Не Вспомнила">
        </form>
    </div>
</body>

<script>
    function flip() {
        document.getElementById("eng").style.display = "block";
        document.getElementById("ru").style.display = "none";
    }
</script>

</html>`;
}
