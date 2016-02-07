var htmlBody = document.body;

for (var i = 0; i < 10; i++) {
    var newElem = document.createElement("div");
  newElem.textContent = "REDROVER";
  if (i % 2 == 0) {
    newElem.style.backgroundColor = "yellow";
  } else {
    newElem.style.backgroundColor = "blue";
  }
  htmlBody.appendChild(newElem);
}

var newTable = document.createElement("table");
htmlBody.appendChild(newTable);
for (var y = 0; y < 5; y++) {
  newTable.appendChild(document.createElement("tr"));
  for (var w = 0; w < 5; w++) {
    var newE = document.createElement("td");
    newE.style.backgroundColor = "red";
    newE.textContent = w + " " + y;
    newTable.children[y].appendChild(newE);
  }
}