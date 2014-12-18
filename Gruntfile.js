// Generated on 2014-12-17 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'


var twit = require('twit'),
    //WebSocketServer = require('ws').Server,
    config = require('./config.json');

//All the converted coffee websocket madness!
var Twitter, centerPoint, limit, retweet, retweetedUsers, retweets, startStream, wss, server;

//wss = new WebSocketServer({
//  port: 8000
//});
//
//wss.on('connection', function(ws) {
//  return console.log('WebSocket Connection!');
//});

Twitter = new twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.oauth_token,
  access_token_secret: config.oauth_token_secret
});

//retweets = [];
//
//retweetedUsers = [];
//
//wss.broadcast = function(data) {
//  var i, _results;
//  _results = [];
//  for (i in this.clients) {
//    _results.push(this.clients[i].send(data));
//  }
//  return _results;
//};
//
//startStream = function() {
//  var stream;
//  stream = Twitter.stream('statuses/filter', {
//    track: config.track
//  });
//  stream.on('tweet', function(tweet) {
//    var tweetData;
//    retweet(tweet.user.screen_name, tweet.id_str, tweet.user.followers_count);
//    tweetData = void 0;
//    if (tweet.coordinates) {
//      tweetData = {
//        username: tweet.user.screen_name,
//        name: tweet.user.name,
//        date: tweet.created_at,
//        text: tweet.text,
//        coordinates: tweet.coordinates.coordinates,
//        profile_img: tweet.user.profile_image_url
//      };
//      if (tweet.entities.media) {
//        tweetData['media_url'] = tweet.entities.media[0].media_url;
//      }
//      return wss.broadcast(JSON.stringify(tweetData));
//    } else if (tweet.place) {
//      if (tweet.place.bounding_box) {
//        if (tweet.place.bounding_box.type === 'Polygon') {
//          return centerPoint(tweet.place.bounding_box.coordinates[0], function(center) {
//            tweetData = {
//              username: tweet.user.screen_name,
//              name: tweet.user.name,
//              date: tweet.created_at,
//              text: tweet.text,
//              coordinates: center,
//              profile_img: tweet.user.profile_image_url
//            };
//            if (tweet.entities.media) {
//              tweetData['media_url'] = tweet.entities.media[0].media_url;
//            }
//            return wss.broadcast(JSON.stringify(tweetData));
//          });
//        } else {
//          return console.log('WTF Place: ' + util.inspect(tweet.place));
//        }
//      } else {
//        return console.log('Place without bounding_box: ' + util.inspect(tweet.place));
//      }
//    }
//  });
//  stream.on('limit', function(limitMessage) {
//    return console.log('mgingras (limit): ' + limitMessage.limit.track);
//  });
//  stream.on('warning', function(warning) {
//    return console.log('mgingras (warning): ' + warning.warning.code + ' : ' + warning.warning.message);
//  });
//  stream.on('disconnect', function(disconnectMessage) {
//    console.log('mgingras (disconnect): ' + disconnectMessage.disconnect.reason);
//    return setTimeout(startStream, 5000);
//  });
//  stream.on('reconnect', function(req, res, connectInterval) {
//    console.log('mgingras (reconnect): ');
//    console.log('Reqeuest: ' + req);
//    console.log('Response: ' + res);
//    return console.log('Connection Interval: ' + connectInterval);
//  });
//};
//
//startStream();
//
//centerPoint = function(coords, callback) {
//  var centerPointX, centerPointY, coord, _i, _len;
//  centerPointX = centerPointY = 0;
//  for (_i = 0, _len = coords.length; _i < _len; _i++) {
//    coord = coords[_i];
//    centerPointX += coord[0];
//    centerPointY += coord[1];
//  }
//  return callback([centerPointX / coords.length, centerPointY / coords.length]);
//};
//
//limit = 0;
//
//setInterval(function() {
//  return limit = 1;
//}, 600000);
//
//retweet = function(screen_name, tweetID, followers) {
//  var index, mostPopular, tweet, tweetData, _i, _len;
//  if (limit !== 0 && retweets.length > 0) {
//    limit--;
//    mostPopular = 0;
//    index = 0;
//    for (_i = 0, _len = retweets.length; _i < _len; _i++) {
//      tweet = retweets[_i];
//      if (tweet.followers >= mostPopular) {
//        mostPopular = tweet.followers;
//        index = _i;
//      }
//    }
//    return Twitter.post('statuses/retweet/:id', {
//      id: retweets[index].tweetID
//    }, function(err) {
//      if (err) {
//        console.log('mgingras (Retweet Error): ' + util.inspect(err));
//      }
//      retweetedUsers.push(screen_name);
//      return retweets = [];
//    });
//  } else {
//    if (retweetedUsers.indexOf(screen_name) < 0) {
//      tweetData = {
//        screen_name: screen_name,
//        tweetID: tweetID,
//        followers: followers
//      };
//      return retweets.push(tweetData);
//    }
//  }
//};
//
//
//process.on('uncaughtException', function(err) {
//  return console.log('Uncaught Error!!! : ' + err);
//});



//All the grunt stuff!
module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },      
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },      
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },
      
    jade: {
        dist: {
            files: [{
                expand: true,
                cwd: '.tmp',
                src: ['**/*.html'], // Actual pattern(s) to match.
                dest: '<%= config.dist %>'
            }]
        },
        compile: {
           options: {
               client: false,
               pretty: true
           },
           files: [ {
            cwd: '<%= config.app %>/views/',
            dest: '.tmp',
             src: ['**/*.jade'],            
             expand: true,
             ext: ".html"
           } ]
        }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
        },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
      
    websocket: {
          options: {
            port: 1337,
            handler: 'server_js/websocket_handler.js'

          },
          target: {}
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            'includes/{,*/}{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      includes: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/includes',
        dest: '.tmp/includes/',
        src: '{,*/}{,*/}*.*'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles',
        'copy:includes'  
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
        'websocket',
      'autoprefixer',
      'connect:livereload',
    'jade',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });
    
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
      'jade:dist',
    'useminPrepare',      
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'modernizr',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
    
  
};
