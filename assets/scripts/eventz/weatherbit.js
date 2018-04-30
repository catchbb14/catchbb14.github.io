var WeatherWidgetEvent = function() {

    var apikey = ['3c2e581fa20c449fa840415d60c0c553', 'b0bca260ee674af3aaa3eedd2febb202'];
    var event;
    var days = 16;
    var zipCode;
    

    /**
     * parameters: zip-code and date from parent event of which button was clicked
     * AJAX request to WeatherBit API to retrieve the 16-day forcast from (https://api.weatherbit.io/v2.0/forecast/daily)
     * If successful, passes the response to createWeatherWidget.
    */
    function getWeatherData(zip, date) {
        //Update Global Zip to access with other functions
        zipCode = zip;

        //Convert eventDate and currentDate to easy-to-read format
        var eventDate = moment(date, "YYYY-MM-DD");
        var currentDate = moment().format("YYYY-MM-DD");
        
        //Determine index of 16-day forecast array
        var daysFromNow = moment(eventDate).diff(moment(currentDate), 'days');
        var forecastIndex = daysFromNow;
        
        //Determines if the date of the event within the 16-day forcast. Makes request.
        if(forecastIndex < 16 && forecastIndex >= 0) {
            $.ajax({
                type: "GET",
                url: `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zipCode}&country=US&days=${days}&key=${apikey[1]}`,
                success: function(response) {
                    createWeatherWidget(response.data[forecastIndex], eventDate);
                },
                error: function(xhr, status, err) {
                    // we have an error, log it.
                    console.log('Error with WeatherBitAPI ' + err);
                }
            });
        } else {
            displayNoInformation(date);
        }
    }

    
    /**
     * TODO: Populate the weather-widget div with information returned by AJAX request
     * @param {*} data: Object-like array from the 16-day forcast 
     * @param {*} date : Date of the event
     */
    function createWeatherWidget(data, date) {
        // Creates an pointer to the correct div on the DOM
        var widget = $(event).find('.weather-widget');
        // Html to populate the weather-widget div
        var html = `
            <div class='row'>
                <h6>Weather for zip-code: ${zipCode} on ${moment(date).format('ddd, MMM Do')}</h6>
            </div>
            <div class='row'>
                <div class="col-4 text-center">
                    <img class="weather_icon" src="assets/images/icons/${data.weather.icon}.png">
                </div>
                <div class="col-8 text-left">
                    <p>${tempConverted(data.max_temp)}/${tempConverted(data.min_temp)}</p>
                    <p>Chance of Precipatation: ${data.pop}%</p>
                </div>
            </div>
            <div class='text-center'>
                <h6 class='text-center'>${data.weather.description}</h6>
            </div>
        `
        // Clears contents of the div
        widget.empty();
        // Appends html to the widget div
        widget.append(html);
    }

    /**
     * TODO: return temperature in celcius with formatting
     * @param {*} celcius : Temperature obtained from forecast
     */
    function tempConverted(celcius) {
        return Math.round(celcius*9/5+32)+'&#8457';
    }

    /**
     * TODO: Remove the get-weather button and display no information available 
     */
    function displayNoInformation() {
        $(event).find('.weather-widget').find('.get-weather').remove();
        $(event).find('.weather-widget').append('<p>No data available, too far to tell!</p>');
    }

    /**
     * Handles the one possible click event to send the appropriate data to the AJAX request
     */
    function clickEventHandlers() {
        $(document).on('click', '.get-weather', function() {
            event = $(this).parents('.event-item');
            var zip = $(event).attr('data-zip');
            var date = $(event).attr('data-date');
            
            getWeatherData(zip, date);
            
        });
    }

    /**
     * Function to initalize necessary processes on-load
     */
    function init() {
        clickEventHandlers();
    }

    return {
        init: init
    }

}();
WeatherWidgetEvent.init();
