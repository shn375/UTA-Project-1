//////////////////////////// VARIABLES ////////////////////////////////////////


var eventBriteApi = "OVMXD2IZ6NPP3KHS7G4E";
var yelpApi = "9VUtXRmjC3Psh50MTKDn-lpXsZIazhjlyx88TpX6WWLCHvk-_-DuGww3FkdhLhSDpIPlFvOzMjVSsJaS1hrIbG3FYNxznVAWr_UMGM4E8DbkOzrAz5pYOQY1qUW5X3Yx"
const graceNoteMovieApi = "adsprbrpwkseeq22z6hc2386";  //Thammarak account

var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?";
// sample of request var graceNoteMoviePrefix = "http://data.tmsapi.com/v1.1/movies/showings?genres=action&startDate=2020-11-23&zip=78613&radius=5&api_key=adsprbrpwkseeq22z6hc2386";

var yelpApiPrefix = "https://api.yelp.com/v3/businesses/search?";
// sample of request var yelpAPIPrefix = "https://api.yelp.com/v3/businesses/search?term=pizza&latitude=30.266666&longitude=-97.733330&apikey=kttxiZtG1Dr6SQS5GR-wLFn_d-Y4xjs0lqPoakVILmEO8UWcTXfrPZ9PV95L7-traBoAT0kEsK0vsOtq_r-CBmPLqxYYqHe-pKTh2xFNe5saVlDbTAtT0vUmiz25X3Yx";

var omdbApiKey = "5673ffbb";
var omdbPrefix = "http://www.omdbapi.com/?apikey="

var genresSelected = "";
var dateSelected = "";
var zipCode = "";
var radius = "";

var poster = "";

// Initialize all input of date type.
// const calendars = bulmaCalendar.attach('[type="date"]', options);


    // Hardcode to verify API
    var genresSelected = "comedy";
    var dateSelected = "2020-11-27";
    var zipCode = "78613";
    var radius = "5";
    var currentDate = moment().format('YYYY-MM-DD');
    console.log(currentDate);

    var movieGenresMatch = [];
    var genresSearch = "Action";
    var poster = "";


//////////////////////////// FUNCTION ////////////////////////////////////////

// use ajax to get movies information
function getMovies() {



    // var movieUrlRequest = graceNoteMoviePrefix + "genres="+ genresSelected + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi
    var movieUrlRequest = graceNoteMoviePrefix + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi

    $.ajax({
        // url: graceNoteMoviePrefix + "genres="+ genresSelected + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi,
        // url: graceNoteMoviePrefix + "&startDate=" + currentDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=" + graceNoteMovieApi,
        url: movieUrlRequest,
        method: "GET",
        error: function (err) {
            alert("The input was not found. Please check your spelling")
            return;
        }
    })
        .then(function (response) {


            return addNewArray(response);

            // console.log(response.length);
            // console.log(response[0]);
            // console.log(response[0].title);
            // console.log(response[0].genres);

            // console.log(genresArray);
            // var genresSearch = "Action"

            // if (genresArray.includes(genresSearch)) {
            //     console.log('yes array includes ' + genresSearch);

            // }





            // add only movies that include genresSearch into a new array then pass it renderMovies function


        })
                    // console.log("🚀 ~ file: script.js ~ line 140 ~ omdbUrlRequest", omdbUrlRequest)
                    // console.log("🚀 ~ file: script.js ~ line 140 ~ omdbUrlRequest", omdbUrlRequest)
                    // console.log("🚀 ~ file: script.js ~ line 140 ~ omdbPrefix", omdbPrefix)

}




// to display movie search result
function renderMoviesResult(newMovieArray) {

console.log("line 175 " + newMovieArray);
var startCard = 0
var currentMovieName = "";
var currentTheatre = "";

    for (var i = 0; i < newMovieArray.length; i++) {
    // for (var i = 0; i < 1; i++) {

        // console.log("#mov-result-"+ cardNumber);
        // console.log("line 185" + newMovieArray[i].Title);
        // console.log("line 185" + newMovieArray[i].Image);

        var movieName = newMovieArray[i].Title;
        var theatre = newMovieArray[i].Theatre;
        var imageUrl = newMovieArray[i].Image;

        console.log("line 189" + imageUrl);
        console.log("line 191 "+ movieName);
        console.log("line 192 "+ theatre);

        if (movieName !== currentMovieName) {

        ++ startCard

        }

        var cardNumber = "mov-result-"+ startCard;
        // console.log(cardNumber);
        // console.log("🚀 ~ file: script.js ~ line 140 ~ renderMoviesResult ~ cardNumber", cardNumber)



        // put movies into DOM
        // $(cardNumber).find('.title').text(newMovieArray[i].Title);
        // $(`#${cardNumber}`).text('Tenet'); // working
        // $(`#${cardNumber}`).find('.card-header').find('.mov-title').text('Tenet'); // working
        // $(`#${cardNumber}`).find('.mov-title').text('Tenet'); // working

        // working part
        // $(`#${cardNumber}`).find('.mov-title').text(newMovieArray[i].Title);
        // $(`#${cardNumber}`).find('.genres').text(newMovieArray[i].Theatre);
        // $(`#${cardNumber}`).find('.showTime').text(newMovieArray[i].Showtimes);



        
        // console.log("🚀 ~ file: script.js ~ line 147 ~ renderMoviesResult ~ currentMovieName", currentMovieName)
        // console.log("🚀 ~ file: script.js ~ line 148 ~ renderMoviesResult ~ currentTheatre", currentTheatre)

        // same movie sam theatre scenarios
        // if ((movieName = currentMovieName) && (theatre = currentTheatre)) {
        if (movieName === currentMovieName) {
            // console.log("equal");
            cardNumber = currentCardNumber;
            $(`#${cardNumber}`).find('.showTime').append( "<p>"+newMovieArray[i].Theatre+"</p>" );
            $(`#${cardNumber}`).find('.showTime').append( "<p>"+newMovieArray[i].Showtimes+"</p>" );

        } else {
            // console.log("not equal");
            $(`#${cardNumber}`).find('.mov-title').text(newMovieArray[i].Title);
            $(`#${cardNumber}`).find('.theatre').text(newMovieArray[i].Theatre);
            $(`#${cardNumber}`).find('.showTime').text(newMovieArray[i].Showtimes); // working
            // $(`#${cardNumber}`).find('.movieThumb').attr('src', newMovieArray[i].Image);

                    // ++ startCard


        }

        var currentMovieName = newMovieArray[i].Title;
        // console.log("🚀 ~ file: script.js ~ line 162 ~ renderMoviesResult ~ currentMovieName", currentMovieName)
        var currentCardNumber = cardNumber;
        // console.log("🚀 ~ file: script.js ~ line 164 ~ renderMoviesResult ~ currentCardNumber", currentCardNumber)
        var currentTheatre = theatre;
        // console.log("🚀 ~ file: script.js ~ line 166 ~ renderMoviesResult ~ currentTheatre", currentTheatre)

        // $(`#day${dayNumber}`).find('h5').text(convertUnixTime(fiveDaysArray[i].dt * 1000));

        // $('#mov-result-i').find('.genres').text(movieGenresMatch[1]);
        // $('#mov-result-i}').find('.movieThumb').attr('src', movieGenresMatch[2]);
        // $('#mov-result-${i}').find('.showTime').text(response[i].showtimes.theatre.name);

        // ++ startCard


    }
    // END OF FOR LOOP

    

}



function addNewArray(response) {

            // FILTER ONLY GENRES THAT MATCH SELECTED AND PUSH INTO NEW ARRAY newMovieArray
            for (i = 0; i < response.length; i++) {
                // for (i = 0; i < 1; i++) {
                    var movieMatch = response[i].title;
                    var movieMatchNoSpace = response[i].title.replace(/ /g,"_");
                    var genresMatch = response[i].genres;
                    var showtimesMatch = response[i].showtimes;
                    // var imageMatch = response[i].preferredImage.uri;
                    
    
                    if (genresMatch.includes(genresSearch)) {
                        console.log("li 205 " + response[i].title + ' includes ' + genresSearch);
                        // movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: imageMatch });
                        // console.log(movieGenresMatch);
    
    
    
                        movieGenresMatch.push({ Title: movieMatch, Genres: genresSearch, Showtimes: showtimesMatch, Image: poster });
                        // console.log("line 122" + movieGenresMatch );
    
                    }
                }
    
                // ADDING MATCH ONES TO NEWMOVIE ARRAY
    
                var newMovieArray = []
                // console.log("line 130 movieGenresMatch.length" + movieGenresMatch.length);
    
                for (i = 0; i < movieGenresMatch.length; i++) {
                    // console.log(movieGenresMatch[i].Title + movieGenresMatch[i].Showtimes);
                    // console.log(movieGenresMatch[i].Showtimes.length);
                    for (y = 0; y < movieGenresMatch[i].Showtimes.length; y++) {
                        // console.log(movieGenresMatch[i].Showtimes[y]);
                        // console.log("line130 " + movieGenresMatch[i].Title + movieGenresMatch[i].Showtimes[y].theatre.name);
                        // console.log("line131 " + movieGenresMatch[i].Title + movieGenresMatch[i].Showtimes[y].dateTime);
                        // newMovieArray.push({ Title: movieGenresMatch[i].Title, Theatre: movieGenresMatch[i].Showtimes[y].theatre.name, Showtimes: movieGenresMatch[i].Showtimes[y].dateTime }); //working
    
    
                        // console.log("line135 " + movieGenresMatch[i].Title);
                        // console.log("line135 " + movieGenresMatch[i].Showtimes[y].theatre.name);
                        // console.log("line135 " + movieGenresMatch[i].Showtimes[y].dateTime);
                        // console.log("line145 " + movieGenresMatch[i].Image);
                        
    
                        newMovieArray.push({ Title: movieGenresMatch[i].Title, Theatre: movieGenresMatch[i].Showtimes[y].theatre.name, Showtimes: movieGenresMatch[i].Showtimes[y].dateTime, Image: movieGenresMatch[i].Image });
                    }
    
                    console.log('line 151' + newMovieArray);
    
                    // }
                }

                renderMoviesResult(newMovieArray);

}





//////////////////////////// EXECUTION ////////////////////////////////////////

// // Loop on each calendar initialized
// calendars.forEach(calendar => {
//     // Add listener to date:selected event
//     calendar.on('date:selected', date => {
//     console.log(date);
//     });
//     });


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