// Registration page: try to register
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    //Username and Password gets validated
    var username = request.session.username;
   
    //User Information
    var FromLocation    = request.body.FromLocation;
    var ToLocation      = request.body.ToLocation;
    var DepartureDay    = request.body.DepartureDay;
    var DepartureMonth  = request.body.DepartureMonth;
    var DepartureYear   = request.body.DepartureYear;
    var DepartureHour   = request.body.DepartureHour;
    var DepartureMinute = request.body.DepartureMinute;
    var ArrivalDate     = request.body.ArrivalDate;
    var ArrivalHour     = request.body.ArrivalHour;
    var ArrivalMinute   = request.body.ArrivalMinute;
    var Passengers      = request.body.Passengers;
    var SeatsAvailable  = request.body.SeatsAvailable;
    var Fare            = request.body.Fare;
    
    var typeOfPost = request.body.RideOrDriveOption;
    var DepartureDate = DepartureYear + "-" + DepartureMonth + "-" + DepartureDay;
    
    if (typeOfPost === "Rider"){
       posts.createRiderPost(username, FromLocation, ToLocation, DepartureDate, DepartureHour, DepartureMinute, ArrivalDate,
                     ArrivalHour, ArrivalMinute, Passengers, SeatsAvailable, Fare, function(success){
                        
                        if (success) {
                            console.log('A Post has been submitted'); //Callback from riderPosts -> createRiderPost function. Returns true if data inserted properly.
                            response.redirect('/');
                        }
                     });
    }else if (typeOfPost === "Driver") {
        posts.createDriverPost(username, FromLocation, ToLocation, DepartureDate, DepartureHour, DepartureMinute, ArrivalDate,
                     ArrivalHour, ArrivalMinute, Passengers, SeatsAvailable, Fare, function(success){
                        
                        if (success) {
                            console.log('A Post has been submitted'); //Callback from riderPosts -> createRiderPost function. Returns true if data inserted properly.
                            response.redirect('/');
                            
                            //NEED TO SUBMIT A FRIEDLY MESSAGE TO USER THAT POST IS SUCCESFULLY SUBMITTED.
                        }
                     });
    }
};