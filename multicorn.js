var eb = require("vertx/event_bus");
var console = require("vertx/console");
var vertx = require("vertx");

//todo from config.
/* web server host */
var host = '192.168.5.30';
var port = 8080;



/*
 * pseudo test to make sure things are working as expected.
 * Send the url param value on the EB and disply the reply
 * Sends: shaun
 */
console.log('Sending default message to unicorn.')
eb.send('unicorn', 'shaun' , function(r) {
        console.log("Matched: " + r);
    });


/* 
 * Router and routes
 */
var routeMatcher = new vertx.RouteMatcher();


/* 
 * Render the html page
 */
routeMatcher.get("/", function(req) {
        _handleSite(req);
    });    


/* 
 * List all the items
 */
routeMatcher.get("/list", function(req) {
        _handleList(req, true);
    });    

/* 
 * Add a new item
 */
routeMatcher.get("/add/:word", function(req) {
        var word = req.params().get("word");
        word = decodeURI(word);        
        console.log('word is '+word);
        _handleAdd(req, word, true);
    });    

/* 
 * Search for items matching the prefix :word
 */
routeMatcher.get("/search/:word", function(req) {
        var word = req.params().get("word");
        word = decodeURI(word);        
        console.log('word is '+word);
        _handleSearch(req, word, true);
    });    

/* 
 * Options
 */
//routeMatcher.optionsWithRegEx("/search/:word", function(req) {
routeMatcher.optionsWithRegEx('/.+', function(req) {
        console.log('options route called.');
        _handleOptions(req, true);        
    });    

/* 
 * nothing matches 
 */
routeMatcher.noMatch(function(req) {
        req.response.end('No route.');
    });


/* 
 * Implementation functions 
 */
function _handleSite(request){
    console.log('_handleSite called.');
    request.response.sendFile('unicorns.html'); 
}

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

/* 
 * Start the server listing on the specified host 
 */
vertx.createHttpServer().requestHandler(routeMatcher).listen(port, host);

console.log(host+":"+port);