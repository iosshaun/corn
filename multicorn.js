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
                    console.log("WebServer call matched: " + r); 
                    var length = (""+r).length;
                    request.response.putHeader("Content-length", length);
                    request.response.putHeader("Access-Control-Allow-Origin", "*"); //xdom
                    request.response.write(""+r+"", "UTF-8");
                    request.response.end();                    
                }); 
                        
        }

    }).listen(8080)


