console.log('openweather.js')

$(function(){
 
    //Global variable for weather icons
    var weatherIcons = {
        '01d': 'wi-day-sunny',
        '02d': 'wi-day-cloudy',
        '03d': 'wi-cloud',
        '04d': 'wi-cloudy',
        '09d': 'wi-day-showers',
        '10d': 'wi-day-rain',
        '11d': 'wi-day-thunderstorm',
        '13d': 'wi-day-snow',
        '50d': 'wi-day-fog',
        '01n': 'wi-night-clear',
        '02n': 'wi-night-cloudy',
        '03n': 'wi-cloud',
        '04n': 'wi-cloudy',
        '09n': 'wi-night-alt-showers',
        '10n': 'wi-night-alt-rain',
        '11n': 'wi-night-alt-thunderstorm',
        '13n': 'wi-night-alt-snow',
        '50n': 'wi-night-fog'
    };

    //Global variable for the API key, taken from https://openweathermap.org/
    var APIKey = '3bce2d04045dd38cbdadc38a931790ac';
    
    //Global variables for the searched zip code and city
    var zipcodeWeather;
    var cityWeather;
    
    //On-click function to pull zip code and city from the search input and search API for information
    $('#searchWeather').click(function (){
        
        zipcodeWeather = $('#zipcodeWeather').val();
        $('#zipcodeWeather').val('');

        cityWeather = $('#cityWeather').val();
        $('#cityWeather').val('');
        searchOpenWeatherAPI ();
    
    });
    
    
    //Function to search API based on the zip code and return information
    function searchOpenWeatherAPI () {
              
        //Variables to for URLs that use the API keys, there's one for daily weather and another for five day forecast for every three hours
        var queryURLforecast = 'http://api.openweathermap.org/data/2.5/forecast?zip=' + zipcodeWeather + '&q=' + cityWeather+ '&appid=' + APIKey; 
        var queryURLweather = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcodeWeather + '&q=' + cityWeather+ '&appid=' + APIKey;     

        $.ajax({
            type: "GET",
            url: queryURLweather,
            success: function(currentResponse) {
                createCurrentWeatherElements(currentResponse);
            },
            error: function(xhr, status, err) {
                console.log('Error with SearchOpenWeatherAPI ' + err);
            }
        });

        $.ajax({
            type: "GET",
            url: queryURLforecast,
            success: function(forecastResponse) {
                createForecastWeatherElements(forecastResponse);
                console.log(forecastResponse);
            },
            error: function(xhr, status, err) {
                console.log('Error with SearchOpenWeatherAPI ' + err);
            }
        });
           
    }; 

    //Function to pull information for the current weather and print to html
    function  createCurrentWeatherElements(currentResponse) {

        //Empties html at the currentWeather id location
        $('#current').empty();
        $('#cityName').empty();

        //Variables for the infromation pulled from the API
        var currentWeatherCity = currentResponse.name || 'N/A';
        var currentWeatherZipcode = zipcodeWeather || 'N/A';
        var currentWeatherDay = moment.unix(currentResponse.dt).format("dddd") || 'N/A';
        var currentWeatherDate = moment.unix(currentResponse.dt).format("MM/DD/YY") || 'N/A';
        var currentWeatherTime = moment.unix(currentResponse.dt).format('LT') || 'N/A';
        var currentWeatherTempHigh = Math.round(currentResponse.main.temp_max - 273.15)  || 'N/A';
        var currentWeatherTempLow = Math.round(currentResponse.main.temp_min - 273.15)  || 'N/A';
        var currentWeatherDescription = currentResponse.weather[0].description || 'N/A';
        var currentWeatherIcon = weatherIcons[currentResponse.weather[0].icon] || 'N/A';

        $('#cityName').append(currentWeatherCity);

        //Variable for html
        var html = '';

        //Defines html to be appended
        html += `
            <h4 class="text-center text-uppercase">Currently</h4>
            <hr>

            <div class="weatherWidget text-center text-uppercase">
                <div class="col-12">
                    <div class="row">
                        <div class="col">
                            <h6>${currentWeatherDay} ${currentWeatherTime}<h6>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <span style="font-size:60px"><i class="wi ${currentWeatherIcon}"></i></span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <h6>${currentWeatherTempHigh} &deg;C / ${currentWeatherTempLow} &deg;C</h6>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <h6>${currentWeatherDescription}</h6>
                        </div>
                    </div>
                </div>
            </div>`;
                
        //Appends new html to the currentWeather id location
        $('#current').append(html);
    };

    //Function to pull information for the forecast weather and print to html
    function  createForecastWeatherElements(forecastResponse) {

        $('#forecastTitle').html('<h4 class="text-uppercase">General Forecast</h4><hr>');

        //Empties html at the currentWeather id location
        $('#forecastWidgets').empty();
       
        if ($('#forecastWidgets').hasClass('slick-initialized')) {
            $('#forecastWidgets').slick('unslick');
        };
       
        
        for (var i = 8; i < forecastResponse.list.length; i= i+8) {

            var forecastWeatherDay = moment.unix(forecastResponse.list[i].dt).format("dddd") || 'N/A';
            var forecastWeatherTempHigh = Math.round(forecastResponse.list[i].main.temp_max - 273.15)  || 'N/A';
            var forecastWeatherTempLow = Math.round(forecastResponse.list[i].main.temp_min - 273.15)  || 'N/A';
            var forecastWeatherDescription = forecastResponse.list[i].weather[0].description || 'N/A';
            var forecastWeatherIcon = weatherIcons[forecastResponse.list[i].weather[0].icon] || 'N/A';
            var forecastWeatherTime = moment.unix(forecastResponse.list[i].dt).format('LT') || 'N/A';
        
        //Variable for title and html
        var html = '';

        //Defines html to be appended
            html += `
               <div class="weatherWidget text-center text-uppercase">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <h6>${forecastWeatherDay}  ${forecastWeatherTime}</h6>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-12">
                                <span style="font-size:50px"><i class="wi ${forecastWeatherIcon}"></i></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <h6>${forecastWeatherTempHigh} &deg;C / ${forecastWeatherTempLow} &deg;C</h6>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <h6>${forecastWeatherDescription}</h6>
                            </div>
                        </div>
                    </div>
                </div>`;

        //Append html to the currentWeather id location
        $('#forecastWidgets').append(html);
        };

        $('#forecastWidgets').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        });

    };

 

});    

