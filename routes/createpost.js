// Profile page: profile or redirect
var users = require('../models/users');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    users.getUserInformation(username, function(user){
        
        if (user) {            
            response.render('CreatePost', {user:user});
        }else{
            // Implement error if user info not found.
            response.redirect('/');
        }
    });
}