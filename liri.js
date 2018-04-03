require('dotenv').config();

let [node, liri, command, input] = process.argv
let keys = require('./keys.js');
let fs = require('fs')
let Spotify = require('node-spotify-api');

let spot_keys = keys.spotify;
let  spotify = new Spotify({
    id: spot_keys.id,
    secret: spot_keys.secret,
  });

if (command === 'spotify-this-song') {

    spotify.search({ type: 'track', query: input, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data).split(','))
    })
}