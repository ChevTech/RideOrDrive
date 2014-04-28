// Profile page: profile or redirect
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    posts.retrieveUserPosts(username, function(posts){
        
        var currentPosts = [];
        var getDate = new Date();
        var currentDate = getDate.getFullYear + "-" + getDate.getMonth + "-" + getDate.getDate;
        
        posts.forEach(function(post) {
            console.log(post.DepartureDate);
            console.log(currentDate);
        });
    });
};