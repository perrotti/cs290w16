function buildTable(data) {
  var htmlBody = document.body;
  var newTable = document.createElement("table");
  htmlBody.appendChild(newTable);
  var y = 0;
  for (key in data[0]) {
    var type;
    if (key == "name") {
      type = "th";
    } else {
      type = "td"; 
    }
    newTable.appendChild(document.createElement("tr"));
    for (var i = 0; i < data.length; i++) {
      var newE = document.createElement(type);
      newE.textContent = data[i][key];
      newE.style.backgroundColor = "red";
      if (typeof(data[i][key]) == typeof(25)) {
        newE.style.textAlign = "right";
      }
      newTable.children[y].appendChild(newE);
    }
    y++;
  }
}