// A model for a visitor collection
var mongojs = require('mongojs');

// Access the database
var db = mongojs('db_RideOrDrive', ['RiderPosts']);

// Register a new user
module.exports.create =function(username, password, confirmPassword,
                                 firstName, lastName, birthday, gender,
                                 phoneNumber, address, driverExperiance,
                                 email, aboutMe,  callback) {

    bcrypt.hash(password, 10, function(error,hash) {
        if (error) throw error;
        
        db.UserInformation.findAndModify({
            query: {Username:username},
            update: {$setOnInsert:{Password:hash, FirstName:firstName, LastName:lastName,
                                    DateOfBirth:birthday, Gender:gender, Phone:phoneNumber, Address:address,
                                    DrivingExperianceYears:driverExperiance, Email:email, AboutMe:aboutMe}},
            new: true,
            upsert: true
            
        }, function(error, user) {
            if (error) throw error;
            callback(true);
        });
    });
};


// Update user information
module.exports.update = function(SearchCriteria, firstName, lastName, birthday, gender,
                                 phoneNumber, address, driverExperiance,
                                 email, aboutMe,  callback) {
    
    db.UserInformation.update({Username:SearchCriteria},{$set: {FirstName:firstName,LastName:lastName,DateOfBirth:birthday,
                                                                Gender:gender, Phone:phoneNumber, Address:address, DrivingExperianceYears:driverExperiance,
                                                                Email:email, AboutMe:aboutMe}});
    callback(true);
};

// Verify login credentials
module.exports.retrieve = function(username, password, callback) {
    
    db.UserInformation.findOne({Username:username}, function(error, user) {
        if (error) throw error;
        console.log(user);
        if (!user) {
            callback(false);
        }
        
        else {
            bcrypt.compare(password, user.Password, function(error, success) {
                if (error) throw error;
                callback(success);
                console.log(success);
            });
        }
    });
};

// Retrieve User Information for profile pages
module.exports.getUserInformation  = function(username, callback) {
    
    db.UserInformation.findOne({Username:username}, function(error, user) {
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