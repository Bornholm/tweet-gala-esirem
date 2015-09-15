var Twitter = require('twitter');
var fs = require('fs');
var path = require('path');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

client.stream('statuses/filter', {track: '#gala-esirem-2015'},  function(stream){

  stream.on('data', saveTweet);

  stream.on('error', function(error) {
    console.log(error);
  });

});

function saveTweet(tweet) {

  var media = tweet.entities.media;
  var id = tweet.id_str;

  var jsonPath = path.join('data', id+'.json');
  var jsonStr = JSON.stringify(tweet, null, 2);

  fs.writeFile(jsonPath, jsonStr, {encoding: 'utf8'}, function(err) {
    if(err) console.error(err);
    console.log('Tweet %s saved', id);
  });

}
