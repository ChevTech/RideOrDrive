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

app.post('/login', require('./routes/login'));
app.post('/register', require('./routes/register'));
app.post('/changePassword', require('./routes/changePassword'));
app.post('/createPost', require('./routes/createPost'));
app.post('/editProfile', require('./routes/editProfile'));
app.post('/getSearchResults', require('./routes/getSearchResults'));
app.post('/connect', require('./routes/connect'));

app.get('/', require('./routes/index'));
app.get('/getRegisterForm', require('./routes/getRegisterForm'));
app.get('/getEditProfilePage', require('./routes/getEditProfilePage'));
app.get('/getCreatePost', require('./routes/getCreatePost'));
app.get('/getCurrentPosts', require('./routes/getCurrentPosts'));
app.get('/profile', require('./routes/profile'));
app.get('/logout', require('./routes/logout'));
app.get('/history', require('./routes/history'));
app.get('/notifications', require('./routes/notifications'));
app.get('/changePassword', require('./routes/getChangePassword'));
app.get('/getConnectionsPage', require('./routes/getConnectionsPage'));
app.get('/getRiderConnections',require('./routes/getRiderConnections'));
app.get('/getDriverConnections',require('./routes/getDriverConnections'));


// Default route
app.get('*', function(request,response) {
    response.send('Nothing to see here!');
});

// Start the server
app.listen(9090);
console.log('Server is up.');
