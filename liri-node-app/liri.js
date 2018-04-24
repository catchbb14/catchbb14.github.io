// Initialized pointers to required functions 
var dotEnv = require("dotenv").config();
var request = require('request');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require("./keys.js");

// Populated and stored appropriate keys
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.key;


// Created constants to test against input.
const TWEETS = 'my-tweets';
const SPOTIFY_THIS_SONG = 'spotify-this-song';
const MOVIE_THIS = 'movie-this';
const DO_IT = 'do-what-it-says';

/** Function to retrieve and log last twenty tweets **/
function getTweets() {
    
    client.get('statuses/user_timeline', function(error, data, response) {
        if (!error) {
          var tweets = data;
          if(tweets.length > 20) {
              tweets.splice(20, tweets.length-20)
          }
          tweets.forEach(element => {
              console.log("Tweet text: " + element.text);
              console.log("Created at: " + element.created_at + "\n");
          });
        } else {
            console.log(error)
        }
      });
}

/**
 * Function serves to retrieve song information from Spotify
 * and log respective data.
 * @param {*} song_title: Song to retrieve from Spotify
 */
function getSong(song_title) {
    var title = song_title.join(" ");
    if(title === "") {
        title = "The Sign Ace of Base"
    }
    
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
    }
        var song_info = data.tracks.items[0];
        console.log("Artists: " + song_info.artists[0].name);
        console.log("Title: " + song_info.name);
        console.log("Preview: " + song_info.external_urls.spotify);
        console.log("Album: " + song_info.album.name); 
    
    });

}

/**
 * Serves to retrieve data from OMDB and log the respective data.
 * @param {*} movie_title : Movie title to search for
 */
function getMovie(movie_title) {
    var title = movie_title.join("+");
    if(title === "") {
        title = "Mr Nobody"
    }
    var queryURL = `https://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=${omdbKey}`;

    
    request(queryURL, function(error, response, body) {
        
        if(!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year released: " + JSON.parse(body).Year)
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
            console.log("Rotten Tomatoes Rating: " + (JSON.parse(body).Ratings).find( rating => rating.Source === 'Rotten Tomatoes').Value);
            console.log("Language: " + JSON.parse(body).Language)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors)
        }
    
    })

}

/**
 * Reads 'random.txt' and passes commands to the argumentHandler()
 */
function doIt() {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if(error) {
            console.log(error)
        }

        argumentHandler(data.split(','));
    })
}

/**
 * Determines from the first element in the args array which action
 * to perform and passes the appropriate arguments.
 * @param {*} args : Array that contains a task and sometimes title.
 */
function argumentHandler(args) {
    var arguments = args;
    
    switch(arguments[0]) {
        case TWEETS:
            getTweets();
            break;
        case SPOTIFY_THIS_SONG:
            getSong(arguments.splice(1, arguments.length - 1));
            break;
        case MOVIE_THIS:
            getMovie(arguments.splice(1, arguments.length - 1));
            break;
        case DO_IT:
            doIt();
            break;
        default:
            console.log("Sorry I don't know this command.");
    }
}

// Initializes the code by calling argumentHandler with the appropriate
// parameters from command-line.
argumentHandler(process.argv
    .splice(2, process.argv.length -2));