//Require NPM Module
var twit = require('twit'),
    Log = require('log'),
    log = new Log('info'),
    config = require('../config.json');

//intiatlize twit with api keys
var Twitter = new twit({
    consumer_key:         config.consumer_key
  , consumer_secret:      config.consumer_secret
  , access_token:         config.access_token
  , access_token_secret:  config.access_token_secret
});

module.exports = function (request) {
  var connection = request.accept(null, request.origin);

  log.info('client connected: ', request.origin);

    var startStream = function() {
      var stream;
      stream = Twitter.stream('statuses/filter', {
        track: config.track
      });
      stream.on('tweet', function(tweet) {
        var tweetData;

        //Check to see if tweet has coordinates or not, we only want tweets we can plot on a map. 
        
          //Get the exact coordinates of a tweet if it has them.
        if (tweet.coordinates) {
          tweetData = {
            username: tweet.user.screen_name,
            name: tweet.user.name,
            date: tweet.created_at,
            text: tweet.text,
            coordinates: tweet.coordinates.coordinates,
            profile_img: tweet.user.profile_image_url
          };
          if (tweet.entities.media) {
            tweetData['media_url'] = tweet.entities.media[0].media_url;
          }
          
          //return twitter data back to client on socket
          return connection.sendUTF(JSON.stringify(tweetData));
        }
        else if (tweet.place) {
          //get a bounding box if there are no exact coordinates provided
          if (tweet.place.bounding_box) {
            if (tweet.place.bounding_box.type === 'Polygon') {
              return centerPoint(tweet.place.bounding_box.coordinates[0], function(center) {
                tweetData = {
                  username: tweet.user.screen_name,
                  name: tweet.user.name,
                  date: tweet.created_at,
                  text: tweet.text,
                  coordinates: center,
                  profile_img: tweet.user.profile_image_url
                };
                if (tweet.entities.media) {
                  tweetData['media_url'] = tweet.entities.media[0].media_url;
                }
                //return twitter data back to client on socket
                return connection.sendUTF(JSON.stringify(tweetData));
              });
            } else {
              //Not
              return log.info('Non-Polygon Bounding Box Type: ' + (JSON.stringify(tweet)));
            }
          } else {
            return log.info('Tweet without bounding_box: ' + (JSON.stringify(tweet)));
          }
        } else {
          return log.info('Tweet without Coords or Bounding Box: ' + (JSON.stringify(tweet)));
        }
      });
      
      //stream  twitter connection problems to console for monitoring
      stream.on('limit', function(limitMessage) {
        return log.notice('mgingras (limit): ' + limitMessage.limit.track);
      });
      stream.on('warning', function(warning) {
        return log.warn('mgingras (warning): ' + warning.warning.code + ' : ' + warning.warning.message);
      });
      stream.on('disconnect', function(disconnectMessage) {
        log.error('mgingras (disconnect): ' + disconnectMessage.disconnect.reason);
        return setTimeout(startStream, 5000);
      });
      stream.on('reconnect', function(req, res, connectInterval) {
        log.info('mgingras (reconnect): ');
        log.info('Reqeuest: ' + req);
        log.info('Response: ' + res);
        return log.info('Connection Interval: ' + connectInterval);
      });
    };

  
  //Start the connection to twitter and and stream that data to the client socket  
  startStream();
        
};
