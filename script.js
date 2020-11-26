//////////////////////////// VARIABLES ////////////////////////////////////////


var eventBriteApi = "OVMXD2IZ6NPP3KHS7G4E";
var yelpApi = "9VUtXRmjC3Psh50MTKDn-lpXsZIazhjlyx88TpX6WWLCHvk-_-DuGww3FkdhLhSDpIPlFvOzMjVSsJaS1hrIbG3FYNxznVAWr_UMGM4E8DbkOzrAz5pYOQY1qUW5X3Yx"
const graceNoteMovieApi = "adsprbrpwkseeq22z6hc2386";  //Thammarak account

var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?";
// sample of request var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?genres=action&startDate=2020-11-23&zip=78613&radius=5&api_key=adsprbrpwkseeq22z6hc2386";

var yelpApiPrefix = "https://api.yelp.com/v3/businesses/search?";
// sample of request var yelpAPIPrefix = "https://api.yelp.com/v3/businesses/search?term=pizza&latitude=30.266666&longitude=-97.733330&apikey=kttxiZtG1Dr6SQS5GR-wLFn_d-Y4xjs0lqPoakVILmEO8UWcTXfrPZ9PV95L7-traBoAT0kEsK0vsOtq_r-CBmPLqxYYqHe-pKTh2xFNe5saVlDbTAtT0vUmiz25X3Yx";

var genresSelected = "";
var dateSelected = "";
var zipCode = "";
var radius = "";

// Initialize all input of date type.
// const calendars = bulmaCalendar.attach('[type="date"]', options);



//////////////////////////// FUNCTION ////////////////////////////////////////

// use ajax to get movies information
function getMovies() {

    // Hardcode to verify API
    var genresSelected = "comedy";
    var dateSelected = "2020-11-27";
    var zipCode = "78613";
    var radius = "5";

    $.ajax({
        url: graceNoteMoviePrefix + "genres="+ genresSelected + "&startDate=" + dateSelected + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi,
        method: "GET",
        error: function (err) {
            alert("The input was not found. Please check your spelling")
            return;
        }
    })
        .then(function (response) {
            console.log(response[0]);
            console.log(response[0].title);
            console.log(response[0].genres);

            var genresArray = response[0].genres;
            console.log(genresArray);
            var genresSearch = "Action"

            if (genresArray.includes(genresSearch)) {
                console.log('yes array includes ' + genresSearch);

            }

            // add only movies that include genresSearch into a new array then pass it renderMovies function
    

            // renderMoviesResult(movieArrayMatch);
        })
     
}


// to display movie search result
function renderMoviesResult() {

    console.log(movieArrayMatch);

    for (var i = 0; i < movieArrayMatch.length; i++) {

        // put movies into DOM
        $('#mov-result-${i}').find('.title').text(movieArrayMatch[0]);
        $('#mov-result-${i}').find('.genres').text(movieArrayMatch[1]);
        $('#mov-result-${i}').find('.movieThumb').attr('src', movieArrayMatch[2]);
        $('#mov-result-${i}').find('.showTime').text(response[i].showtimes.theatre.name);





    }



}







//////////////////////////// EXECUTION ////////////////////////////////////////

// // Loop on each calendar initialized
// calendars.forEach(calendar => {
//     // Add listener to date:selected event
//     calendar.on('date:selected', date => {
//     console.log(date);
//     });
//     });
    


getMovies();
