// Your code here for creating lists
var arrayToList = function(arr) {
  var list;
  if (arr.length < 1) {
   	return null; 
  }
  list = {value: arr[arr.length - 1], node: null}; 
  for (var i = arr.length - 2; i >= 0; i--) {
    list = {value: arr[i], node: list}; 
  }
  return list;
};

var listToArray = function(list) {
  var arr = [];
  do {
    arr.push(list.value);
    if(list.node == null) {
      return arr;
    }
    
    list = list.node;
  } while(true);
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
//console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
//console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20