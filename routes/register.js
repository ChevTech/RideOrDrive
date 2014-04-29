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
    var birthday_day = request.body.birthday_day;
    var birthday_month = request.body.birthday_month;
    var birthday_year = request.body.birthday_year;
    var gender = request.body.gender;
    var phoneNumber = request.body.phoneNumber;
    var address = request.body.address;
    var driverExperience = request.body.driverExperience;
    var email = request.body.email;
    var aboutMe = request.body.AboutMe;
    
    
    //if the username already exists, then redirect the user back to the register form
    //otherwise, register his information and redirect him to the login page to login
    users.getUserInformation(username, function(user){
        
        if (user) {
	    
	    var datalist = {};
	    datalist.firstName = firstName;
	    datalist.lastName = lastName;
	    datalist.birthday_day = birthday_day;
	    datalist.birthday_month = birthday_month;
	    datalist.birthday_year = birthday_year;
	    datalist.gender = gender;
	    datalist.phoneNumber = phoneNumber;
	    datalist.address = address;
	    datalist.driverExperience = driverExperience;
	    datalist.email = email;
	    datalist.aboutMe = aboutMe;
	    
            response.render('RegisterFormError',{datalist:datalist});
        }else{
	    users.create(username, password, confirmPassword,
                 firstName, lastName, birthday_day, birthday_month, birthday_year,
                 gender, phoneNumber, address, driverExperience, email, aboutMe,
                 function(success) {
	            if (success) {
		        request.session.username = username;
		    }
		}
	    );
	    response.redirect('/');
        }
    });

};


    
//    var SessionUsername = request.session.username;
//    
//    
//    if (SessionUsername) {
//        console.log("person is logged in");
//        users.update(SessionUsername, firstName, lastName, birthday_day, birthday_month, birthday_year,
//                 gender, phoneNumber, address, driverExperiance, email, aboutMe,
//                 function(success) {
//                    
//        if (success) {
//            response.redirect('/');
//        }
//        //If error during profile information change. Print Error to screen.
//        });
//    }else{
//        console.log("person is not logged in");
//        users.create(username, password, confirmPassword,
//                 firstName, lastName, birthday_day, birthday_month, birthday_year,
//                 gender, phoneNumber, address, driverExperiance, email, aboutMe,
//                 function(success) {
//	            if (success) {
//		        request.session.username = username;
//		    } else {
//		        //This Error always gets set. WHY??????
//		        request.session.error = 'Username '+username+' is not available. Or password doesnt match';
//		    }
//	        response.redirect('/');
//        });
//    };