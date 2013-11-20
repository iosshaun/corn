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
        var added = add(word);
        if (added) build();        
        if (added) f("Added: "+word);
        else f("Word Exists: "+word);
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
tids[3] = "shaun etherton";
tids[4] = "shaun the sheep";
tids[5] = "lister";
tids[6] = "linker";
tids[7] = "abcdefghijklmnopqrs";
tids[8] = "abcdefghijklmnop";
tids[9] = "abcdefghijklm";
tids[10]= "abcdefghi";
tids[11]= "abcdef";
tids[12]= "abc";
tids[13]= "ab";
tids[14]= "a";

var structure;

function add(word){
    var sorted = tids;
    for(var i=0; i<sorted.length; i++){
        if (tids[i] == word) return false;
    }
    tids[tids.length] = word;
    return true;
}

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
            console.log('breaking at char: '+c);
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
        //if (m.length >= word.length)
        if (m.length >= word.length && m.charAt(word.length-1) == word.charAt(word.length-1) )
            //if (m.indexOf(word) == 0)
            matches.push(m);
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
findMatches(structure, 'li');
findMatches(structure, 'lis');
findMatches(structure, 'lin');



