// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('db_RideOrDrive', ['UserInformation']);

// Register a new user
module.exports.create = function(name, password, confirmPassword,
                                 firstName, lastName, birthday, gender,
                                 phoneNumber, address, driverExperiance,
                                 email, aboutMe,  callback) {
    
    if (password != confirmPassword) {
        callback(false);
    }
    
    bcrypt.hash(password, 10, function(error,hash) {
        if (error) throw error;
        
        db.UserInformation .findAndModify({
            query: {name:name},
            update: {$setOnInsert:{Password:hash, FirstName:firstName, LastName:lastName,
                                    DateOfBirth:birthday, Gender:gender, Phone:phoneNumber, Address:address,
                                    DrivingExperianceYears:driverExperiance, Email:email, AboutMe:aboutMe}},
            new: true,
            upsert: true
            
        }, function(error, user) {
            if (error) throw error;
            callback(user.password == hash);
        });
    });
};

// Verify login credentials
module.exports.retrieve = function(name, password, callback) {
    
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            bcrypt.compare(password, user.password, function(error, success) {
                if (error) throw error;
                callback(success);
            })
        }
    });
};

// Delete all users
module.exports.deleteAll = function(callback) {
    db.users.remove({}, function(error) {
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