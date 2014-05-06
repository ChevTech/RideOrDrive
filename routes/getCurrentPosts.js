// Profile page: profile or redirect
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    posts.retrieveUserPosts(username, function(posts){
        
        var currentPosts = [];
        
        posts.forEach(function(post) {
            if (currentDate <= post.DepartureDate)
                currentPosts.push(post);
        });
        
        response.render('ViewCurrentPosts', {currentPosts:currentPosts});
    });
};