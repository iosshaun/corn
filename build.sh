#!/bin/bash

v="0.1"
n="org.etherware.vertx"
m="corn"
z="${n}~${m}~${v}.zip"


echo "creating module zip file $z"

zip ${z} app.js mod.json multicorn.js unicorn.js unicorns.html README.md

echo "done"
