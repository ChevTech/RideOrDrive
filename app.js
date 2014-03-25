var express = require('express');
var app = express();

app.get('/', require('./routes/index'));

app.get('*', require('./routes/default'));



app.listen(8080);
console.log('Server is up.');

