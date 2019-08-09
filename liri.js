const axios = require('axios');
const moment = require('moment');
let Spotify = require('node-spotify-api');
let keys = require("./keys.js");
const fs = require('fs');


//var command = process.argv [2];
var command = process.argv[2];
var name = process.argv[3];

runCommand(command, name);


function runCommand(command, name) {
  switch (command) {
    case 'concert-this':
      concertThis();
      break;
    case 'spotify-this-song':
      spotifyThisSong(name);
      break;
    case 'movie-this':
      movieThis(name);
      break;
    case 'do-what-it-says':
      doWhatItSays();
    default:
    //doWhatItSays();
  }
}


function concertThis(search) {
  var search = process.argv[3];
  if (!search) {
    search = "The Snake Corps"
  }
  var quiry = "http://rest.bandsintown.com/artists/" + search + "/events?app_id=" + keys.bit;
  axios.get(quiry).then(function (response) {
    console.log(response.data[0].venue.city);
  })
}

function movieThis(name) {
  //var moviethis = process.argv [3];
  //console.log(keys.movie_db.key);
  console.log (name);

  if (!name) {
    name = "Drive"
  }
  var quiry = "http://www.omdbapi.com/?t=" + name + "&apikey=" + keys.movie_db.key
  axios.get(quiry).then(function (response) {    
 
    var title = response.data.Title;
    var year = response.data.Year;
    var actors = response.data.Actors;
    var plot = response.data.Plot;
    console.log(title);
    console.log(year);
    console.log(actors);
    console.log(plot);

  })
}

function spotifyThisSong(search) {
  if (!search) {
    search = "Eminem"
  }
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: search }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var firstResult = data.tracks.items[0];
    var artist = firstResult.artists[0].name;
    var song = firstResult.name;
    var preview = firstResult.external_urls.spotify;
    var album = firstResult.album.name;
    //console.log(JSON.stringify(firstResult, null, 2)); 
    console.log(" ");
    console.log(" ");
    console.log(artist);
    console.log(song);
    console.log(preview);
    console.log(album);
  });
}

function doWhatItSays() {
  //Open up the random.txt
  fs.readFile('random.txt', function (err, data) {
    if (err) throw err;
    console.log("Opened file successfully: " + data);
    // Break up line by comma
    var commandLine = data.toString();
    var commandArray = commandLine.split(",");
    var command = commandArray[0];
    var name = commandArray[1];
    console.log("First argument is: " + command);
    console.log("Second argument is: " + name);
    runCommand(command, name);
  });
  //Read from it line by line
  //Run Command

  //   `node liri.js do-what-it-says`
  //     Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
  //      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
}





// Spotify
// BandsInTown
// OMDB 

// 
// Get the command from the user
// how to access one elemen of the arr
// example:  node liri.js spotify-this-song 'California Love'
// How do we get just the last two strings/arguments 
// establish if-than statement 


