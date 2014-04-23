// Registration page: try to register
var riderPosts = require('../models/riderPosts');

module.exports = function(request,response) {
   
    //Username and Password gets validated
    var username = request.session.username;
   
    //User Information
    var FromLocation = request.body.FromLocation;
    var ToLocation = request.body.ToLocation;
    var DepartureDate = request.body.DepartureDate;
    var DepartureHour = request.body.DepartureHour;
    var DepartureMinute = request.body.DepartureMinute;
    var ArrivalDate = request.body.ArrivalDate;
    var ArrivalHour = request.body.ArrivalHour;
    var ArrivalMinute = request.body.ArrivalMinute;
    var Passengers = request.body.Passengers;
    var SeatsAvailable = request.body.SeatsAvailable;
    var Fare = request.body.Fare;
    
    riderPosts.createRiderPost(username, FromLocation, ToLocation, DepartureDate, DepartureHour, DepartureMinute, ArrivalDate,
                     ArrivalHour, ArrivalMinute, Passengers, SeatsAvailable, Fare, function(success){
                        console.log(success); //Callback from riderPosts -> createRiderPost function. Returns true if data inserted properly.
                     });
};