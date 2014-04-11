// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
        response.render('PersonalPage', {username:username});
   }
   
   else {
        response.render('LoginPage', {error:request.session.error});
        delete request.session.error;
   }
};