// Profile page: profile or redirect
var users = require('../models/users');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    //Get the user information
    users.getUserInformation(username, function(user){
        
        //Render user profile.
        if (user) {            
            response.render('ProfilePage', {user:user});
        }else{
            response.redirect('/');
        }
    });
}