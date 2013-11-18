#!/bin/bash


if [ -z $1 ]
then
 echo "use: multicorns.sh <IPAddress>"
 exit
fi


#vertx run unicorn.js -cluster -cluster-host 127.0.0.1 -cluster-port 61071
vertx run multicorn.js -cluster -cluster-host $1 -cluster-port 61072