//hiding the right side display on page load
$("#display").hide();

//to make sure that js will work once HTML is properly loaded
$(document).ready(function () {
    changeBackground();
    //getting the items from local storage
    var storedCity = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        var key = localStorage.key( i );
        if (key.includes("cityName_",0)) {
            storedCity.push( JSON.parse(localStorage.getItem(key) ));
        }
      }
    for ( var i = 0; i < storedCity.length; i++) {
        $("#list").append("<button class='btn-city' " + "data-index=" + i +" >" + storedCity[i] + "</button>");
    }  

    //declaring variables
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var queryUrlForcast = "http://api.openweathermap.org/data/2.5/onecall?lat=";
    var appID = "0a336261969aedd3330885cbe45f26cc";

    //adding event listener to search button
    $(".btn").on("click", function () {
        $("#error").text('');
        var city = $("#input-city").val().toUpperCase();
        if(!storedCity.includes(city, 0)) {
            $("#list").append("<button class='btn-city' >" + city + "</button>");
            localStorage.setItem("cityName"+"_"+city, JSON.stringify(city));
            storedCity.push(city);
        }
        if (city != '') {
            $("#display").show();


            $.ajax({
                url: queryUrl + city + "&units=imperial" + "&APPID=" + appID,
                method: "GET",
            }).then(function (response) {
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
                    url: queryUrlForcast + latitude + "&lon=" + longitude + "&units=imperial" + "&APPID=" + appID,
                    method: "GET",
                }).then(function (responsefc) {
                    console.log(responsefc);
                    $("#uv").text(responsefc.current.uvi);

                    $("#date1").text(moment().add(1, 'day').format("L"))
                    $("#date2").text(moment().add(2, 'day').format("L"))
                    $("#date3").text(moment().add(3, 'day').format("L"))
                    $("#date4").text(moment().add(4, 'day').format("L"))
                    $("#date5").text(moment().add(5, 'day').format("L"))

                    $("#temp1").text(responsefc.daily[0].temp.day + " " + "F");
                    $("#temp2").text(responsefc.daily[1].temp.day + " " + "F");
                    $("#temp3").text(responsefc.daily[2].temp.day + " " + "F");
                    $("#temp4").text(responsefc.daily[3].temp.day + " " + "F");
                    $("#temp5").text(responsefc.daily[4].temp.day + " " + "F");

                    $("#hum1").text(responsefc.daily[0].humidity + " " + "%");
                    $("#hum2").text(responsefc.daily[1].humidity + " " + "%");
                    $("#hum3").text(responsefc.daily[2].humidity + " " + "%");
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
        else {
            $("#error").text("Please enter a city name");
        }

    });

    $("body").on("click",".btn-city",function () {
        var buttonIndex = $(this).data('index');
        console.log(buttonIndex);
        //var newCity= $(".btn-city").get(buttonIndex).value;
        var newCity = "Aurora";
        console.log(newCity);

        $.ajax({
            url: queryUrl + newCity + "&units=imperial" + "&APPID=" + appID,
            method: "GET",
        }).then(function (response) {
            console.log(response);
        })
    
    });

});
// //depending on time back ground image will change
function changeBackground() {
    var thehours = new Date().getHours();

    if (thehours >= 0 && thehours < 17) {
        $("body").addClass("morning");

    } else if (thehours >= 17 && thehours < 24) {
        $("body").addClass("evening");
    }
};

