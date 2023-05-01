
    var elements = document.getElementsByTagName("body")[0].getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
    if (elements[i].innerHTML.indexOf("seppe") !== -1) {
      var words = elements[i].innerHTML.split(" ");
    for (var j = 0; j < words.length; j++) {
        if (words[j] === "seppe") {
        words[j] = '<span class="word-seppe">seppe</span>';
        }
      }
    elements[i].innerHTML = words.join(" ");
    }
  }

