// Tests for use cases at the index route
var users = require('../../models/users');
var zombie = require('zombie');
var browser = new zombie();

// Empty the database
exports['setup'] = function(test) {
    users.deleteAll(function() {
        test.done();
    });
};

exports['make an account (success)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:9090/', function() {
        
        //Check to see if the sign-up button is there
        test.ok(browser.query('#registerForm'));
        
        //Check to see if the sign-up button works and gets the registerForm
        browser.pressButton('#getRegisterForm', function() {
            test.ok(browser.query('registerForm'));
            console.log("got the the register form");
            
            //Test the registerForm        
            browser.
                fill('#f_username', 'username').
                fill('#f_password', 'password').
                fill('#f_confirmPassword', 'password').
                fill('#f_firstName', 'FirstName').
                fill('#f_lastName', 'LastName').
                fill('#f_phoneNumber', 'PhoneNumber').
                fill('#f_address', 'address').
                fill('#f_yearsOfDriverExperience', 'YearsOfDriverExperience').
                fill('#f_email', 'email').
                fill('#tb_about', 'about').  
                pressButton('#signUpButton', function() {
                    console.log("Register button pressed");
                    //test.ok(browser.query('#logout'));
                    test.ok(browser.query('#login'));
                    //browser.clickLink('#logout', function() {
                        //test.done();
               // });
                    test.done();
            });
        });
    });
}

/*
exports['make an account (failure)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#register'));
        
        browser.
            fill('#register_name', 'username').
            fill('#register_password', 'password').
            pressButton('#register_submit', function() {
                test.ok(browser.query('#error'));
                test.done();
            });
    });
}

*/

exports['log in (success)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:9090/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#username', 'username').
            fill('#password', 'password').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#logout'));
                browser.clickLink('#logout', function() {
                    test.done();
                });
            });
    });
}

/*
exports['log in (failure)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#login_name', 'badusername').
            fill('#login_password', 'badpassword').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#error'));
                test.done();
            });
    });
}*/

// Empty the database and close the connection
exports['cleanup'] = function(test) {
    users.deleteAll(function() {
        users.close(function() {
            test.done();
        });
    });
};