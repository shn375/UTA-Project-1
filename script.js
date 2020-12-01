//////////////////////////// VARIABLES ////////////////////////////////////////

// const graceNoteMovieApi = "xw2s7tehhm97h56k9v6qkeyk";  //Thammarak account1
const graceNoteMovieApi = "jf2p6cj9xp8pspnqcjg44rc9";  //Thammarak account2
var graceNoteMoviePrefix = "https://data.tmsapi.com/v1.1/movies/showings?";
// sample of request var graceNoteMoviePrefix = "https://data.tmsapi.com/v1.1/movies/showings?genres=action&startDate=2020-11-23&zip=78613&radius=5&api_key=adsprbrpwkseeq22z6hc2386";
const graceNoteMoviePosterLink = "https://demo.tmsimg.com/";

var dateSelected = "";
var zipCode = "";
var radius = "5";
var genresSearch = "";
var poster = "";


//////////////////////////// FUNCTION ////////////////////////////////////////

//// 1 /////
function getMovies(zipCode, genresSearch, dateTimeSearch) {
    // use ajax to get movies information

    // MOVIE URL REQUEST
    var movieUrlRequest = graceNoteMoviePrefix + "genres=" + genresSearch + "&startDate=" + dateTimeSearch + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi;


    $.ajax({
        url: movieUrlRequest,
        method: "GET",
        error: function (err) {
            alert("The input was not found. Please change zipcode or date")
            return;
        }
    })
        .then(function (response) {
            return addNewArray(response, zipCode, genresSearch);
        })

}

//// 2 /////
function addNewArray(response, zipCode, genresSearch) {
    // FILTER ONLY GENRES THAT MATCH SELECTED AND PUSH INTO NEW ARRAY newMovieArray

    var movieGenresMatch = [];

    for (i = 0; i < response.length; i++) {
        // for (i = 0; i < 3; i++) {
        var movieMatch = response[i].title;

        var genresMatch = response[i].genres;


        if (genresMatch) {


            for (x = 0; x < genresMatch.length; x++) {
                genresMatch[x] = genresMatch[x].toLowerCase();
            }


            var showtimesMatch = response[i].showtimes;
            var imageMatch = response[i].preferredImage.uri;


            if (genresMatch.includes(genresSearch)) {

                movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: imageMatch });


            }


        }



    }

    // THIS IS WHERE THE PROBLEM FOUND BELOW TWO VAR WAS MISSING FOR 78749 BUT 78613 WORKS
    // ADDING MATCH ONES TO NEW MOVIE ARRAY
    var newMovieArray = []

    // 78749 DID NOT REACH HERE BUT 78613 SHOW FOUR WHY???

    for (i = 0; i < movieGenresMatch.length; i++) {
        for (y = 0; y < movieGenresMatch[i].Showtimes.length; y++) {

            //  TRYING CONVERT 24H TO 12H
            var dateTimeBeforeConvert = movieGenresMatch[i].Showtimes[y].dateTime;
            dateTimeAfterConvert = convertTime12H(dateTimeBeforeConvert);


            // TRY ADD TICKET LINK
            newMovieArray.push({ Title: movieGenresMatch[i].Title, Theatre: movieGenresMatch[i].Showtimes[y].theatre.name, Showtimes: dateTimeAfterConvert, Image: movieGenresMatch[i].Image, Ticket: movieGenresMatch[i].Showtimes[y].ticketURI });


        }
    }


    renderMoviesResult(newMovieArray);
}



//// 3 /////
function renderMoviesResult(newMovieArray) {
    // to display movie search result

    var startCard = 0
    var currentMovieName = "";
    var currentTheatre = "";

    for (var i = 0; i < newMovieArray.length; i++) {
        // for (var i = 0; i < 1; i++) {
        // FOR DEBUG

        var movieName = newMovieArray[i].Title;
        var theatre = newMovieArray[i].Theatre;
        var imageUrl = newMovieArray[i].Image;
        var ticketURL = newMovieArray[i].Ticket;

        if (movieName !== currentMovieName) {
            ++startCard
        }

        var cardNumber = "mov-result-" + startCard;
        // same movie scenarios to display only one
        if (movieName === currentMovieName) {
            cardNumber = currentCardNumber;

            // TRY MOVE UNDER THEATRE LOOP
            $(`#${cardNumber}`).find('.schedule').append("<p>" + newMovieArray[i].Showtimes + "</p>");
            // ADD BUTTON
            $(`#${cardNumber}`).find('.schedule').append('<button>Select</button>').addClass('time-select');

            // ADD LINK TO EACH SHOWTIME
            $(`#${cardNumber}`).find('a').attr("href", ticketURL);
            $(`#${cardNumber}`).find('#ticket-link').text("Click for ticket");

            if (theatre === currentTheatre) {
            } else {
                $(`#${cardNumber}`).find('.schedule').append("<p>" + newMovieArray[i].Theatre + "</p>");
            }

        } else {
            $(`#${cardNumber}`).find('.mov-title').text(newMovieArray[i].Title);
            $(`#${cardNumber}`).find('.theatre').text(newMovieArray[i].Theatre);
            // $(`#${cardNumber}`).find('.schedule').text(newMovieArray[i].Showtimes);
            $(`#${cardNumber}`).find('.schedule').append("<p>" + newMovieArray[i].Showtimes + "</p>");
            // ADD BUTTON
            $(`#${cardNumber}`).find('.schedule').append('<button>Select</button>').addClass('time-select');



            // ADD LINK TO EACH SHOWTIME
            //console.log("line 176 ticketURL " + ticketURL);
            $(`#${cardNumber}`).find('a').attr("href", ticketURL);
            $(`#${cardNumber}`).find('#ticket-link').text("Click for ticket");


            // FINALLY FOUND THE LINK TO POSTER
            $(`#${cardNumber}`).find('.movieThumb').attr('src', graceNoteMoviePosterLink + newMovieArray[i].Image);
        }

        var currentMovieName = newMovieArray[i].Title;
        var currentCardNumber = cardNumber;
        var currentTheatre = theatre;

    }
    // END OF FOR LOOP


}


function convertTime12H(dateTimeBeforeConvert) {


    showtimesMatch24H = dateTimeBeforeConvert.slice(11);


    dateTimeAfterConvert = moment(showtimesMatch24H, 'HH:mm').format('hh:mm a');


    return (dateTimeAfterConvert);

}


function getFoodCuisine() {

    var foodCuisine = $('#foodCuisines option:selected').text();
    foodCuisine.toLowerCase();

    getRestaurant(foodCuisine);

    return foodCuisine;
}

function getRestaurant(foodCuisine) {
    var cityID = "";
    var zipCodeApiURL = `http://api.zippopotam.us/us/${zipCode}`;


    $.ajax({
        url: zipCodeApiURL,
        method: "GET",
    }).then(function (response) {

        var cityConvert = response.country;
        var cityLatitude = response.places[0].latitude;
        var cityLongtitude = response.places[0].longitude;
        
        var zomatoURL = `https://developers.zomato.com/api/v2.1/search?q=${foodCuisine}&lat=${cityLatitude}&lon=${cityLongtitude}&apikey=e7edc2d1223caeb3c6166a166b184bdc`;

        $.ajax({
            url: zomatoURL,
            method: "GET",
        }).then(function (response) {
            for (var i = 0; i < response.restaurants.length; i++) {
                $('#restaurant-result-' + i).find('.restaurant-title').text(response.restaurants[i].restaurant.name);
                $('#restaurant-result-' + i).find('.restaurantThumb').attr("src", response.restaurants[i].restaurant.thumb);
                $('#restaurant-result-' + i).find('.schedule').text(response.restaurants[i].restaurant.location.address);
                $('#restaurant-result-' + i).find('.asdf').text(response.restaurants[i].restaurant.phone_numbers);
                $('#restaurant-result-' + i).find('.qwert').text(response.restaurants[i].restaurant.timings);
    
            }
        })

    })


    
  
}


function convertZipCity(zipCode, foodCuisine) {

  


}


//////////////////////////// EXECUTION ////////////////////////////////////////

$(document).ready(function () {

    $("#location-button").click(function (event) {

        event.preventDefault;

        window.zipCode = $('.input').val();

        window.genresSearch = $("#movie-selections option:selected").text();
        genresSearch = genresSearch.toLowerCase();

        window.dateSearch = $('#date-select').val();
        window.timeSearch = $('#time-select').val();
        window.dateTimeSearch = dateSearch + "T" + timeSearch;

        getMovies(zipCode, genresSearch, dateTimeSearch);
        getFoodCuisine();

    })

});

