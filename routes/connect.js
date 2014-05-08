
//connects a user with another user who has made a post

var posts = require('../models/posts');

module.exports = function(request, response){
    
    //gets the user's name from the session; the user is responding to a post
    var responderUsername = request.session.username;
    
    //gets the post id that the user is responding to
    var postID = request.body.post_id;
    
    //gets the username of the person who made the post
    var username = request.body.post_username;
    
    var option = request.body.user_option;
    var responseMessage = request.body.user_message;
    
    posts.connect(option, postID, username, responderUsername, responseMessage, function(success){
        if (success){
            if (option === "driver"){
                response.redirect('/getRiderConnections');
            } else{
                response.redirect('/getDriverConnections');
            }
        }
    });
};
