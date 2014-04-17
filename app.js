var express = require('express');

//Create a server
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(express.urlencoded({limit:'1kb'}));
app.use(express.static(__dirname+'/statics'));

// Enable sessions
app.use(express.cookieParser());
app.use(express.session({secret:'CS 340 3/6/2014'}));

// Route the requests
app.get('/', require('./routes/index'));
app.post('/login', require('./routes/login'));
app.post('/register', require('./routes/register'));

app.get('/getRegisterForm', require('./routes/getRegisterForm'));

app.get('/profile', require('./routes/profile'));
app.get('/logout', require('./routes/logout'));





// Default route
app.get('*', function(request,response) {
    response.send('Nothing to see here!');
});

// Start the server
app.listen(9090);
console.log('Server is up.');
