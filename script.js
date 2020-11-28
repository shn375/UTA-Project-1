//////////////////////////// VARIABLES ////////////////////////////////////////

// const graceNoteMovieApi = "adsprbrpwkseeq22z6hc2386";  //Thammarak account1
const graceNoteMovieApi = "jf2p6cj9xp8pspnqcjg44rc9";  //Thammarak account2
var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?";
// sample of request var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?genres=action&startDate=2020-11-23&zip=78613&radius=5&api_key=adsprbrpwkseeq22z6hc2386";

// var yelpApi = "9VUtXRmjC3Psh50MTKDn-lpXsZIazhjlyx88TpX6WWLCHvk-_-DuGww3FkdhLhSDpIPlFvOzMjVSsJaS1hrIbG3FYNxznVAWr_UMGM4E8DbkOzrAz5pYOQY1qUW5X3Yx"
// var yelpApiPrefix = "https://api.yelp.com/v3/businesses/search?";
// sample of request var yelpAPIPrefix = "https://api.yelp.com/v3/businesses/search?term=pizza&latitude=30.266666&longitude=-97.733330&apikey=kttxiZtG1Dr6SQS5GR-wLFn_d-Y4xjs0lqPoakVILmEO8UWcTXfrPZ9PV95L7-traBoAT0kEsK0vsOtq_r-CBmPLqxYYqHe-pKTh2xFNe5saVlDbTAtT0vUmiz25X3Yx";


var omdbApiKey = "5673ffbb";
var omdbPrefix = "http://www.omdbapi.com/?apikey="

var genresSelected = "";
var dateSelected = "";
var zipCode = "";
var radius = "";


// Hardcode to verify API
var genresSelected = "";
var dateSelected = "2020-11-27";
var zipCode = "78613";
var radius = "5";
var currentDate = moment().format('YYYY-MM-DD');
// console.log(currentDate);

var movieGenresMatch = [];
var genresSearch = "Action";  // need to link this to event listener
var poster = "";


//////////////////////////// FUNCTION ////////////////////////////////////////


//// 1 /////
function getMovies(zipCode, genresSearch) {
    // use ajax to get movies information

    console.log("line 42 " + zipCode);
    console.log("line 42 " + genresSearch);

    // not able to search by genres need to search for all then filter by code
    // var movieUrlRequest = graceNoteMoviePrefix + "genres="+ genresSelected + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi
    var movieUrlRequest = graceNoteMoviePrefix + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi

    $.ajax({
        url: movieUrlRequest,
        method: "GET",
        error: function (err) {
            alert("The input was not found. Please check your spelling")
            return;
        }
    })
        .then(function (response) {
            return addNewArray(response, zipCode, genresSearch);

            // SHOULD I MOVE addNewArray Function here and also another AJAX for poster same as weather app


        })


}



//// 2 /////
function addNewArray(response, zipCode, genresSearch) {
    // FILTER ONLY GENRES THAT MATCH SELECTED AND PUSH INTO NEW ARRAY newMovieArray

    console.log("line 67 " + zipCode);
    console.log("line 67 " + genresSearch);

    console.log("typeof genresSearch " + typeof(genresSearch));

    for (i = 0; i < response.length; i++) {
        // for (i = 0; i < 1; i++) {
        var movieMatch = response[i].title;
        // var movieMatchNoSpace = response[i].title.replace(/ /g, "_");

        var genresMatch = response[i].genres;
        // convert response genres to lower case to compare with user genres selected
        for (x = 0; x < genresMatch.length; x++) {
            genresMatch[x] = genresMatch[x].toLowerCase();
        }

        console.log("line 85 " + genresMatch);
        console.log("line 85 " + genresSearch);

        var showtimesMatch = response[i].showtimes;
        var imageMatch = response[i].preferredImage.uri;


        if (genresMatch.includes(genresSearch)) {
            movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: imageMatch });

            console.log("line 95 " + movieGenresMatch);
        }
    }

    // ADDING MATCH ONES TO NEW MOVIE ARRAY
    var newMovieArray = []

    for (i = 0; i < movieGenresMatch.length; i++) {
        for (y = 0; y < movieGenresMatch[i].Showtimes.length; y++) {
            newMovieArray.push({ Title: movieGenresMatch[i].Title, Theatre: movieGenresMatch[i].Showtimes[y].theatre.name, Showtimes: movieGenresMatch[i].Showtimes[y].dateTime, Image: movieGenresMatch[i].Image });

            console.log("line 102 " + movieGenresMatch[i].Title);
            console.log("line 102 " + movieGenresMatch[i].Showtimes[y].theatre.name);
            console.log("line 102 " + movieGenresMatch[i].Showtimes[y].dateTime);
            console.log("line 102 " + movieGenresMatch[i].Image);

        }
    }
    renderMoviesResult(newMovieArray);
}



//// 3 /////
function renderMoviesResult(newMovieArray) {
    // to display movie search result

    console.log("line 175 " + newMovieArray);
    var startCard = 0
    var currentMovieName = "";
    var currentTheatre = "";

    for (var i = 0; i < newMovieArray.length; i++) {
        // for (var i = 0; i < 1; i++) {
        // FOR DEBUG

        var movieName = newMovieArray[i].Title;
        var theatre = newMovieArray[i].Theatre;
        var imageUrl = newMovieArray[i].Image;

        // console.log("line 201 " + imageUrl);
        // console.log("line 191 " + movieName);
        // console.log("line 192 " + theatre);

        if (movieName !== currentMovieName) {
            ++startCard
        }

        var cardNumber = "mov-result-" + startCard;
        // same movie scenarios to display only one
        if (movieName === currentMovieName) {
            // console.log("equal");
            cardNumber = currentCardNumber;
            $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Theatre + "</p>");
            $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Showtimes + "</p>");

        } else {
            // console.log("not equal");
            $(`#${cardNumber}`).find('.mov-title').text(newMovieArray[i].Title);
            $(`#${cardNumber}`).find('.theatre').text(newMovieArray[i].Theatre);
            $(`#${cardNumber}`).find('.showTime').text(newMovieArray[i].Showtimes);
            // ADDING MOVIE IMAGE WILL CHANGE TO POSTER
            // $(`#${cardNumber}`).find('.movieThumb').attr('src', newMovieArray[i].Image);

            // ++ startCard

        }

        var currentMovieName = newMovieArray[i].Title;
        var currentCardNumber = cardNumber;
        var currentTheatre = theatre;

    }
    // END OF FOR LOOP


    // getPoster(newMovieArray);
}


//// 4 /////
function getPoster(newMovieArray) {


    console.log("line 155 " + newMovieArray);
    console.log("line 155 " + newMovieArray[0].Title);


    for (var i = 0; i < newMovieArray.length; i++) {
        // for (var i = 0; i < 1; i++) {
        // FOR DEBUG

        // var movieMatchNoSpace = newMovieArray[i].title.replace(/ /g, "_");
        var movieMatchNoSpace = newMovieArray[i].Title.replace(/ /g, "_");;
        console.log("line 165 " + movieMatchNoSpace);

        var omdbUrlRequest = omdbPrefix + omdbApiKey + "&t=" + movieMatchNoSpace
        console.log("line 168 " + omdbUrlRequest);
        $.ajax({
            url: omdbUrlRequest,
            method: "GET",
        })
            .then(function (response) {

                addPosterToArray(response, newMovieArray);
                
            });
    }

}

//// 4 half /////

function addPosterToArray (response, newMovieArray) {



    for (i = 0; i < newMovieArray.length; i++) {
        var posterUrl = response.Poster;
        console.log("line 193 " + posterUrl);
        newMovieArray[i].Poster = posterUrl;

        console.log("line 197 newMovieArray[i].Poster " + newMovieArray[i].Poster);

    }


    renderPoster(newMovieArray);


}


//// 5 /////
function renderPoster(newMovieArray) {


    var startCard = 0
    var currentMovieName = "";
    
    for (var i = 0; i < newMovieArray.length; i++) {

        var movieName = newMovieArray[i].Title;


        if (movieName !== currentMovieName) {
            ++startCard
        }

        var cardNumber = "mov-result-" + startCard;
        // same movie scenarios to display only one
        if (movieName === currentMovieName) {
            console.log("equal movieName = currentMovieName " + movieName +'='+ currentMovieName);
            cardNumber = currentCardNumber;
            // $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Theatre + "</p>");
            // $(`#${cardNumber}`).find('.showTime').append("<p>" + newMovieArray[i].Showtimes + "</p>");

        } else {
            console.log("not equal movieName = currentMovieName " + movieName +'!='+ currentMovieName);
            console.log("line 217 " + newMovieArray[i].Poster);
            $(`#${cardNumber}`).find('.movieThumb').attr('src', newMovieArray[i].Poster);

            // ++ startCard

        }

        var currentMovieName = newMovieArray[i].Title;
        var currentCardNumber = cardNumber;


    }


}


//////////////////////////// EXECUTION ////////////////////////////////////////

/////// 1 USER MUST SELECT ZIP AND GENRES FIRST BEFORE GET MOVIE RESULT ////////

alert("Please input your current location");

$("#location-button").click(function (event) {
    event.preventDefault;

    alert("Please select Movie Genres or Food Type")

    var zipCode = $('input').val();
    console.log("line 270 " + zipCode);

    $(".target").change(function (event) {
        event.preventDefault;
    
        var genresSearch = $("#movie-selections option:selected").text();
        genresSearch = genresSearch.toLowerCase();
        console.log("line 270 " + genresSearch);
    
        getMovies(zipCode, genresSearch);
    
    });

    
})







// $(document).ready(() => {
//     getMovies();
// })

// $(document).ready(() => {
//     getPoster();
// })



///////////////////TRYING CODE ////////////////////////


