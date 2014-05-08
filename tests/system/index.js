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
    test.expect(3);
    
    browser.visit('http://localhost:9090/', function() {
        
        //Check to see if the login button is there
        test.ok(browser.query('#registerForm'));
        
        //Check to see if the sign-up button works and gets the registerForm
        browser.pressButton('#getRegisterForm', function() {
            test.ok(browser.query('#registerBox'));
            console.log("got the the register form");
            
            //Test the registerForm        
            browser.
                fill('#f_username', 'username').
                fill('#f_password', 'password').
                fill('#f_confirmPassword', 'password').
                fill('#f_firstName', 'firstName').
                fill('#f_lastName', 'lastName').
                pressButton('#signUpButton', function() {
                    console.log("Register button pressed");
                    test.ok(browser.query('#login'));
                    test.done();
            });
        });
    });
}

//Try to register a user that already exists
exports['make an account (failure)'] = function(test) {
    test.expect(3);
    
    browser.visit('http://localhost:9090/', function() {
        
        //Check to see if the login button is there
        test.ok(browser.query('#registerForm'));
        
        //Check to see if the sign-up button works and gets the registerForm
        browser.pressButton('#getRegisterForm', function() {
            test.ok(browser.query('#registerBox'));
            console.log("got the the register form");
            
            //Test the registerForm        
            browser.
                fill('#f_username', 'username').
                fill('#f_password', 'password').
                fill('#f_confirmPassword', 'password').
                fill('#f_firstName', 'firstName').
                fill('#f_lastName', 'lastName').
                pressButton('#signUpButton', function() {
                    console.log("Register button pressed");
                    test.ok(browser.query('#error'))
                    test.done();
            });
        });
    });
}

//Test to login and create a post
exports['log in (success) and create a post'] = function(test) {
    test.expect(4);
    
    browser.visit('http://localhost:9090/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#username', 'username').
            fill('#password', 'password').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#logout'));
                browser.clickLink('#createpost', function() {
                   test.ok(browser.query('#cp_Box'));
                   browser.
                        fill('#f_fromAddress', '23 Romoda Drive').
                        fill('#f_fromCity', 'Canton').
                        fill('#f_toAddress', '5401 Westbard Ave').
                        fill('#f_toCity', 'Bethesda').
                        pressButton('#submitPost', function(){
                            test.ok(browser.query('#searchBoxForm'));
                            browser.clickLink('#logout', function() {
                            test.done();
                    });
                });
            });
        });
    });
}

//Test to login and view posts
exports['log in (success) and view posts'] = function(test) {
    test.expect(3);
    
    browser.visit('http://localhost:9090/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#username', 'username').
            fill('#password', 'password').
            pressButton('#login_submit', function() {
                console.log("Logged In");
                test.ok(browser.query('#logout'));
                browser.clickLink('#getCurrentPosts', function() {
                    test.ok(browser.query('#cp'));
                    browser.clickLink('#logout', function() {
                        test.done();
                });
            });
        });
    });
}

//Test to login with bad credentials
exports['log in (failure)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:9090/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#username', 'badusername').
            fill('#password', 'badpassword').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#error'));
                test.done();
            });
    });
}

// Empty the database and close the connection
exports['cleanup'] = function(test) {
    users.deleteAll(function() {
        users.close(function() {
            test.done();
        });
    });
};