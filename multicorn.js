var eb = require("vertx/event_bus");
var console = require("vertx/console");
var vertx = require("vertx");


/*
 * Send the url param value on the EB and disply the reply
 * eg) http://localhost:8080/?shaun
 * Sends: shaun
 */
console.log('Sending default message to unicorn.')
eb.send('unicorn', 'shaun' , function(r) {
        console.log("Matched: " + r);
    });
    

vertx.createHttpServer().requestHandler(function(request) {
        var word = request.uri();
        word = word.substring(2);
        eb.send('unicorn', word , function(r) {
                console.log("WebServer call matched: " + r);                
                request.response.end(r);
            });             
    }).listen(8080)
