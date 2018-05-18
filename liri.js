require("dotenv").config();

// Grab key objects
var keys = require("./keys");

// Grab the packages...
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var rp = require('request-promise');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbApikey = keys.request.apikey;

var command = process.argv[2]; // get command line instruction
var searchItem = "";

// test if command should be supplied through the random.txt file or via the command line interface
if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(err, data) {
        if (err) {
            return console.log(err);
        }

        command = data.split(",")[0].trim();
        searchItem = data.split(",")[1].trim();
        console.log(command);
        console.log(searchItem);
        processCommand(command, searchItem);

    });
} else {
    searchItem = getArticle(process.argv); // get the song or movie to search for in the command line
    processCommand(command, searchItem);
}

/*
 * This function processes the command received from the command-line or from the random text file
 */
function processCommand(cmd, item) {

    console.log("\n"); // create blank line in the output

    // log the command executed and search item
    var outputData = "Command executed: " + cmd + " " + item + " on " + new Date().toUTCString() + "\n";
    fs.appendFileSync("log.txt", outputData, "utf8");

    switch (cmd) {
        case "my-tweets":
            var params = {
                screen_name: 'samson_mwamadi',
                count: 20
            };

            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {

                    for (var x = 0; x < tweets.length; x++) {

                        console.log(tweets[x].created_at);
                        console.log(tweets[x].text);
                        console.log("\n");

                        // prepare text to write to the log-file
                        outputData = tweets[x].created_at + "\n" + tweets[x].text + "\n";
                        fs.appendFileSync("log.txt", outputData, "utf8");
                    }
                    fs.appendFileSync("log.txt", "\n\n", "utf8");

                }
            });

            break;

        case "spotify-this-song":
            // usage with promises - the search method returns a promise object containing the response
            spotify
                .search({ type: 'track', query: item, limit: 20 })
                .then(function(response) {
                    outputData = "";

                    for (var x = 0; x < response.tracks.items.length; x++) {

                        //album
                        outputData += "Album:        " + response.tracks.items[x].album.name + "\n";
                        console.log("Album:        " + response.tracks.items[x].album.name);

                        //song's name
                        outputData += "Song's name:  " + response.tracks.items[x].name + "\n";
                        console.log("Song's name:  " + response.tracks.items[x].name);

                        //artist(s)
                        outputData += "Artist(s)\n--------------\n";
                        console.log("Artist(s)");
                        console.log("--------------");
                        for (var y = 0; y < response.tracks.items[x].artists.length; y++) {
                            outputData += "              " + response.tracks.items[x].artists[y].name + "\n";
                            console.log("              " + response.tracks.items[x].artists[y].name);
                        }
                        //preview link of the song
                        outputData += "Preview Link: " + response.tracks.items[x].external_urls.spotify + "\n==\n\n";
                        console.log("Preview Link: " + response.tracks.items[x].external_urls.spotify);
                        console.log("==\n\n");
                    }

                    fs.appendFileSync("log.txt", outputData, "utf8");

                })
                .catch(function(err) {
                    console.log(err);
                });

            /*
            * usage with a callback function
            * Code is included to show an example of how the callback
            * function is being used in the search method
            * 
            search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

            spotify.search({ type: 'track', query: 'Shake It Off', limit: 20}, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(data);
            });
            */

            break;

        case "movie-this":

            var options = {
                uri: 'http://www.omdbapi.com/?apikey=' + omdbApikey + '&t=' + item,
                json: true // Automatically parses the JSON string in the response
            };

            rp(options)
                .then(function(data) {
                    console.log("Title:  " + data.Title);
                    console.log("Year:  " + data.Year);
                    for (var x = 0; x < data.Ratings.length; x++) {
                        console.log(data.Ratings[x].Source + " Rating:  " + data.Ratings[x].Value);
                    }

                    console.log("Country of production:  " + data.Country);
                    console.log("Language:  " + data.Language);
                    console.log("Plot of the movie:  " + data.Plot);
                    console.log("Actors of the movie:  " + data.Actors);

                    // prepare data item for writing to file
                    outputData = "Title:  " + data.Title + "\n";
                    outputData += "Year:  " + data.Year + "\n";

                    for (var x = 0; x < data.Ratings.length; x++) {
                        outputData += data.Ratings[x].Source + " Rating:  " + data.Ratings[x].Value + "\n";
                    }

                    outputData += "Country of production:  " + data.Country + "\n";
                    outputData += "Language:  " + data.Language + "\n";
                    outputData += "Plot of the movie:  " + data.Plot + "\n";
                    outputData += "Actors of the movie:  " + data.Actors + "\n\n";

                    fs.appendFileSync("log.txt", outputData, "utf8");

                })
                .catch(function(err) {
                    console.log(err);
                });

            break;

    }
}

/*
 * This function prepares the search string from the command line.
 * This is critical especially where the search string is more than one word.
 */
function getArticle(commandLine) {
    var article = "";

    if (commandLine.length === 4) { //test if array is 4 elements
        article = commandLine[3]; // one word supplied for the song or movie
    } else if (commandLine.length < 4) { // no movie or song supplied, so we take the defaults
        if (command === "spotify-this-song") {
            article = "The Sign"; // default song
        } else if (command === "movie-this") {
            article = "Mr. Nobody"; // default movie
        }

    } else if (commandLine.length > 4) { // more than one word supplied for the song or movie
        article = commandLine[3];
        for (var x = 4; x < commandLine.length; x++) {
            article = article + "+" + commandLine[x];
        }
    }
    return article;
}