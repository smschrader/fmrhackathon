(function () {
    "use strict"; 
    var opening_config = false;
    
    $(".icon-cog").on("click", function(){        
        if(!opening_config){
            opening_config = true;
            $(this).parents("#tweet_header").stop().animate({
                paddingBottom: 77
            }, 500, function(){
                opening_config = true;
            }); 

            $("#tweet_config").stop().animate({
                bottom: 15
            }, 500);
        }
        else {            
             $(this).parents("#tweet_header").stop().animate({
                paddingBottom: 15
            }, 500, function(){
                    opening_config = false;
            }); 

            $("#tweet_config").stop().animate({
                bottom: -77
            }, 500);  
        }       
    });
    
    $("#search").on("click", function(){   
        console.log($("#search_terms").val());
        wsSend($("#search_terms").val());
    });
    
    
    var opts = {
      lines: 9, // The number of lines to draw
      length: 6, // The length of each line
      width: 2, // The line thickness
      radius: 7, // The radius of the inner circle
      corners: 0.1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };
    var spinner = new Spinner(opts).spin($(".spin")[0]);
    
    
    
  var bombs, createInfoWindow, feedTweet, lastOpenInfoWin, map, mapBomb, wsConnect, wsSend, connection;   

  map = void 0;

  bombs = [];

  $(document).ready(function() {
    var host, mapOptions, ws;
      mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(39.20, -84.50),
      zoomControl: false,
      disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname +         (window.location.port ? ":" + window.location.port : "");
    }
      
    console.log('Connect to websocket');  
    connection = wsConnect('');
    return connection.onmessage = function (message) {
        var json;
        json = JSON.parse(message.data);
        console.log(json);
        return mapBomb(json);
    };    
  });

  wsConnect = function(keywords) {
      connection = new WebSocket('ws://127.0.0.1:1337');

      connection.onopen = function () {
          console.log('Connection ready');
          wsSend('');
          //connection.send(JSON.stringify({trackList: ''}));
      };

      connection.onerror = function (error) {
          console.log('error', error);
      };

      return connection;
  };
    
  wsSend = function(keywords) {
      console.log('Connection send');
      connection.send(JSON.stringify({trackList: keywords}));
    console.log(JSON.stringify({trackList: keywords}));
      
      connection.onerror = function (error) {
          console.log('error', error);
      };
  };
    
  mapBomb = function(tweet) {
    var bomb, bombGif, lat, lng, marker, random, signPost;
    lat = tweet.coordinates[1];
    lng = tweet.coordinates[0];
    random = Math.random() * 100000;
    bombGif = '/includes/logos/fbomb.gif?';
    signPost = '/includes/logos/froggy.png';
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

  feedTweet = function(tweet, marker, infoWindow) {
    var HTMLtext, content, hour, img, minutes, sharedIMG, text, time, username;
    text = urlize(tweet.text);
    img = '<div class="avatar"><img style="padding:0px;" src="' + tweet.profile_img + '" class="profilePic"></img>';
    time = (new Date() - new Date(tweet.date)) / 60000;
    hour = Math.floor(time / 60);
    minutes = Math.ceil(time % 60);
    time = hour > 0 ? hour + 'h' + minutes + 'm' : minutes + 'm';
    time = '<span class="time">' + time + '</span>';
    username = '<span class="name">' + tweet.name + '&nbsp;<small class="twitter_user"><a href="http://twitter.com/' + tweet.username + '">@' + tweet.username + '</a></small>' + time;
    HTMLtext = '<span class="copy">' + text + '</p></div>';
    if (tweet.media_url) {
      sharedIMG = '<div class="row"><div class="tweet_image"><img class="img-responsive" style="padding-top:10px;padding-bottom:10px;width:100%;height:100%;" src="' + tweet.media_url + '"> </div></div>';
      content = '<li id="' + tweet.id + '" class="tweet">' + img + username + HTMLtext + sharedIMG;
    } else {
      content = '<li id="' + tweet.id + '" class="tweet">' + img + '<div class="user_data">' + username + HTMLtext + '</div>';
    }
    content += '</li>';
    $("#tweet_list").prepend(content);
    $("#" + tweet.id).bind("mouseenter", function(event) {
      return google.maps.event.trigger(marker, 'click');
    });
  };

  lastOpenInfoWin = null;

var urlize = function() {
    function t(e, t) {
        return e.substr(0, t.length) == t
    }

    function n(e, t) {
        return e.substr(e.length - t.length, t.length) == t
    }

    function r(e, t) {
        var n = 0;
        var r = 0;
        while (true) {
            r = e.indexOf(t, r);
            if (r != -1) {
                n++;
                r += t.length
            } else {
                break
            }
        }
        return n
    }

    function s(e) {
        var t = e.indexOf(":");
        e = e.substring(0, t).toLowerCase() + e.substring(t);
        if (e.indexOf("%") == -1 || e.match(i)) {
            return encodeURI(e)
        } else {
            return e
        }
    }

    function v(e, t) {
        var n = e.replace(/&/g, "&").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        if (t && !t.django_compatible) {
            n = n.replace(/\//g, "&#47;")
        }
        return n
    }

    function m(e) {
        return e.replace(/&/g, "&").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }

    function g(e) {
        var t;
        if (e.length == 2 && typeof e[1] == "object") {
            t = e[1]
        } else {
            t = {
                nofollow: e[1],
                autoescape: e[2],
                trim_url_limit: e[3],
                target: e[4]
            }
        }
        if (!("django_compatible" in t)) t.django_compatible = true;
        return t
    }

    function y(i, y) {
        function b(e, t) {
            if (t === undefined) t = y.trim_url_limit;
            if (t && e.length > t) return e.substr(0, t - 3) + "...";
            return e
        }
        y = g(arguments);
        var w = false;
        var E = y.django_compatible ? l : c;
        var S = y.django_compatible ? o : u;
        var x = y.django_compatible ? a : f;
        var T = e(i, E);
        for (var N = 0; N < T.length; N++) {
            var C = T[N];
            var k = undefined;
            if (C.indexOf(".") != -1 || C.indexOf("@") != -1 || C.indexOf(":") != -1) {
                var L = "";
                var A = C;
                var O = "";
                for (var M = 0; M < S.length; M++) {
                    var _ = S[M];
                    if (n(A, _)) {
                        A = A.substr(0, A.length - _.length);
                        O = _ + O
                    }
                }
                for (var M = 0; M < x.length; M++) {
                    var D = x[M][0];
                    var P = x[M][1];
                    if (t(A, D)) {
                        A = A.substr(D.length);
                        L = L + D
                    }
                    if (n(A, P) && r(A, P) == r(A, D) + 1) {
                        A = A.substr(0, A.length - P.length);
                        O = P + O
                    }
                }
                var H = undefined;
                var B = y.nofollow ? ' rel="nofollow"' : "";
                var j = y.target ? ' target="' + y.target + '"' : "";
                if (A.match(h)) H = s(A);
                else if (A.match(p)) H = s("http://" + A);
                else if (A.indexOf(":") == -1 && A.match(d)) {
                    H = "mailto:" + A;
                    B = ""
                }
                if (H) {
                    var F = b(A);
                    if (y.autoescape) {
                        L = v(L, y);
                        O = v(O, y);
                        H = m(H);
                        F = v(F, y)
                    }
                    A = '<a href="' + H + '"' + B + j + ">" + F + "</a>";
                    T[N] = L + A + O
                } else {
                    if (w) {} else if (y.autoescape) {
                        T[N] = v(C, y)
                    }
                }
            } else if (w) {} else if (y.autoescape) {
                T[N] = v(C, y)
            }
        }
        return T.join("")
    }
    var e;
    e = e || function(e) {
        var t = String.prototype.split,
            n = /()??/.exec("")[1] === e,
            r;
        r = function(r, i, s) {
            if (Object.prototype.toString.call(i) !== "[object RegExp]") {
                return t.call(r, i, s)
            }
            var o = [],
                u = (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.extended ? "x" : "") + (i.sticky ? "y" : ""),
                a = 0,
                i = new RegExp(i.source, u + "g"),
                f, l, c, h;
            r += "";
            if (!n) {
                f = new RegExp("^" + i.source + "$(?!\\s)", u)
            }
            s = s === e ? -1 >>> 0 : s >>> 0;
            while (l = i.exec(r)) {
                c = l.index + l[0].length;
                if (c > a) {
                    o.push(r.slice(a, l.index));
                    if (!n && l.length > 1) {
                        l[0].replace(f, function() {
                            for (var t = 1; t < arguments.length - 2; t++) {
                                if (arguments[t] === e) {
                                    l[t] = e
                                }
                            }
                        })
                    }
                    if (l.length > 1 && l.index < r.length) {
                        Array.prototype.push.apply(o, l.slice(1))
                    }
                    h = l[0].length;
                    a = c;
                    if (o.length >= s) {
                        break
                    }
                }
                if (i.lastIndex === l.index) {
                    i.lastIndex++
                }
            }
            if (a === r.length) {
                if (h || !i.test("")) {
                    o.push("")
                }
            } else {
                o.push(r.slice(a))
            }
            return o.length > s ? o.slice(0, s) : o
        };
        return r
    }();
    var i = /%(?![0-9A-Fa-f]{2})/;
    var o = [".", ",", ":", ";"];
    var u = [".", ",", ":", ";", ".)"];
    var a = [
        ["(", ")"],
        ["<", ">"],
        ["&lt;", "&gt;"]
    ];
    var f = [
        ["(", ")"],
        ["<", ">"],
        ["&lt;", "&gt;"],
        ["“", "”"],
        ["‘", "’"]
    ];
    var l = /(\s+)/;
    var c = /([\s<>"]+)/;
    var h = /^https?:\/\/\w/i;
    var p = /^www\.|^(?!http)\w[^@]+\.(com|edu|gov|int|mil|net|org)$/i;
    var d = /^\S+@\S+\.\S+$/;
    y.test = {};
    y.test.split = e;
    y.test.convert_arguments = g;
    return y
}()
  
  createInfoWindow = function(marker, tweet) {
    var content, hour, infoWindow, suffix, text;
    hour = tweet.date.match(/[0-9][0-9]:[0-9][0-9]/)[0];
    hour = parseInt(hour.match(/[0-9][0-9]/)[0]) - (new Date().getTimezoneOffset() / 60);
    if (hour <= 0) {
      hour += 24;
    }
    suffix = hour > 12 ? "pm" : "am";
    if (suffix === "pm") {
      hour -= 12;
    }
    text = urlize(tweet.text, {
      target: '_blank'
    });
    content = '<img style="float:left;padding-right:2px;" align=left" src=' + tweet.profile_img + '><p><strong>' + tweet.name + '</strong><br><small><a href="http://twitter.com/' + tweet.username + '" target="_blank"">@' + tweet.username + '</a></small><br>' + hour.toString() + tweet.date.match(/:[0-9][0-9]/) + suffix + ' - ' + tweet.date.match(/[0-9][0-9]/i)[0] + tweet.date.match(/\s[a-z][a-z][a-z]/i) + ' ' + (new Date().getFullYear() + '').slice(-2) + '<br>' + text;
    if (tweet.media_url) {
      infoWindow = new google.maps.InfoWindow({
        content: content + '<img border="0" style="width:100%;" align=left" src=' + tweet.media_url + '></p>',
        maxWidth: 175
      });
    } else {
      infoWindow = new google.maps.InfoWindow({
        content: content + '</p>',
        maxWidth: 225
      });
    }
    google.maps.event.addListener(marker, "click", function() {
      if (lastOpenInfoWin) {
        lastOpenInfoWin.close();
      }
      lastOpenInfoWin = infoWindow;
      return infoWindow.open(marker.get("map"), marker);
    });
    feedTweet(tweet, marker, infoWindow);
  };

}).call(this);
