// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
   
    //Username and Password gets validated
    var username = validator.escape(request.body.username);
    var password = validator.escape(request.body.password);
    var confirmPassword = validator.escape(request.body.confirm_password);
    
    //User Information
    var firstName = request.body.firstName;
    var lastName= request.body.lastName;
    var birthday = request.body.birthday;
    var gender = request.body.gender;
    var phoneNumber = request.body.phoneNumber;
    var address = request.body.phoneNumber;
    var driverExperiance = request.body.driverExperiace;
    var email = request.body.email;
    var aboutMe = request.body.aboutMe;
    
    users.create(name, password, confirmPassword, firstName, lastName, birthday, gender, phoneNumber, address, driverExperiance, email, aboutMe, function(success) {
        
        if (success) {
            request.session.username = name;
        }
        
        else {
            request.session.error = 'Username '+name+' is not available. Or password doesnt match';
        }
        
        response.redirect('/');
    });
};