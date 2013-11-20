/**
 * Created by shaun on 20/11/13.
 */

var container = require('vertx/container');
var console = require("vertx/console");
var vertx = require("vertx");

var config = container.config;

//var appConfig = vertx.config();
var appConfig = {
    
    unicornConfig:{
        numInstances:1
    },

    multicornConfig: {
        numInstances:1,
        host:'192.168.5.30',
        port: 8080
    }
};

appConfig = config || appConfig;

console.log('config is ' + JSON.stringify(appConfig));

container.deployVerticle("unicorn.js", appConfig.unicornConfig, appConfig.unicornConfig.numInstances);

var multicornTimerID = vertx.setTimer(1000, function(timerID) {
    container.deployVerticle("multicorn.js", appConfig.multicornConfig, appConfig.multicornConfig.numInstances);
    console.log("multicorn vertical deployed.");
});

console.log('multicornTimerID: '+multicornTimerID);

