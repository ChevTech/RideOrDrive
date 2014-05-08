// This page gets the results based on a user's search
var posts = require('../models/posts');
var match = require('../modules/stringMatchModule');

module.exports = function(request, response){
    
    var username = request.session.username;
    console.log(request.body.lbl)
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
    var criteria = {sessionName:username, option:option,fromAddress:fromStreet,fromCity:fromCity,fromState:fromState,
                    toAddress:toStreet,toCity:toCity,toState:toState,
                    departureDay:day,departureMonth:month,departureYear:year,
                    departureHour:hour,departureMinute:minute,departureMeridian:meridian};
    
    //array that will contain all the relevant search results
    var searches = [];
    
    //retrieves the relevant searches
    posts.retrieveSearches(option, fromState, toState, day, month, year, function(posts){
        posts.forEach(function(post) {
            
            //checks if the cities entered by the user matches closely with any of the cities posted or not
            if (match.compareStrings(fromCity,post.FromCity) <= 0.3 && match.compareStrings(toCity,post.ToCity) <= 0.3){
                
                var fromScore = match.compareStrings(fromStreet, post.FromStreet);
                var toScore = match.compareStrings(toStreet, post.ToStreet);
                
                console.log(fromScore);
                console.log(toScore);
                
                //checks if the street address entered by the user matches closely with any of the address posted or not
                if (fromScore <= 0.3 && toScore <= 0.3){
                    
                    //assigns a score depending on how close to the searched day and time the post is
                    var dayScore = Math.abs(day - post.Day);
                    
                    if (dayScore <= 1){
                        var timeScore = Math.abs(match.timeConverter(hour, minute, meridian) - match.timeConverter(post.DepartureHour, post.DepartureMinute,
                                                                                                               post.DepartureMeridian));
                        
                        //calculates a total score based on the departure location, destination, day and time matches
                        var totalScore = fromScore + toScore + dayScore + timeScore;
                    
                        searches.push(post)
                    }
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
            
        response.render('ViewSearchResults', {criteria:criteria,searches:searches});
    });

};