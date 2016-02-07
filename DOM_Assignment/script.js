
// Create a reference to the table body and append a table
var htmlBody = document.body;
var table = document.createElement("table");
table.style.border = "1px solid black";
htmlBody.appendChild(table);

// Variables that will be used for navigation later
var columnNum = 1;
var rowNum = 1;

/* This code creates the our buttons, and assigns IDs to all of them
 * before appending them to the html body, which should put them below 
 * the table body will be created soon. 
 */
// Array for holding names of buttons
var nameArray = ["up", "down", "left", "right", "mark-cell"];
for (var i = 0; i < nameArray.length; i++) {
  var button = document.createElement("button");
  // Assign id, text content, and a standard width
  button.id = nameArray[i];
  button.textContent = nameArray[i];
  if (i < nameArray.length - 1) {
    button.style.width = "54px";
  }
  htmlBody.appendChild(button);
}

/* This code creates table elements using two for loops.
 * On the first pass header elements are added, while on the
 * second pass data elements are passed. They all are assigned
 * id's, some text, and a basic 1px border before being appended 
 */
for (var i = 0; i < 4; i++) {
  // Outer loop creates and appends a new row
  var row = document.createElement("tr");
  table.appendChild(row);
  for (var y = 0; y < 4; y++) {
    // Inner loop checks if this is the first row
    if (i == 0) {
      // If the first row, create a new header element
      var header = document.createElement("th");
      header.id = "header-" + (y + 1);
      header.textContent = "Header " + (y + 1);
      header.style.border = "1px solid black";
      row.appendChild(header);
    } else {
      // All other rows should get standard data elements
      var cell = document.createElement("td");
      cell.id = (y+1) + "-" + i;
      cell.textContent = (y+1) + ", " + i;
      cell.style.border = "1px solid black";
      row.appendChild(cell);
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById(columnNum + "-" + rowNum).style.border = "3px solid black";
});


function upClicked(){
  // Make sure we are not at the first row of the table
  if (rowNum != 1) {
    document.getElementById(columnNum + "-" + rowNum).style.border = "1px solid black";
    rowNum--;
    document.getElementById(columnNum + "-" + rowNum).style.border = "3px solid black";
  } // Do nothing if at the first row of the table
}

function downClicked(){
  // Make sure we are not at the last row of the table
  if (rowNum != 3) {
    document.getElementById(columnNum + "-" + rowNum).style.border = "1px solid black";
    rowNum++;
    document.getElementById(columnNum + "-" + rowNum).style.border = "3px solid black";
  } // Do nothing if at the last row of the table
}

function leftClicked(){
  // Make sure we are not at the first column of the table
  if (columnNum != 1) {
    document.getElementById(columnNum + "-" + rowNum).style.border = "1px solid black";
    columnNum--;
    document.getElementById(columnNum + "-" + rowNum).style.border = "3px solid black";
  } // Do nothing if at the first column of the table
}

function rightClicked(){
  // Make sure we are not at the last column of the table
  if (columnNum != 4) {
    document.getElementById(columnNum + "-" + rowNum).style.border = "1px solid black";
    columnNum++;
    document.getElementById(columnNum + "-" + rowNum).style.border = "3px solid black";
  } // Do nothing if at the last column of the table
}

function markCellClicked(){
  // Set the current column/row to yellow
  document.getElementById(columnNum + "-" + rowNum).style.backgroundColor = "yellow";
}

// Add all of the event listeners for the website
document.getElementById("up").addEventListener("click", upClicked);
document.getElementById("down").addEventListener("click", downClicked);
document.getElementById("left").addEventListener("click", leftClicked);
document.getElementById("right").addEventListener("click", rightClicked);
document.getElementById("mark-cell").addEventListener("click", markCellClicked);