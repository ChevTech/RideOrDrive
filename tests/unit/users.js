// Unit tests for the users collection
var users = require('../../models/users');
var posts = require('../../models/posts');

// Empty the database
exports['setup'] = function(test) {
    users.deleteAll(function() {
        test.done();
    });
};

// Test for Successful registration
exports['register a user'] = function(test) {
    test.expect(1);
    users.create('username', 'password', 'password',
                 'firstName', 'lastName', 'birthday_day', 'birthday_month',
                 'birthday_year', 'gender', 'phoneNumber', 'address', 'driverExperience',
                 'email', 'aboutMe', function(success) {
        test.ok(success);
        test.done();
    });
};

// Failed registration
exports['register a duplicate user'] = function(test) {
    test.expect(1);
    users.create('username', 'password', 'password',
                 'firstName', 'lastName', 'birthday_day', 'birthday_month',
                 'birthday_year', 'gender', 'phoneNumber', 'address', 'driverExperience',
                 'email', 'aboutMe', function(success) {
        test.ok(success);
        test.done();
    });
};

// Successful login
exports['login a user'] = function(test) {
    test.expect(1);
    users.retrieve('username', 'password', function(success) {
        test.ok(success);
        test.done();
    });
};

// Unsuccessful logins
exports['login with bad username'] = function(test) {
    test.expect(1);
    users.retrieve('badusername', 'password', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Try to login with bad password
exports['login with bad password'] = function(test) {
    test.expect(1);
    users.retrieve('username', 'badpassword', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Try to create a rider post
exports['create rider post'] = function(test) {
    test.expect(1);
    posts.createRiderPost('username', 'FromStreet', 'FromCity', 'FromState', 'ToStreet', 'ToCity', 'ToState', 'DepartureDate', 'DepartureHour', 'DepartureMinute', 'DepartureMeridian',
                            'Passengers', 'Fare', function(success){
        test.ok(success);
        test.done();
    });
};

// Try to create a driver post
exports['create driver post'] = function(test) {
    test.expect(1);
    posts.createDriverPost('username', 'FromStreet', 'FromCity', 'FromState', 'ToStreet', 'ToCity', 'ToState', 'DepartureDate', 'DepartureHour', 'DepartureMinute', 'DepartureMeridian',
                            'Passengers', 'SeatsAvailable', 'Fare', 'TravelTime', function(success){
        test.ok(success);
        test.done();
    });
};

// Empty the database and close the connection
exports['cleanup'] = function(test) {
    users.deleteAll(function() {
        users.close(function() {
            test.done();
        });
    });
};