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
            var currentYear  = getDate.getFullYear();
            var currentMonth = getDate.getMonth() + 1;
            var currentDay   = getDate.getDate();
   
   
            //Get the current rider posts
            RiderPosts.forEach(function(post) {
                var postDate  = post.DepartureDate.split("-");
                var postYear  = postDate[0];
                var postMonth = postDate[1];
                var postDay   = postDate[2];
                
                if (currentYear <= postYear && currentMonth <= postMonth && currentDay <= postDay){
                        currentRiderPosts.push(post);   		
                    }
            });
            
            //Get the current driver posts
            DriverPosts.forEach(function(post) {
                var postDate  = post.DepartureDate.split("-");
                var postYear  = postDate[0];
                var postMonth = postDate[1];
                var postDay   = postDate[2];
                
                if (currentYear <= postYear && currentMonth <= postMonth && currentDay <= postDay){
                        currentDriverPosts.push(post);   		
                    }
            });
        
            response.render('ViewCurrentPosts', {currentRiderPosts:currentRiderPosts, currentDriverPosts:currentDriverPosts});
        });
    }); 
};
