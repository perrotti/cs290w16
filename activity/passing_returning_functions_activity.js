var arr = [1, 2, 3];
var arr1 = [2, 3, 4];
var arr2 = [7, 12, 81];

function forE(a, task) {
  var result = 0;
  for (var i = 0; i < a.length; i = i + 1) {
    result = task(a[i], result);
  }
  return result;
};

function sum(a, b) {
  return a + b;
};

function sub(a, b) {
  return a - b;
};

var test1 = forE(arr, sum); 
var test2 = forE(arr1, sum);
var test3 = forE(arr2, sum);
var test4 = forE(arr1, sub);

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);

function dialog(x) {
  return function speak(y) {
    return x + " says \"" + y + "\"";
  }
};

// Two differnet ways to accomplish this
var Mickey = {name: "Mickey Mouse"};
Mickey.speak = dialog(Mickey.name);
console.log(Mickey.speak("what uppppp"));

// Another way to accomplish this
var Doggy = {};
Doggy.speak = dialog("Shiloh 2");
console.log(Doggy.speak("I ruff you"));
    
    