// A model for a visitor collection
var mongojs = require('mongojs');

// Access the database
var db_driver = mongojs('db_RideOrDrive', ['DriverPosts']);
var db_rider = mongojs('db_RideOrDrive', ['RiderPosts']);

// Register a new user
module.exports.createDriverPost = function(username, FromAddress, FromCity, FromState,
                                          ToAddress, ToCity, ToState, DepartureDate, DepartureHour,
                                          DepartureMinute, DepartureMeridian, ArrivalDate, ArrivalHour, ArrivalMinute,
                                          ArrivalMeridian, Passengers, SeatsAvailable, Fare, callback) {
   db_driver.DriverPosts.save({Username:username, FromAddress:FromAddress, FromCity:FromCity, FromState:FromState,
                              ToAddress:ToAddress, ToCity:ToCity, ToState:ToState, DepartureDate:DepartureDate,
                              DepartureHour:DepartureHour, DepartureMinute:DepartureMinute, DepartureMeridian:DepartureMeridian,
                              ArrivalDate:ArrivalDate, ArrivalHour:ArrivalHour, ArrivalMinute:ArrivalMinute, ArrivalMeridian:ArrivalMeridian,
                              Passengers:Passengers, SeatsAvailable:SeatsAvailable, Fare:Fare});
    callback(true);
};
    
// Register a new user
module.exports.createRiderPost = function(username, FromAddress, FromCity, FromState,
                                          ToAddress, ToCity, ToState, DepartureDate, DepartureHour,
                                          DepartureMinute, DepartureMeridian, ArrivalDate, ArrivalHour, ArrivalMinute,
                                          ArrivalMeridian, Passengers, SeatsAvailable, Fare, callback) {
    db_rider.RiderPosts.save({Username:username, FromAddress:FromAddress, FromCity:FromCity, FromState:FromState,
                              ToAddress:ToAddress, ToCity:ToCity, ToState:ToState, DepartureDate:DepartureDate,
                              DepartureHour:DepartureHour, DepartureMinute:DepartureMinute, DepartureMeridian:DepartureMeridian,
                              ArrivalDate:ArrivalDate, ArrivalHour:ArrivalHour, ArrivalMinute:ArrivalMinute, ArrivalMeridian:ArrivalMeridian,
                              Passengers:Passengers, SeatsAvailable:SeatsAvailable, Fare:Fare});
    callback(true);
};


module.exports.retrieveUserPosts = function(username, callback){
        db_rider.RiderPosts.find({Username:username}, function(error, post) {
		if (error) throw error;
		callback(post);
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
