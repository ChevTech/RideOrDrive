// Profile page: profile or redirect
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    posts.retrieveUserPosts(username, function(posts){
        
         var currentPosts = [];
    
   	 //Compute the current date
   	 var getDate = new Date();
	 var year  = getDate.getFullYear();
   	 var month = getDate.getMonth() + 1;
   	 var day   = getDate.getDate();
   	 var currentDate = year + "-" + month + "-" + day;

         RiderPosts.forEach(function(post) {
             if (currentDate <= post.DepartureDate){
                 currentPosts.push(post);   		
		}
       	});

	 response.render('ViewCurrentPosts', {currentPost:currentPost});
	});
};
