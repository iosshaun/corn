var vertx = require('vertx');
var console = require('vertx/console');
var eb = require("vertx/event_bus");


eb.registerHandler('unicornication', function(word, f) {
        console.log('Received: ' + word);
        var r = list();
        f(r);
    });


eb.registerHandler('unicornholio', function(word, f) {
        console.log('Received: ' + word);
        // Now reply to it
        tids[tids.length] = word;
        build();        
        f("Added: "+word);
    });


eb.registerHandler('unicorn', function(word, f) {
        console.log('Received: ' + word);
        // Now reply to it
        var r = findMatches(structure, word);
        var rString = JSON.stringify(r);
        f(rString);
    });

var tids = [];
tids[0] = "uni";
tids[1] = "unicorn";
tids[2] = "unicron";
tids[3] = "shaun ethe";
tids[4] = "shaun gray";
tids[5] = "linda";
tids[6] = "linker";
var structure;

function list(){
    tids.sort();
    var sorted = tids;
    var r = "";
    for(var i=0; i<sorted.length; i++){
       r += tids[i]+"\n";
    }
    return r;
}

function build(){
    structure = {};
    tids.sort();
    var sorted = tids;
    
    var n = structure;
    var all = [];
    var allIndex = 0;
    
    for(var i=0; i<sorted.length; i++){
        var w = tids[i];
        n = structure;
        var keyStack = [];    
        //for chars in word
        for(var j=0; j<w.length; j++){
            var c = w.charAt(j);
            var temp = n[c];
            if (temp != undefined) {
                n = temp;
                keyStack[keyStack.length] = n;
            }else{
                n[c]   = {};
                n[c]['_'] = [];
                all[allIndex] = n[c];
                keyStack[keyStack.length] = n[c];
                n = n[c];
                allIndex++;            
            }//end else        
        }//end for chars in word
        //backfill keys for word.
        //console.log('keystack length '+keyStack.length);    
        function has(a, i){
            for (var zx=0; zx<a.length; zx++){
                if (a[zx] == i ){
                    return true;
                }
                return false;
            }
        }
        
        for (var z=0; z<keyStack.length; z++){
            var x = keyStack[z];
            var a = x._;
            if (! has(a, i) ){
                a.push(i);
            }        
        }    
    }//end for words in list

}//end build
    
    //search function to match a word in a structure
function findMatches(structure, word){
    var node = structure;
    var _matches = [];
    for (var i = 0; i < word.length; i++) {
        var c = word.charAt(i);
        if (node[c] == null || node[c] == undefined) {
            break;
        } else {
            _matches = node[c]._;
            node = node[c];
        }
    }
    var matches = [] ;
    for (var j = 0; j < _matches.length; j++) {
        var m = tids[_matches[j]];
        console.log('matched: ' + m);
        if (m.length >= word.length)
            matches[j] = m;
    }
    return matches;
}

//build a structure.
build();

//quick test.
findMatches(structure, 'uni');
findMatches(structure, 'unicr');
findMatches(structure, 'unicor');
findMatches(structure, 'shaun');
findMatches(structure, 'shaun e');
findMatches(structure, 'lin');
findMatches(structure, 'lind');



