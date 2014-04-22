var users = require('../models/users');

// Edit Profile
module.exports = function(request, response) {
    
    var username = request.session.username;
    
    users.getUserInformation(username, function(user){
        
        if (user) {            
            response.render('EditProfile', {user:user});
        }else{
            // Implement error if user info not found.
            response.redirect('/');
        }
    });
};