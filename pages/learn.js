const fs = require('fs')

exports.getPage = function (user, word) {
    
    var style = fs.readFileSync("./pages/style.css")

    return `<html>
<head>
    <title>Learn new verbs</title>
    <style>${style}</style>
</head>
<body>
    <div class="card">
        <h1><p>${word[3]}</p></h1>
        <h2><p>${word[0]} | ${word[1]} | ${word[2]}</p></h2>
        <form action="/${user.name}/learn" method="POST">
          <input type="submit" class="button" value="OK!">
        </form>
    </div>
</body>

<script>
    function OK() {
        
    }
</script>

</html>`;
}
