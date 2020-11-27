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
var genresSearch = "Action";
var poster = "";


//////////////////////////// FUNCTION ////////////////////////////////////////

// use ajax to get movies information
function getMovies() {
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
            return addNewArray(response);
        })


}




// to display movie search result
function renderMoviesResult(newMovieArray) {

    console.log("line 175 " + newMovieArray);
    var startCard = 0
    var currentMovieName = "";
    var currentTheatre = "";

    for (var i = 0; i < newMovieArray.length; i++) {
        // for (var i = 0; i < 1; i++) {

        var movieName = newMovieArray[i].Title;
        var theatre = newMovieArray[i].Theatre;
        var imageUrl = newMovieArray[i].Image;

        console.log("line 189" + imageUrl);
        console.log("line 191 " + movieName);
        console.log("line 192 " + theatre);

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
            $(`#${cardNumber}`).find('.showTime').text(newMovieArray[i].Showtimes); // working
            // $(`#${cardNumber}`).find('.movieThumb').attr('src', newMovieArray[i].Image);

            // ++ startCard

        }

        var currentMovieName = newMovieArray[i].Title;
        var currentCardNumber = cardNumber;
        var currentTheatre = theatre;

    }
    // END OF FOR LOOP
}



function addNewArray(response) {

    // FILTER ONLY GENRES THAT MATCH SELECTED AND PUSH INTO NEW ARRAY newMovieArray
    for (i = 0; i < response.length; i++) {
        // for (i = 0; i < 1; i++) {
        var movieMatch = response[i].title;
        var movieMatchNoSpace = response[i].title.replace(/ /g, "_");
        var genresMatch = response[i].genres;
        var showtimesMatch = response[i].showtimes;
        var imageMatch = response[i].preferredImage.uri;


        if (genresMatch.includes(genresSearch)) {
            movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: poster });
        }
    }

    // ADDING MATCH ONES TO NEW MOVIE ARRAY
    var newMovieArray = []

    for (i = 0; i < movieGenresMatch.length; i++) {
        for (y = 0; y < movieGenresMatch[i].Showtimes.length; y++) {
            newMovieArray.push({ Title: movieGenresMatch[i].Title, Theatre: movieGenresMatch[i].Showtimes[y].theatre.name, Showtimes: movieGenresMatch[i].Showtimes[y].dateTime, Image: movieGenresMatch[i].Image });
        }
    }
    renderMoviesResult(newMovieArray);
}
//////////////////////////// EXECUTION ////////////////////////////////////////


$(".target").change(function () {
    genresSelected = $("#movie-selections option:selected").text();
    console.log("line 270 " + genresSelected);
});

$("#location-button").click(function () {
    zipCode = $('input').val();
    console.log("line 270 " + zipCode);
})


$(document).ready(() => {
    getMovies();
})

// $(document).ready(() => {
//     getPoster();
// })



///////////////////TRYING CODE ////////////////////////

// function getPoster(movieMatch) {

//     console.log("getPoster" + movieMatch);
//     var omdbUrlRequest = omdbPrefix + omdbApiKey + "&t=" + movieMatch 
//     // console.log("🚀 ~ file: script.js ~ line 126 ~ getPoster ~ omdbUrlRequest", omdbUrlRequest)

//     $.ajax({
//         url: omdbUrlRequest,
//         method: "GET",

//     })
//     .then(function (response) {
//     console.log("🚀 ~ file: script.js ~ line 268 ~ response", response)

//         var poster = response.Poster;
//         console.log("🚀 ~ file: script.js ~ line 271 ~ poster", poster)
//         // return imageMatch;

//     })
//         // console.log("🚀 ~ file: script.js ~ line 149 ~ imageMatch", imageMatch)


//         console.log("line 278" + movieMatch);

// }






                    // // OMDB REQUEST STILL NOT WORKING

                    // var omdbUrlRequest = omdbPrefix + omdbApiKey + "&t=" + movieMatch 
                    // console.log("line77" + omdbUrlRequest);
                    //     $.ajax({
                    //         url: omdbUrlRequest,
                    //         method: "GET",
                    //     })
                    //         .then(function (response) {
                    //         console.log("🚀 ~ file: script.js ~ line 82 ~ response", response)

                    //             poster = response.Poster;
                    //             console.log("line 103 " + poster);
                    //             // console.log("line 106 " + typeof (poster));


                    //             console.log("line 108" + movieMatch);
                    //             console.log("line 108" + genresSearch);
                    //             console.log("line 108" + showtimesMatch);
                    //             console.log("line 108" + poster);

                    //             movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: poster });
                    //             console.log("line 108" + movieGenresMatch );

                    //             return movieGenresMatch;
                    //         })

                    //         console.log("li109 " + poster);



                    // $.ajax({
                    //     var omdbUrlRequest = omdbPrefix + omdbApiKey + "&t=" + movieMatch
                    //     url: omdbUrlRequest,
                    //     method: "GET"
                    // })
                    //     .then(function (response) {
                    //         return addPoster(response);
                    //     })