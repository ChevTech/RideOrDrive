// Profile page: profile or redirect
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    posts.retrieveRiderPosts(username, function(RiderPosts){
        posts.retrieveDriverPosts(username, function(DriverPosts){
            
            var currentRiderPosts  = [];
            var currentDriverPosts = [];
            var expiredRiderPosts  = [];
            var expiredDriverPosts = [];
    
            //Compute the current date
            var getDate = new Date();
            var currentYear  = getDate.getFullYear();
            var currentMonth = getDate.getMonth() + 1;
            var currentDay   = getDate.getDate();
   
   
            //Get the current rider posts
            RiderPosts.forEach(function(post) {
                if (currentYear <= post.Year && currentMonth <= post.Month && currentDay <= post.Day){
                        currentRiderPosts.push(post);   		
                    }else{
                        expiredRiderPosts.push(post);
                    }
            });
            
            //Get the current driver posts
            DriverPosts.forEach(function(post) {                
                if (currentYear <= post.Year && currentMonth <= post.Month && currentDay <= post.Day){
                        currentDriverPosts.push(post);   		
                    }else{
                        expiredDriverPosts.push(post);
                    }
            });
        
            response.render('ViewCurrentPosts', {currentRiderPosts:currentRiderPosts,
                                                currentDriverPosts:currentDriverPosts,
                                                expiredRiderPosts:expiredRiderPosts,
                                                expiredDriverPosts:expiredDriverPosts});
        });
    }); 
};
