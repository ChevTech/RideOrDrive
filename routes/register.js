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
    var address = request.body.address;
    var driverExperiance = request.body.driverExperiance;
    var email = request.body.email;
    var aboutMe = request.body.aboutMe;
    
    var SessionUsername = request.session.username;
    
    if (SessionUsername) {
        console.log("person is logged in");
        users.update(SessionUsername, username, password, confirmPassword,
                 firstName, lastName, birthday,
                 gender, phoneNumber, address,
                 driverExperiance, email, aboutMe,
                 function(success) {
        
        console.log(password);
        if (success) {
            request.session.username = username;
        } else {
            //This Error always gets set. WHY??????
            request.session.error = 'Username '+username+' is not available. Or password doesnt match';
        }
            response.redirect('/');
        });
    }else{
        console.log("person is not logged in");
        users.create(username, password, confirmPassword,
                 firstName, lastName, birthday,
                 gender, phoneNumber, address,
                 driverExperiance, email, aboutMe,
                 function(success) {
        
        if (success) {
            request.session.username = username;
        } else {
            //This Error always gets set. WHY??????
            request.session.error = 'Username '+username+' is not available. Or password doesnt match';
        }
            response.redirect('/');
        });
    }
};