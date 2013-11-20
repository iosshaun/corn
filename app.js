/**
 * Created by shaun on 20/11/13.
 */

var container = require('vertx/container');
var console = require("vertx/console");
var vertx = require("vertx");

//var appConfig = vertx.config();
var appConfig = {
    
    unicornConfig:{
        numInstances:1
    },

    multicornConfig: {
        numInstances:1
    }
}

container.deployVerticle("unicorn.js", appConfig.unicornConfig, appConfig.unicornConfig.numInstances);

var multicornTimerID = vertx.setTimer(1000, function(timerID) {
    container.deployVerticle("multicorn.js", appConfig.multicornConfig, appConfig.multicornConfig.numInstances);
    console.log("multicorn vertical deployed.");
});

console.log('multicornTimerID: '+multicornTimerID);

