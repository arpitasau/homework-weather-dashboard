$(document).ready(function(){
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var queryUrlForcast = "https://api.openweathermap.org/data/2.5/onecall?";
    var appID = "0a336261969aedd3330885cbe45f26cc";
    $(".btn").on("click", function(){
        var latitude, longitude;
       
        $("#error").text('');
        var city = $("#input-city").val();
        //console.log(city);
        if(city != ''){
            $.ajax({
                url : queryUrl + city + "&units=imperial" + "&APPID=" + appID,
                method : "GET",   
            }).then(function(response){
                console.log(response);
                $("#city-name").text(response.name);
                $("#temperature").text(response.main.temp);
                $("#wind-speed").text(response.wind.speed);
                $("#humidity").text(response.main.humidity);
                $("#description").text(response.weather[0].description);
                latitude = response.coord.lat;
                console.log(latitude);
                longitude = response.coord.lon;
                console.log(longitude);
            })
            
            $.ajax({
                url : queryUrlForcast + latitude + "&units=imperial" + "&APPID=" + appID,
                method : "GET",   
            }).then(function(response){
                console.log(response);
                
            })
//             https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
// exclude=hourly,daily&appid={YOUR API KEY}
            // $.ajax({
            //     url : "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + appID,
            //     method : "GET",   
            // }).then(function(response){
            //     console.log(response);
                
            // })
            
        }
        else{
            $("#error").text("Please enter a city name");
        }
     
    })




















})