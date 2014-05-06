// This page gets the results based on a user's search
var posts = require('../models/posts');
var match = require('../modules/stringMatchModule');

module.exports = function(request, response){
    
    var username = session.request.username;
    
    //get all the information from the page
    var option = request.body.RideOrDriveOption;

    var fromStreet = request.body.fromAddress;
    var fromCity = request.body.fromCity;
    var fromState = request.body.fromState;
    
    var toStreet = request.body.toAddress;
    var toCity = request.body.toCity;
    var toState = request.body.toState;
    
    var day = request.body.DepartureDay;
    var month = request.body.DepartureMonth;
    var year = request.body.DepartureYear;
    var hour = request.body.DepartureHour;
    var minute = request.body.DepartureMinute;
    var meridian = request.body.DepartureMeridian;
    
    //a dictionary to pass in the values to the next page
    var criteria = {option:option,fromAddress:fromStreet,fromCity:fromCity,fromState:fromState,
                    toAddress:toStreet,toCity:toCity,toState:toState,
                    departureDay:day,departureMonth:month,departureYear:year,
                    departureHour:hour,departureMinute:minute,departureMeridian:meridian};
    
    //array that will contain all the relevant search results
    var searches = [];
    
    //retrieves the relevant searches
    posts.retrieveSearches(option, function(posts){
        posts.forEach(function(post) {
            
            //checks if the cities entered by the user matches closely with any of the cities posted or not
            if (match.compareStrings(fromCity,post.FromCity) <= 0.2 && match.compareStrings(toCity,post.ToCity) <= 0.2){
                
                var fromScore = match.compareStrings(fromStreet, post.FromStreet);
                var toScore = match.compareStrings(toStreet, post.ToStreet);
                
                //checks if the street address entered by the user matches closely with any of the address posted or not
                if (fromScore <= 0.2 && toScore <= 0.3){
                    
                    //assigns a score depending on how close to the searched day and time the post is
                    var dayScore = Math.abs(day - post.Day);
                    var timeScore = Math.abs(match.timeConverter(hour, minute, meridian) - match.timeConverter(post.Hour, post.Minute, post.Meridian));
                    
                    //calculates a total score based on the departure location, destination, day and time matches
                    var totalScore = fromScore + toScore + dayScore + timeScore;
                    var result = {score:totalScore,post:post};
                    
                    searches.push(result);
                }
            }
        });
        
        //Sorts the search results in ascending order based on the score.
        searches.sort(function (a, b) {
            if (a.score > b.score)
              return 1;
            if (a.score < b.score)
              return -1;
            // a must be equal to b
            return 0;
        });
        
        var data = {criteria:criteria,searches:searches}
        
        response.render('ViewSearchResults', {data:data});
    });

};