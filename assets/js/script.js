$("#display").hide();
$(document).ready(function(){
    var storedCity = [];
    var cityName = JSON.parse(localStorage.getItem("city"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (cityName !== null) {
    storedCity = cityName;
  }
    
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var queryUrlForcast = "http://api.openweathermap.org/data/2.5/onecall?lat=";
    $(".btn").on("click", function(){
        $("#error").text('');
        var city = $("#input-city").val().toUpperCase();
        $("#list").append("<button id='btn-city' >" +city+ "</button>");
        localStorage.setItem("cityName", JSON.stringify(city));
        storedCity.push(city);
        $("#input-city").value = "";
        console.log(city);
        //console.log(city);
        if(city != ''){
            $("#display").show();
            

            $.ajax({
                url : queryUrl + city + "&units=imperial" + "&APPID=" + appID,
                method : "GET",   
            }).then(function(response){
                console.log(response);
                $("#city-name").text(response.name + " " + moment().format("(MM/DD/YYYY)"));
                $("#temperature").text(response.main.temp + " " + "F");
                $("#wind-speed").text(response.wind.speed + " " + "MPH");
                $("#humidity").text(response.main.humidity + " " + "%");
                $("#description").text(response.weather[0].description);
                var latitude = response.coord.lat;
                console.log(latitude);
                var longitude = response.coord.lon;
                console.log(longitude);

                $.ajax({
                    url : queryUrlForcast + latitude + "&lon=" + longitude  + "&units=imperial" + "&APPID=" + appID,
                    method : "GET",   
                }).then(function(responsefc){
                    console.log(responsefc);
                    $("#uv").text(responsefc.current.uvi);
                    
                    $("#date1").text(moment().add(1,'day').format("MM/DD/YYYY"))
                    $("#date2").text(moment().add(2,'day').format("MM/DD/YYYY"))
                    $("#date3").text(moment().add(3,'day').format("MM/DD/YYYY"))
                    $("#date4").text(moment().add(4,'day').format("MM/DD/YYYY"))
                    $("#date5").text(moment().add(5,'day').format("MM/DD/YYYY"))
                    
                    $("#temp1").text(responsefc.daily[0].temp.day + " " + "F");
                    $("#temp2").text(responsefc.daily[1].temp.day + " " + "F");
                    $("#temp3").text(responsefc.daily[2].temp.day + " " + "F");
                    $("#temp4").text(responsefc.daily[3].temp.day + " " + "F");
                    $("#temp5").text(responsefc.daily[4].temp.day + " " + "F");

                    $("#hum1").text(responsefc.daily[0].humidity+ " " + "%");
                    $("#hum2").text(responsefc.daily[1].humidity + " " + "%");
                    $("#hum3").text(responsefc.daily[2].humidity+ " " + "%");
                    $("#hum4").text(responsefc.daily[3].humidity + " " + "%");
                    $("#hum5").text(responsefc.daily[4].humidity + " " + "%");

                    $("#img1").attr("src", "http://openweathermap.org/img/w/" + responsefc.daily[0].weather[0].icon + ".png")
                    $("#img2").attr("src", "http://openweathermap.org/img/w/" + responsefc.daily[1].weather[0].icon + ".png")
                    $("#img3").attr("src", "http://openweathermap.org/img/w/" + responsefc.daily[2].weather[0].icon + ".png")
                    $("#img4").attr("src", "http://openweathermap.org/img/w/" + responsefc.daily[3].weather[0].icon + ".png")
                    $("#img5").attr("src", "http://openweathermap.org/img/w/" + responsefc.daily[4].weather[0].icon + ".png")
                })
            })
            
        }
        else{
            $("#error").text("Please enter a city name");
        }
     
    })

})