var vertx = require('vertx');
var console = require('vertx/console');
var eb = require("vertx/event_bus");


eb.registerHandler('unicorn', function(word, f) {
        console.log('Received: ' + word);
        // Now reply to it
        var r = findMatches(structure, word);
        var rString = JSON.stringify(r);
        f(rString);
    });


  var root = {
      u: {
          _: [0, 1, 2],
          n: {
              _: [0, 1, 2],
              i: {
                  _: [0, 1, 2],
                  c: {              //#3
                      _: [1, 2],
                      o: {
                          _: [1],
                          r: {
                              _: [1],
                              n: {_: [1]}
                          }
                      },
                      r: {          //#7
                          _: [2],
                          o: {
                              _: [2],
                              n: {_: [2]}
                          }
                      }
                  }
              }
          }
      }
  };


  //$scope.word = "unicr";
  //sort and return array of words

var tids = [];
tids[0] = "uni";
tids[1] = "unicorn";
tids[2] = "unicron";
tids[3] = "shaun etherton";
tids[4] = "shaun gray";
tids[5] = "linda";
tids[6] = "linker";

tids.sort();

//console.log("unsorted tids");
sorted = tids;

var structure = {};
var n = structure;
var all = [];
var allIndex = 0;

for(var i=0; i<sorted.length; i++){
    var w = tids[i];
    //console.log('processing '+w);
    n = structure;
    var depth = 0;
    var boundry = 0;
    var value = "";
    var keyStack = [];
    
    //for chars in word
    for(var j=0; j<w.length; j++){
        var c = w.charAt(j);
        //console.log(allIndex+" "+c);
        value += c;
        
        var temp = n[c];
        if (temp != undefined) {
            n = temp;
            //console.log('n[c] '+JSON.stringify(temp));
            //console.log('n    '+JSON.stringify(n));
            
            keyStack[keyStack.length] = n;
            
            if (n.hasOwnProperty('value') && n['value'] && n['value'] == c ){
                boundry = 0;
            }else{
                boundry = 1;
            }
            
        }else{

            n[c]   = {};
            n[c]['_'] = [];
            //n[c]['charc'] = c;
            //n[c]['boundry'] = boundry;
            //n[c]['allIndex'] = allIndex;
            //n[c]['value'] = value;
            //n[c]['wordindex'] = i;
            //n[c]['value'] += c;
            all[allIndex] = n[c];
            keyStack[keyStack.length] = n[c];
            n = n[c];
            boundry = 0;
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
        //console.log('keystack[z] '+x);
        if (! has(a, i) ){
            //console.log('adding key '+i+ 'to '+x.charc);
            a.push(i);
        }
        
    }
    
}//end for words in list

//console.log('structure is : \n'+JSON.stringify(structure));
//console.log('root      is : \n'+JSON.stringify(root));
var tresult = (JSON.stringify(root) == JSON.stringify(structure));
console.log('root == structure is :'+tresult );

//search function to match a word in a structure
function findMatches(structure, word){
    console.log("Matching word: "+word);
    var node = structure;
    var _matches = [];
    for (var i = 0; i < word.length; i++) {
        var c = word.charAt(i);
        if (node[c] == null) {
            break;
        } else {
            console.log('traversing ' + c);
            _matches = node[c]._;
            node = node[c];
        }
    }
    //console.log(JSON.stringify(matches));
    var matches = [] ;
    for (var j = 0; j < _matches.length; j++) {
        console.log('matched: ' + tids[_matches[j]]);
        matches[j] = tids[_matches[j]];
    }
    return matches;
}

//search
findMatches(structure, 'uni');
findMatches(structure, 'unicr');
findMatches(structure, 'unicor');
findMatches(structure, 'shaun');
findMatches(structure, 'shaun e');
findMatches(structure, 'lin');
findMatches(structure, 'lind');



