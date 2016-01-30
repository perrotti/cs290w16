function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

// This type map houses the values of each auto type, so that they can be compared
var typeMap = {"ROADSTER": 4, "PICKUP": 3, "SUV": 2, "WAGON": 1};

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    // Create new array that will be sorted
    var newArray = array.slice();

    // Need two loops. First is the number of times we loop, second is the elements to loop through
    for (var i = 0; i < newArray.length; i++) {
        for (var y = 0; y < newArray.length - 1 - i; y++) {
            // The ! simply reversed the sorting polarity, so sorts greatest to least
            if(!comparator(newArray[y], newArray[y+1])) {
                var tmp = newArray[y+1];
                newArray[y+1] = newArray[y];
                newArray[y] = tmp;
            }
        }
    }
    return newArray;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year) {
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    if (auto1.make.toUpperCase() > auto2.make.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2){
    // Create variables set to 0 for sorting (zero being the lowest default value which is used if type not found)
    var oneValue = 0;
    var twoValue = 0; 

    // Assign each type to its numeric value, by checking to see if it is in the type map
    if (auto1.type.toUpperCase() in typeMap) {
        oneValue = typeMap[auto1.type.toUpperCase()];
    }
    if (auto2.type.toUpperCase() in typeMap) {
        twoValue = typeMap[auto2.type.toUpperCase()];
    }
 
    // If they are equivalant, compare on year. Otherwise, return true if auto1 is greater
    if (oneValue == twoValue) {
        return yearComparator(auto1, auto2);
    } else if (oneValue > twoValue) {
        return true;
    } else {
        return false;
    }
}

// Helper function that controls decisioning around if type needs to be printed. Used in logMe method
function typeDecision(typeNeeded, car) {
    if (typeNeeded == undefined || typeNeeded == null) {
        return "";
    } else if (typeNeeded) {
        return car.type;
    } else {
        return "";
    }
}

// This prototype adds logMe as a method for the Automobile type.
Automobile.prototype.logMe = function(typeNeeded) {
    // This method prints a string in a specified format
    console.log(this.year + " " + this.make + " " + this.model + " " + typeDecision(typeNeeded, this));
};

// Function that calls logMe for each element in an array
function printArr(array, typeNeeded) {
    array.forEach(function(value) {
        value.logMe(typeNeeded);
    });
}

// Sort all of the arrays
var yearSort = sortArr(yearComparator, automobiles);
var makeSort = sortArr(makeComparator, automobiles);
var typeSort = sortArr(typeComparator, automobiles);

// Prints the output according to specification. Calls the funcgions
console.log("*****");
console.log("The cars sorted by year are:");
printArr(yearSort, false);
console.log("\nThe cars sorted by make are:");
printArr(makeSort, false);
console.log("\nThe cars sorted by type are:");
printArr(typeSort, true);
console.log("*****");

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */