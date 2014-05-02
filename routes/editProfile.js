//Edit Profile Page
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    //get the username from the session
    var username = request.session.username
    
    //gets the user information entered on the page
    var firstName = request.body.firstName;
    var lastName= request.body.lastName;
    var birthday_day = request.body.birthday_day;
    var birthday_month = request.body.birthday_month;
    var birthday_year = request.body.birthday_year;
    var gender = request.body.gender;
    var phoneNumber = request.body.phoneNumber;
    var address = request.body.address;
    var driverExperience = request.body.driverExperience;
    var email = request.body.email;
    var aboutMe = request.body.aboutMe;
    
    //updates the database
    users.update(username,firstName, lastName, birthday_day, birthday_month, birthday_year,
                 gender, phoneNumber, address, driverExperience, email, aboutMe,
                 function(success) {
                    if (success) {
                        response.redirect('/');
                    } else {
                        request.session.error = 'Username '+username+' is not available. Or password doesnt match';
                    }
    });
};