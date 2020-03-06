const fs = require('fs')

exports.getPage = function (user, word) {

  var style = fs.readFileSync(__dirname + "/style.css")
  var rating = user.words_rating[word[0]];
  if (!rating) rating = 0;

  var q;
  if (rating < 1) {
    q = `<div id="q" style="display: block;" class="card">
        <a href="/${user.name}/" class="previous">&#8249;</a>
        <h1><p class="word">${word[3]}</p></h1>
        <h2><p>${word[0]} <span>|</span> ${word[1]} <span>|</span> ${word[2]}</p></h2>
        <form action="/${user.name}/practice" method="POST">
          <input id="word" name="word" type="hidden" value="${word[0]}">
          <input type="submit" class="button" value="Запомнила">
        </form>
        </div>`;
  }
  else if (rating < 5) {
    q = `<div id="q" style="display: block;" class="card">
        <a href="/${user.name}/" class="previous">&#8249;</a>
        <h1><p class="word">${word[3]}</p></h1>
        <button class="button" onClick="flip()">Проверить</button>
    </div>

    <div id="a" style="display: none;" class="card">
        <a href="/${user.name}/" class="previous">&#8249;</a>
        <h1><p class="word">${word[0]} <span>|</span> ${word[1]} <span>|</span> ${word[2]}</p></h1>
        <h2><p>${word[3]}</p></h2>
        
        <form action="/${user.name}/practice" method="POST">
          <input id="word" name="word" type="hidden" value="${word[0]}">
          <input style="padding: 5px; width: 50%; right: 0px;" type="submit" class="button" value="Вспомнила">
        </form>

        <form action="/${user.name}/practice" method="GET">
          <input style="padding: 5px; width: 50%; left: 50%; " type="submit" class="button" value="Не Вспомнила">
        </form>
    </div>`
  }
  else {
    q = `
      <div id="q" style="display: block;" class="card">   
          <a href="/${user.name}/" class="previous">&#8249;</a> 

        <input id="word" name="word" type="hidden" value="${word[0]}">
        <input id="v1" name="v1">
        <input id="v2" name="v2">
        <input id="v3" name="v3">
        <button class="button" onClick="flipAndCheck()">Проверить</button>

      <h2><p>${word[3]}</p></h2>
      </div>
      
      <div id="a" style="display: none;" class="card">
          <a href="/${user.name}/" class="previous">&#8249;</a>
      <form id="form" action="/${user.name}/practice" method="POST">
        <input id="word" name="word" type="hidden" value="${word[0]}">
        <input id="v1" name="v1_r" disabled>
        <input id="v2" name="v2_r" disabled>
        <input id="v3" name="v3_r" disabled>
        <input type="submit" class="button" value="ОК!">
      </form>
      <h2><p>${word[0]} <span>|</span> ${word[1]} <span>|</span> ${word[2]}</p></h2>
      <h2><p>${word[3]}</p></h2>
      </div>`
  }


  return `<html>
<head>
    <title>Practice verbs</title>
    <style>${style}</style>
</head>
<body>
    ${rating}
    ${q}
</div>
</body>

<script>
    function flip() {
        document.getElementById("q").style.display = "none";
        document.getElementById("a").style.display = "block";
    }

    function flipAndCheck() {
      flip();
      var v1 = document.getElementsByName("v1")[0].value;
      var v2 = document.getElementsByName("v2")[0].value;
      var v3 = document.getElementsByName("v3")[0].value;

      c1 = compareWords(v1, "${word[0]}");
      c2 = compareWords(v2, "${word[1]}");
      c3 = compareWords(v3, "${word[2]}");

      document.getElementsByName("v1_r")[0].value = v1;
      document.getElementsByName("v1_r")[0].style.color = c1 ? "black" : "red";

      document.getElementsByName("v2_r")[0].value = v2;
      document.getElementsByName("v2_r")[0].style.color = c2 ? "black" : "red";

      document.getElementsByName("v3_r")[0].value = v3;
      document.getElementsByName("v3_r")[0].style.color = c3 ? "black" : "red";

      if (c1 && c2 && c3)
        document.getElementById("form").method = "post";
      else document.getElementById("form").method = "get";
    }

    function compareWords(u, v) {
      u = u.toLowerCase();
      v = v.toLowerCase();
      
      var none = isNone(u) && isNone(v);
      if (none) return true;
      if (u === v) return true;
      
      split = v.split("/");
      if (split[0] && split[0] === u) return true;
      if (split[1] && split[1] === u) return true;
      if (split[2] && split[2] === u) return true;

      return false;
    }

    function isNone(str) {
      return str.length <= 1 && !str.match(/[a-z]/i);
    }
    
</script>

</html>`;
}