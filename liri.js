const dotEnv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let query = process.argv.slice(3).join("%20");


if(command === "concert-this") concertThis();
if(command === "movie-this") movieThis();
if(command === "spotify-this") spotifyThis();
if(command === "do-what-it-says") doWhatItSays();


function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
        .then((response)=>{
            console.log("==================================================");
            for(let i=0; i<response.data.length; i++){
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                let date = response.data[i].datetime.substring(0,10);
                console.log(moment(date, "YYYY-MM-DD").format("MM/DD/YYYY") + "\n");
            }
            console.log("==================================================");
        });
}

function spotifyThis(){
    axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/search?q=' + query +'&type=track',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer BQDHc9CId7-nFGnKqFbJLa5f2L1i8ZPzj3Sq9PevWE9gnis8loVkal7nm1wdN1KG9k6WYGtdXzNpm5lkgS9DLxpGZ9p4P-1gOvNWg-IXVkSABxaxbPjpWNNP1qpx8sfkfv4UTAmbgW6iqR5OsW4'
        }
    }).then((response)=>{
        console.log("==================================================");
        console.log("Artist: " + response.data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + response.data.tracks.items[0].name);
        console.log("Album: " + response.data.tracks.items[0].album.name);
        console.log("Preview song: " + response.data.tracks.items[0].preview_url);
        console.log("==================================================");
    })
}

function movieThis(){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + query)
        .then((response)=>{
            console.log("==================================================");
            console.log(response.data.Title);
            console.log("Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);
            console.log("==================================================");
        });
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", (err, data)=>{
        if(err) throw err;
        let args = data.split(" ");
        command = args[0];
        query = args.slice(1).join("%20");
        if(command === "concert-this") concertThis();
        if(command === "movie-this") movieThis();
        if(command === "spotify-this") spotifyThis();
        });
}