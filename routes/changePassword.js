// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
   
    //Username and Password gets validated
    var username = validator.escape(request.body.username);
    var password = validator.escape(request.body.password);
    var newPassword = validator.escape(request.body.newPassword);
    var confirmPassword = validator.escape(request.body.confirmPassword);
    
    if (newPassword !== confirmPassword) {
        response.render('ChangePassword', {error:"Passwords do not match."});
    }else{
        users.updatePassword(username, password, newPassword,
                             
        function(success) {    
            if (success) {
                response.render('LoginPage', {error:"Password Changed Successfully."});
            }else{
                response.render('ChangePassword', {error:"Incorrect Old Password or Account not Found."});
            }
        });
    };
};