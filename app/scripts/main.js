(function () {
  var bombs, createInfoWindow, feedTweet, lastOpenInfoWin, map, mapBomb;

  map = void 0;

  bombs = [];

  $(document).ready(function() {
    var host, mapOptions, ws;
    mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(5, -58),
      zoomControl: true,
      disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    }
      
    getTweets('');
//    host = location.origin.replace(/^http/, 'ws');
//    ws = new WebSocket(host);
//    return ws.onmessage = function(event) {
//      var data;
//      data = JSON.parse(event.data);
//      return mapBomb(data);
//    };
  });

  getTweets = function(keywords) {
      var connection = new WebSocket('ws://127.0.0.1:1337');

  connection.onopen = function () {
    console.log('Connection ready');

    connection.send(JSON.stringify({trackList: keywords}));
  };

  connection.onerror = function (error) {
    console.log('error', error);
  };

  connection.onmessage = function (message) {
    try {
      var json = JSON.parse(message.data);
      console.log(json);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
    }
  };
  };
    
  mapBomb = function(tweet) {
    var bomb, bombGif, lat, lng, marker, random, signPost;
    lat = tweet.coordinates[1];
    lng = tweet.coordinates[0];
    random = Math.random() * 100000;
    bombGif = '/img/fbomb.gif?';
    signPost = '/img/signPost.png';
    bomb = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      icon: bombGif + random,
      optimized: false,
      raiseOnDrag: false,
      draggable: false,
      map: map
    });
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      icon: signPost,
      raiseOnDrag: false,
      draggable: false,
      animation: google.maps.Animation.DROP
    });
    createInfoWindow(marker, tweet);
    setTimeout(function() {
      bomb.setMap(null);
      marker.setMap(map);
      return createInfoWindow(marker, tweet);
    }, 2500);
  };

//  feedTweet = function(tweet, marker, infoWindow) {
//    var HTMLtext, content, hour, img, minutes, sharedIMG, text, time, username;
//    text = urlize(tweet.text);
//    img = '<div class="row"><img style="padding:0px;" src="' + tweet.profile_img + '" class="col-xs-2 img-circle profilePic"></img>';
//    time = (new Date() - new Date(tweet.date)) / 60000;
//    hour = Math.floor(time / 60);
//    minutes = Math.ceil(time % 60);
//    time = hour > 0 ? hour + 'h' + minutes + 'm' : minutes + 'm';
//    time = '<span class="col-xs-1 col-xs-offset-2 tweetTime">' + time + '</span>';
//    username = '<p><strong class="col-xs-4" style="padding-left:5px;padding-right:3px;color:white;">' + tweet.name + '&nbsp;</strong><small class="col-xs-2" style="padding-left:5px;padding-right:0px"><a href="http://twitter.com/' + tweet.username + '">@' + tweet.username + '</a></small>' + time;
//    HTMLtext = '<p class="col-xs-10 col-xs-offset-2 text">' + text + '</p></div>';
//    if (tweet.media_url) {
//      sharedIMG = '<div class="row"><div class="col-xs-12"><img class="img-responsive" style="padding-top:10px;padding-bottom:10px;width:100%;height:100%;" src="' + tweet.media_url + '"> </div></div>';
//      content = '<div id="' + tweet.id + '"class="tweet">' + img + username + HTMLtext + sharedIMG;
//    } else {
//      content = '<div id="' + tweet.id + '"class="tweet">' + img + username + HTMLtext;
//    }
//    content += '<hr></div>';
//    $(".tweetstream").prepend(content);
//    $("#" + tweet.id).bind("mouseenter", function(event) {
//      return google.maps.event.trigger(marker, 'click');
//    });
//  };
//
//  lastOpenInfoWin = null;
//
//  createInfoWindow = function(marker, tweet) {
//    var content, hour, infoWindow, suffix, text;
//    hour = tweet.date.match(/[0-9][0-9]:[0-9][0-9]/)[0];
//    hour = parseInt(hour.match(/[0-9][0-9]/)[0]) - (new Date().getTimezoneOffset() / 60);
//    if (hour <= 0) {
//      hour += 24;
//    }
//    suffix = hour > 12 ? "pm" : "am";
//    if (suffix === "pm") {
//      hour -= 12;
//    }
//    text = urlize(tweet.text, {
//      target: '_blank'
//    });
//    content = '<img style="float:left;padding-right:2px;" align=left" src=' + tweet.profile_img + '><p><strong>' + tweet.name + '</strong><br><small><a href="http://twitter.com/' + tweet.username + '" target="_blank"">@' + tweet.username + '</a></small><br>' + hour.toString() + tweet.date.match(/:[0-9][0-9]/) + suffix + ' - ' + tweet.date.match(/[0-9][0-9]/i)[0] + tweet.date.match(/\s[a-z][a-z][a-z]/i) + ' ' + (new Date().getFullYear() + '').slice(-2) + '<br>' + text;
//    if (tweet.media_url) {
//      infoWindow = new google.maps.InfoWindow({
//        content: content + '<img border="0" style="width:100%;" align=left" src=' + tweet.media_url + '></p>',
//        maxWidth: 175
//      });
//    } else {
//      infoWindow = new google.maps.InfoWindow({
//        content: content + '</p>',
//        maxWidth: 225
//      });
//    }
//    google.maps.event.addListener(marker, "click", function() {
//      if (lastOpenInfoWin) {
//        lastOpenInfoWin.close();
//      }
//      lastOpenInfoWin = infoWindow;
//      return infoWindow.open(marker.get("map"), marker);
//    });
//    feedTweet(tweet, marker, infoWindow);
//  };

}).call(this);
