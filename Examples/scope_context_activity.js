function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function(x, y) {
            return function () {
                console.log(x + ' ' + y);
            }
        }(item, list[i]));
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([2,4,6]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();