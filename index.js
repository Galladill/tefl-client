var express = require('express');
var app = express();
app.use(express.static('./'));
app.listen(1234);
console.log('Your front-end is being served on localhost:1234');
