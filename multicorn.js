var container = require('vertx/container');
var eb = require("vertx/event_bus");
var console = require("vertx/console");
var vertx = require("vertx");

    
console.log('sending message to unicorn')
eb.send('unicorn', 'shaun' , function(r) {
        console.log("Matched: " + r);
    });
    

vertx.createHttpServer().requestHandler(function(request) {
        var word = request.uri();
        word = word.substring(2);
        console.log("word = "+word);

        //console.log("headers" +request.headers() );

        var str = "";
        // Get headers from the HttpServerRequest object
        // and write them to the console
        var headers = request.headers();
        headers.forEach(function (k,v) {
                str+=k + ": " + v;
            });
        console.log(str);
  

        eb.send('unicorn', word , function(r) {
                console.log("WebServer call Matched: " + r);                
                request.response.end(r);
            });

      
        
    }).listen(8080)

  
/*

*/