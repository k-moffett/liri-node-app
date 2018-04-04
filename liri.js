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
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        let artist = JSON.stringify(data.tracks.items[0].artists[0].name)
        let track_name = JSON.stringify(data.tracks.items[0].name)
        let preview = JSON.stringify(data.tracks.items[0].preview_url)
        let album = JSON.stringify(data.tracks.items[0].album.name)

        fs.writeFile('./spotify_songz.txt', 'Artist: '+artist+' Song Title: '+track_name+' Song Preview: '+preview+' Album Title: '+album, (err) => {
            if (err) throw err;
          });

        fs.readFile('./spotify_songz.txt', (err, data) => {
            if (err) throw err;
            console.log(data.toString('utf-8'));
          });
   
    })


}