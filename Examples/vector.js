// Your code here.
function Vector(x, y){
  this.x = x;
  this.y = y;
};

Vector.prototype = {
  plus: function(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  },
  minus: function(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  },
  get length() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
};

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5