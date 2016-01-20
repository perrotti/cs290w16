console.log("Calling concat1 function now:");
result = concat1("Apple ", "pie");
console.log("Printing concat1 result: " + result);
console.log("Defining concat1 function now");
function concat1(x, y) {
	return x + y;
};

// This block of code will break unless concat2 is changed to concat 1.
// This is becuase var decleration of concat2 does not take place until after it is called
// To test the block of code above, change concat2 to concat1 so the program doesn't break
console.log("Calling concat2 function now:");
result = concat2("Banana ", "split");
console.log("Printing concat2 result: " + result);
console.log("Defining concat2 var as function now:");
var concat2 = function(x, y) {
	return x + y;
};

