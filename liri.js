require('dotenv').config();
let keys = require('./keys.js');
let fs = require('fs')
let request = require('request')
let Spotify = require('node-spotify-api');
let  spotify = new Spotify(keys.spotify);
let [node, liri, command, ...input] = process.argv

if (command === 'spotify-this-song') {
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        let artist = JSON.stringify(data.tracks.items[0].artists[0].name)
        let track_name = JSON.stringify(data.tracks.items[0].name)
        let preview = JSON.stringify(data.tracks.items[0].preview_url)
        let album = JSON.stringify(data.tracks.items[0].album.name)

        fs.writeFile('./spotify_songz.txt', 'Artist:'+artist+' Song Title:'+track_name+' Song Preview:'+preview+' Album Title:'+album, (err) => {
            if (err) throw err;
          });

        fs.readFile('./spotify_songz.txt', (err, data) => {
            if (err) throw err;
            console.log(data.toString('utf-8'));
          });  
    })
}

if (command === 'movie-this') {
  request('http://www.omdbapi.com/?apikey=b9217a12&t='+input+'&r=json&plot=short&', function (error, response, body) {
  if (error) {console.log('error:', error)} 
  let movie_data = JSON.parse(body)
  console.log('Title: '+movie_data.Title) 
  console.log('Release Date: '+movie_data.Year)
  console.log('IMDB Rating: '+movie_data.imdbRating)
  console.log(movie_data.Ratings[1].Source+': '+movie_data.Ratings[1].Value)
  console.log('Country Produced:'+movie_data.Production)
  console.log('Language(s):'+movie_data.Language)
  console.log('Plot:'+movie_data.Plot)
  console.log('Actors:'+movie_data.Actors)
  });
}