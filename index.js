var express = require('express');
var app = express();
app.use(express.static('./'));
var port = 1234;
app.listen(port);
console.log('Your front-end is being served on localhost:' + port);
