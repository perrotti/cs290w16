function deepEqual(a, b) {
  // If both are null, return true
  if (a === null && b === null) {
    return true;
  // If only one is null, return false
  } else if (a === null || b === null) {
    return false;
  // Otherwise, continue to normal testing
  } else {
    // First test checks if the item is an object
    if (typeof(a) == "object" && typeof(b) == "object") {
      // If an object, compare all sub properties of a & b
      for (x in a && b) {
        var result = deepEqual(a[x], b[x]);
        return result;
      }
    // If it wasn't an object, need to do normal comparisons
    } else {
      // If the two items are equivalant, then return true, otherwise, false
      if (a === b) {
        return true;
      } else {
        return false;
      }
    }
  }
};

// Added additional test cases relavant to making sure the function worked
var obj = {here: {is: "an"}, object: 2};
var obj2 = {here: {is: "blue"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(null, null));
// → true
console.log(deepEqual(null, undefined));
// → false
console.log(deepEqual(obj, null));
// → false
console.log(deepEqual(obj, obj2));
// → false