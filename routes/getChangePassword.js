// Get the change password form
module.exports = function(request, response) {
    response.render('ChangePassword', {error:null, message:null});
};