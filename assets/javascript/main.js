/* Psuedo Code

** Javascript/jQuery **
    - Will need to create an array of strings for button values that are loaded on page.
    - When user searches, a button will be created, and APPENDED to current buttons loaded initially
    - When a button is clicked, gifs will populate into div and display a still state of the value searched.
    - A rating will display above GIF
    - When a GIF is clicked, GIF will play, when clicked again, GIF will pause. 
*/

// On page load
$(document).ready(function() {

    // MOVIE ARRAY 
    // ===============================================

    // Array to hold initial move buttons
    var topics = ["Superbad", "Stepbrothers", "Zoolander", "Shrek", "Sandlot", "Gladiator", "300", "Troy", "Baseketball", "Cars"];

    // FUNCTIONS 
    // ===============================================

    // Fucntion to load on run on page load.
    function startScreen() {

        // Deletes movies prior to adding new from array, preventing repeat buttons
        $(".gifButtons").empty();

        // For loop to run through topics array, and create buttons
        for (i = 0; i < topics.length; i++) {

            // Variable that creates buttons from topics array.
            var topicsButtons = $('<button class="btn btn-info btn-default" data-name= ' + topics[i] + '>');

            topicsButtons.append(topics[i]);

            // jQuery to manipulate html with array of buttons
            $('.gifButtons').append(topicsButtons);
        }

        // Function to handle click actions on gif buttons, and gifs.
        $('button').click(function() {
            // In this case, the "this" keyword refers to the button that was clicked
            var movie = $(this).attr("data-name");

            // Constructing a URL to search Giphy for the movie searched
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                movie + "&api_key=dc6zaTOxFJmzC&limit=10";

            // Performing our AJAX GET request
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                // After the data comes back from the API
                .done(function(response) {
                    // Variable to hold results of response object
                    var results = response.data;

                    // Log value of movie button clicked
                    console.log("Movie: " + movie);

                    // For loop to run through our results of returned data
                    for (var i = 0; i < results.length; i++) {

                        // Variable that creates a div for gifs
                        var gifDiv = $("<div class='item text-center'>");

                        // Var to hold rating of gif
                        var rating = results[i].rating;

                        // Var to hold contcatinate p tag with rating
                        var p = $("<h2>").text("Rating: " + rating);

                        // Creates image tag for movie
                        var movieImage = $("<img data-still=" + results[i].images.fixed_height_still.url + " data-animate=" + results[i].images.fixed_height.url + " data-state='animate'>");

                        // Maninpulating varibles w/ jQuery to our HTML
                        movieImage.attr("src", results[i].images.fixed_height.url);

                        gifDiv.prepend(p);
                        gifDiv.prepend(movieImage);

                        $('.displayGifs').prepend(gifDiv);

                        // console.log(results);

                        // jQuery to animate gif on click
                        $('img').click(function() {

                            // Log to test on image click
                            // console.log("test"); // Works, now need to set to animate url

                            // Setting state variable off of the data-state attribute on our gif image, to use in if statement
                            var state = $(this).attr("data-state");

                            // If else statement to check data state.
                            // If animate, the update source url to the animate url, and its data-state attribute to animate.
                            if (state === "animate") {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                            // Otherwise, set back to animate source URL, and animate data state.
                            else {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            }
                        });
                    }
                });
        });
    }

    // Function to handle click event on form submission for movie search
    $("#addMovie").click(function(event) {

        // Prevents the form from automatically running on its own
        event.preventDefault();

        // Grabs input from search text box
        var movieSearch = $("#movieSearch").val().trim();

        // Adds movie to topics array, which will then create a button, and append
        topics.push(movieSearch);

        startScreen();
    });

    // Calls startScreen function to load buttons created from topics array
    startScreen();
});
