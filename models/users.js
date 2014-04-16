// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('db_RideOrDrive', ['UserInformation']);

// Register a new user
module.exports.create = function(username, password, confirmPassword,
                                 firstName, lastName, birthday, gender,
                                 phoneNumber, address, driverExperiance,
                                 email, aboutMe,  callback) {
    
    if (password != confirmPassword) {
        callback(false);
    }
    
    bcrypt.hash(password, 10, function(error,hash) {
        if (error) throw error;
        
        db.UserInformation.findAndModify({
            query: {username:username},
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
module.exports.retrieve = function(username, password, callback) {
    
    db.UserInformation.findOne({username:username}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            bcrypt.compare(password, user.Password, function(error, success) {
                if (error) throw error;
                callback(success);
            })
        }
    });
};

// Retrieve User Information for profile pages
module.exports.getUserInformation  = function(username, callback) {
    
    db.UserInformation.findOne({username:username}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }else{
            callback(user);
        }
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