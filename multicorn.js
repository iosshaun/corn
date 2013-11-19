var eb = require("vertx/event_bus");
var console = require("vertx/console");
var vertx = require("vertx");

/*
 *
 * Send the url param value on the EB and disply the reply
 * eg) http://localhost:8080/?shaun
 * Sends: shaun
 *
 */

console.log('Sending default message to unicorn.')
eb.send('unicorn', 'shaun' , function(r) {
        console.log("Matched: " + r);
    });


var routeMatcher = new vertx.RouteMatcher();


routeMatcher.get("/list", function(req) {
        _handleList(req, true);
    });    

routeMatcher.get("/add/:word", function(req) {
        var word = req.params().get("word");
        word = decodeURI(word);        
        console.log('word is '+word);
        _handleAdd(req, word, true);
    });    

routeMatcher.get("/search/:word", function(req) {
        var word = req.params().get("word");
        word = decodeURI(word);        
        console.log('word is '+word);
        _handleSearch(req, word, true);
    });    

routeMatcher.optionsWithRegEx("/search/:word", function(req) {
        console.log('options route called.');
        _handleOptions(req, true);        
    });    

routeMatcher.noMatch(function(req) {
        req.response.end('Nothing matched');
    });


function _handleList(request,  end){
    console.log('_handleList called.');
    eb.send('unicornication', "lists all the items available - potentially huge!" , function(r) {
            console.log("unicornication service returned: " + r); 
            var length = (""+r).length;
            request.response.putHeader("Content-length", length);
            request.response.putHeader("Access-Control-Allow-Origin", "*"); //xdom
            request.response.write(""+r+"", "UTF-8");
            if (end == true)
                request.response.end();     
        });     
}


function _handleAdd(request, word, end){
    console.log('_handleAdd called.');
    eb.send('unicornholio', word , function(r) {
            console.log("unicornholio service returned: " + r); 
            var length = (""+r).length;
            request.response.putHeader("Content-length", length);
            request.response.putHeader("Access-Control-Allow-Origin", "*"); //xdom
            request.response.write(""+r+"", "UTF-8");
            if (end == true)
                request.response.end();     
        });     
}

function _handleSearch(request, word, end){
    console.log('_handleSearch called.');
    eb.send('unicorn', word , function(r) {
            console.log("unicorn service returned: " + r); 
            var length = (""+r).length;
            request.response.putHeader("Content-length", length);
            request.response.putHeader("Access-Control-Allow-Origin", "*"); //xdom
            request.response.write(""+r+"", "UTF-8");
            if (end == true)
                request.response.end();     
        });     
}


function _handleOptions(request, end){
    request.response.putHeader("Access-Control-Allow-Origin",      "*");
    request.response.putHeader("Access-Control-Allow-Methods",     "POST, GET, PUT, DELETE, OPTIONS");
    request.response.putHeader("Access-Control-Allow-Credentials", 'false');
    request.response.putHeader("Access-Control-Max-Age",           '86400'); // 24 hours
    request.response.putHeader("Access-Control-Allow-Headers",     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");            
    if (end == true)
        request.response.end("ok");    
}

vertx.createHttpServer().requestHandler(routeMatcher).listen(8080);


/*
vertx.createHttpServer().requestHandler(function(request) {

        if (request.method() === 'OPTIONS') {
            console.log('OPTIONS');          
  
            // xdom
            // IE8 does not allow domains to be specified, just the *
            // headers["Access-Control-Allow-Origin"] = req.headers.origin;
            request.response.putHeader("Access-Control-Allow-Origin",      "*");
            request.response.putHeader("Access-Control-Allow-Methods",     "POST, GET, PUT, DELETE, OPTIONS");
            request.response.putHeader("Access-Control-Allow-Credentials", 'false');
            request.response.putHeader("Access-Control-Max-Age",           '86400'); // 24 hours
            request.response.putHeader("Access-Control-Allow-Headers",     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");            
            request.response.end("ok");

        } else {
            console.log('GET');            

            var word = request.uri();
            word = word.substring(2);
            word = decodeURI(word);        
            eb.send('unicorn', word , function(r) {    
                    console.log("unicorn service returned: " + r); 
                    var length = (""+r).length;
                    request.response.putHeader("Content-length", length);
                    request.response.putHeader("Access-Control-Allow-Origin", "*"); //xdom
                    request.response.write(""+r+"", "UTF-8");
                    if (end == true)
                        request.response.end();     
                });
            
        }

    }).listen(8080)

*/
