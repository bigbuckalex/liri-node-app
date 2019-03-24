const dotEnv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
// let keys = require("./keys.js");
// let spotify = require("node-spotify-api");
// let other = new Spotify(keys.spotify);
let command = process.argv[2];
let query = process.argv.slice(3).join("%20");


if(command === "concert-this") concertThis();
if(command === "movie-this") movieThis();


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
        })
}

function spotifyThis(){
    
}

function movieThis(){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + query)
        .then((response)=>{
            console.log(response.data);
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
        })
}