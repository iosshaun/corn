corn
====

 Unicorn and multicorn. Experimental autocomplete implementation running as a trivial vertx vertical.

Runnable module with config (note -cluster-host and conf.json IP addresses should match):

  `vertx runzip org.etherware.vertx~corn~0.1.zip -cluster -cluster-host 192.168.5.30 -conf conf.json` 


    OR   
       


Run raw veticles, using the same ip address:

First run to start the indexer: 

  `unicorns.sh ip_address`

Then in another terminal run to start the web server: 

  `multicorns.sh ip_address`


Relevant urls:  

`List all items`
http://192.168.5.30:8080/list  `

`Show the search page`
http://192.168.5.30:8080  `

`Search for items with prefix shaun`
http://192.168.5.30:8080/search/shaun  `

`Add an item`
http://192.168.5.30:8080/add/new%20item  `





