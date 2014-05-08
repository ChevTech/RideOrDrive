// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    //get the username and password submitted by the login form
    var username = validator.escape(request.body.username);
    var password = validator.escape(request.body.password);
    
    //Look-up the username and password in the database
    users.retrieve(username, password, function(success) {
        //If the credentials are good set the username in a session cookie.
        if (success) {
            request.session.username = username;
        }
        else {
            request.session.error = "Wrong username or password.";
        }
        
        response.redirect('/');
    });
};