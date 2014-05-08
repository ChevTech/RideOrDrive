var users = require('../models/users');

// Edit Profile
module.exports = function(request, response) {
    
    var username = request.session.username;
    
    //Get the user information
    users.getUserInformation(username, function(user){
        
        //Render the user's edit profile page
        if (user) {            
            response.render('EditProfile', {user:user});
        }else{
            response.redirect('/');
        }
    });
};