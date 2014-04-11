// Logout page: un-authenticate and redirect

module.exports = function(request,response) {

    delete request.session.username;
    
    response.redirect('/');
};