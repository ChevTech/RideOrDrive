// A model for a visitor collection
var mongojs = require('mongojs');

// Access the database
var db = mongojs('db_RideOrDrive', ['RiderPosts']);

// Register a new user
module.exports.createRiderPost = function(username, FromLocation, ToLocation,
                                 DepartureDate, DepartureHour, DepartureMinute,
                                 ArrivalDate, ArrivalHour, ArrivalMinute,
                                 Passengers, SeatsAvailable, Fare, callback) {
    db.RiderPosts.findAndModify({
            query: {Username:username},
            update: {$setOnInsert:{FromLocation:FromLocation, ToLocation:ToLocation, DepartureDate:DepartureDate,
                                    DepartureHour:DepartureHour, DepartureMinute:DepartureMinute,
                                    ArrivalDate:ArrivalDate, ArrivalHour:ArrivalHour, ArrivalMinute:ArrivalMinute,
                                    Passengers:Passengers, SeatsAvailable:SeatsAvailable, Fare:Fare}},
            new: true,
            upsert: true
            
        }, function(error, user) {
            if (error) throw error;
            callback(true);
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