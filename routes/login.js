// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var username = validator.escape(request.body.username);
    var password = validator.escape(request.body.password);
    
    users.retrieve(username, password, function(success) {
        
        if (success) {
            request.session.username = username;
        }
        else {
            request.session.error = "Wrong username or password.";
        }
        
        response.redirect('/');
    });
};