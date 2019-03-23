const dotEnv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
// let keys = require("./keys.js");
// let spotify = require("node-spotify-api");
// let other = new Spotify(keys.spotify);
let command = process.argv[2];
let query = process.argv.slice(3).join("%20");

console.log(command);

console.log(query);

if(command === "concert-this") concertThis();


function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
        .then((response)=>{
            console.log(response.data);
            for(let i=0; i<response.data.length; i++){
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                let date = response.data[i].datetime.substring(0,10);
                console.log(moment(date, "YYYY-MM-DD").format("MM/DD/YYYY") + "\n");
            }
        })
}