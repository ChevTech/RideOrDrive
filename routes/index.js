// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
        //if the username is in the session cookie then the user's credentials have been verified. Allow the user to login.
        response.render('PersonalPage', {username:username});
   } else {
        //User's cridentials are bad, return them to login page.
        response.render('LoginPage', {error:request.session.error});
        delete request.session.error;
   }
};