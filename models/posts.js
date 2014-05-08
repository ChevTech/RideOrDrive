// A model for a visitor collection
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;

// Access the database
var db_driver = mongojs('db_RideOrDrive', ['DriverPosts']);
var db_rider = mongojs('db_RideOrDrive', ['RiderPosts']);

var db_driverConnection = mongojs('db_RideOrDrive', ['DriverPostConnection']);
var db_riderConnection = mongojs('db_RideOrDrive', ['RiderPostConnection']);


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
        
        //if the search is for a drive, then looks for rider posts
        if(type === "driver"){
                db_rider.RiderPosts.find(
                        {$and:[{FromState:fromState}, {ToState:toState}, {Month:month}, {Year:year}]},
                        function(error, posts){
                                if(error) throw error;
                                callback(posts);
                        });
        }
        //if the search is for a ride, then looks for driver posts
        else{
                db_driver.DriverPosts.find(
                         {$and:[{FromState:fromState}, {ToState:toState}, {Month:month}, {Year:year}]},
                         function(error, posts){
                                if(error) throw error;
                                callback(posts);
                        });
        }
};


//creates a connection between two users
module.exports.connect = function(type, postID, username, responderUsername, responseMessage, callback){
        
        //if the connection is happening on a riding post
        if(type === "driver"){
                db_riderConnection.RiderPostConnection.insert({RiderPostID:postID, Username:username,
                                                    ResponderUsername:responderUsername, ResponseMessage:responseMessage});
                callback(true);
        }
        //if the connection is happening on a driving post
        else{
                db_driverConnection.DriverPostConnection.insert({DriverPostID:postID, Username:username,
                                                      ResponderUsername: responderUsername, ResponseMessage:responseMessage});
                callback(true);
        }
};


//gets data for all the driver connections that the user has made
module.exports.getDriverConnections = function(username, callback){
        db_driverConnection.DriverPostConnection.find({$or:[{Username:username},{ResponderUsername:username}]}, function(error, posts) {
		if (error) throw error;
		callback(posts);
	});
};


//gets data for all the rider connections that the user has made
module.exports.getRiderConnections = function(username, callback){
        db_riderConnection.RiderPostConnection.find({$or:[{Username:username},{ResponderUsername:username}]}, function(error, posts){
                if (error) throw error;
                callback(posts);
        });
};


//gets data of a post given the id of the post
module.exports.getUserInformationById = function(option, id, callback){
        
        //if it is a rider post
        if (option === "rider"){
                db_rider.RiderPosts.find({_id: ObjectId(id)}, function(error, posts){
                        if (error) throw error;
                        callback(posts);
                });
        }
        //if it is a driver post
        else{
                db_driver.DriverPosts.find({_id: ObjectId(id)}, function(error, posts){
                        if (error) throw error;
                        callback(posts);
                });
        }
};