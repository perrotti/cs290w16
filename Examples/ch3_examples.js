// Your code here.
var min = function(x, y) {
    if (x >= y) {
      return y;
    } else {
      return x;
    }
};

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10