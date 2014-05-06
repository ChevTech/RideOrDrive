// Registration page: try to register
var posts = require('../models/posts');

module.exports = function(request,response) {
    
    //Username taken from cookie session
    var username = request.session.username;
   
    //To and From Location
    var FromAddress       = request.body.fromAddress;
    var FromCity          = request.body.fromCity;
    var FromState         = request.body.fromState;
    var ToAddress         = request.body.toAddress;
    var ToCity            = request.body.toCity;
    var ToState           = request.body.toState;
   
    //Departure Information
    var DepartureDay      = request.body.DepartureDay;
    var DepartureMonth    = request.body.DepartureMonth;
    var DepartureYear     = request.body.DepartureYear;
    var DepartureHour     = request.body.DepartureHour;
    var DepartureMinute   = request.body.DepartureMinute;
    var DepartureMeridian = request.body.DepartureMeridian;
    
    //Arrival Information
    var ArrivalDay     = request.body.ArrivalDay;
    var ArrivalMonth   = request.body.ArrivalMonth;
    var ArrivalYear    = request.body.ArrivalYear;
    var ArrivalHour     = request.body.ArrivalHour;
    var ArrivalMinute   = request.body.ArrivalMinute;
    var ArrivalMeridian = request.body.ArrivalMeridian;
    
    //Trip Information
    var Passengers      = request.body.Passengers;
    var SeatsAvailable  = request.body.SeatsAvailable;
    var Fare            = request.body.Fare;
    
    var typeOfPost    = request.body.RideOrDriveOption;
    var DepartureDate = DepartureYear + "-" + DepartureMonth + "-" + DepartureDay;
    var ArrivalDate   = ArrivalYear + "-" + ArrivalMonth + "-" + ArrivalDay;
    
    if (typeOfPost === "rider"){
       posts.createRiderPost(username, FromAddress, FromCity, FromState, ToAddress, ToCity, ToState, DepartureDate, DepartureHour, DepartureMinute, DepartureMeridian,
                             ArrivalDate, ArrivalHour, ArrivalMinute, ArrivalMeridian, Passengers, SeatsAvailable, Fare, function(success){
                        
                        if (success) {
                            console.log('A Post has been submitted'); //Callback from riderPosts -> createRiderPost function. Returns true if data inserted properly.
                            response.redirect('/');
                        }
                     });
    }else if (typeOfPost === "driver") {
        posts.createDriverPost(username, FromAddress, FromCity, FromState, ToAddress, ToCity, ToState, DepartureDate, DepartureHour, DepartureMinute, DepartureMeridian,
                             ArrivalDate, ArrivalHour, ArrivalMinute, ArrivalMeridian, Passengers, SeatsAvailable, Fare, function(success){
                        
                        if (success) {
                            console.log('A Post has been submitted'); //Callback from riderPosts -> createRiderPost function. Returns true if data inserted properly.
                            response.redirect('/');
                            
                            //NEED TO SUBMIT A FRIEDLY MESSAGE TO USER THAT POST IS SUCCESFULLY SUBMITTED.
                        }
                     });
    }
};