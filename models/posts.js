// A model for a visitor collection
var mongojs = require('mongojs');

// Access the database
var db_driver = mongojs('db_RideOrDrive', ['DriverPosts']);
var db_rider = mongojs('db_RideOrDrive', ['RiderPosts']);

// Register a new user
module.exports.createDriverPost = function(username, FromStreet, FromCity, FromState,
                                          ToStreet, ToCity, ToState, DepartureDay, DepartureMonth, DepartureYear, DepartureHour,
                                          DepartureMinute, DepartureMeridian, Passengers,
                                          SeatsAvailable, Fare, TravelTime, callback) {
   db_driver.DriverPosts.save({Username:username, FromStreet:FromStreet, FromCity:FromCity, FromState:FromState,
                              ToStreet:ToStreet, ToCity:ToCity, ToState:ToState, Day:DepartureDay, Month:DepartureMonth, Year:DepartureYear,
                              DepartureHour:DepartureHour, DepartureMinute:DepartureMinute, DepartureMeridian:DepartureMeridian,
                              Passengers:Passengers, SeatsAvailable:SeatsAvailable, Fare:Fare, TravelTime:TravelTime});
    callback(true);
};
    
//Create a Rider Post
module.exports.createRiderPost = function(username, FromStreet, FromCity, FromState,
                                          ToStreet, ToCity, ToState, DepartureDay, DepartureMonth, DepartureYear, DepartureHour,
                                          DepartureMinute, DepartureMeridian, Passengers, Fare, callback) {
    db_rider.RiderPosts.save({Username:username, FromStreet:FromStreet, FromCity:FromCity, FromState:FromState,
                              ToStreet:ToStreet, ToCity:ToCity, ToState:ToState, Day:DepartureDay, Month:DepartureMonth, Year:DepartureYear,
                              DepartureHour:DepartureHour, DepartureMinute:DepartureMinute, DepartureMeridian:DepartureMeridian,
                              Passengers:Passengers, Fare:Fare});
    callback(true);
};

//Function to retrieve Rider Posts
module.exports.retrieveRiderPosts = function(username, callback){
        db_rider.RiderPosts.find({Username:username}, function(error, posts) {
		if (error) throw error;
		callback(posts);
	});
};

//Function to retrieve Driver Posts
module.exports.retrieveDriverPosts = function(username, callback){
        db_driver.DriverPosts.find({Username:username}, function(error, posts) {
		if (error) throw error;
		callback(posts);
	});
};

// Delete all users
module.exports.deleteAll = function(callback) {
    db.UserInformation.remove({}, function(error) {
        if (error) throw error;
        callback();
    });
};

// Close the connection
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    });
}



//returns search results
module.exports.retrieveSearches = function(type, fromState, toState, day, month, year, callback){
        if(type === "rider"){
                db_rider.RiderPosts.find(
                        {$and:[{FromState:fromState}, {ToState:toState}, {Month:month}, {Year:year},
                                {Day:{$gt:day - 1}}, {Day:{$lt:day+1}}]},
                        function(error, posts){
                                if(error) throw error;
                                callback(posts);
                        });
        }
        else{
                db_driver.DriverPosts.find(
                         {$and:[{FromState:fromState}, {ToState:toState}, {Month:month}, {Year:year},
                                {Day:{$gt:day - 1}}, {Day:{$lt:day+1}}]},
                         function(error, posts){
                                if(error) throw error;
                                callback(posts);
                        });
        }
};
