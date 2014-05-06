// Profile page: profile or redirect
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    posts.retrieveRiderPosts(username, function(RiderPosts){
        posts.retrieveDriverPosts(username, function(DriverPosts){
            
            var currentRiderPosts  = [];
            var currentDriverPosts = [];
    
            //Compute the current date
            var getDate = new Date();
            var year  = getDate.getFullYear();
            var month = getDate.getMonth() + 1;
            var day   = getDate.getDate();
            var currentDate = year + "-" + month + "-" + day;
   
            //Get the current rider posts
            RiderPosts.forEach(function(post) {
                if (currentDate <= post.DepartureDate){
                    currentRiderPosts.push(post);   		
                   }
            });
            
            //Get the current driver posts
            DriverPosts.forEach(function(post) {
                if (currentDate <= post.DepartureDate){
                    currentDriverPosts.push(post);   		
                   }
            });
   
            response.render('ViewCurrentPosts', {currentRiderPosts:currentRiderPosts, currentDriverPosts:currentDriverPosts});
        });
    }); 
};
