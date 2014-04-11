// Profile page: profile or redirect

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    if (username) {
        response.render('PersonalPage', {username:username});
    }
    
    else {
        response.redirect('/');
    }
};