# corn

Unicorn and multicorn. An experimental autocomplete/suggest implementation implemented in javascript and  
running as vertx verticals.  

A simple textfield is presented that when typed into will suggest completions based on a list of known words.
The resulting suggestions are simple rendered on the html document. No fancy HTML is implemented.  

The list of words always remains on the server; therfore one client can add to the list and then another  
can find the result.

## Live example.

> http://ec2-54-252-185-58.ap-southeast-2.compute.amazonaws.com/

> http://ec2-54-252-185-58.ap-southeast-2.compute.amazonaws.com/list



## Arch  
> [html ui] -> http request -> [verticle1] -> esb -> [verticle2] -> esb -> [vertical1] -> http response-> [html ui]  
    


## Runnable module with config  
 (note -cluster-host and conf.json IP addresses should match):

>  `vertx runzip org.etherware.vertx~corn~0.1.zip -cluster -cluster-host 192.168.5.30 -conf conf.json` 


## Urls:  

`List all items`
> http://192.168.5.30:8080/list

`Show the search page`
> http://192.168.5.30:8080 

`Search for items with prefix shaun`
> http://192.168.5.30:8080/search/shaun 

`Add an item`
> http://192.168.5.30:8080/add/new item  





