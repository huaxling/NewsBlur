// Generated by CoffeeScript 1.4.0
(function() {
  var REDIS_SERVER, SECURE, ca, certificate, fs, io, log, privateKey, redis;

  fs = require('fs');

  redis = require('redis');

  log = require('./log.js');

  REDIS_SERVER = process.env.NODE_ENV === 'development' ? 'localhost' : 'db13';

  SECURE = !!process.env.NODE_SSL;

  if (SECURE) {
    privateKey = fs.readFileSync('./config/certificates/newsblur.com.key').toString();
    certificate = fs.readFileSync('./config/certificates/newsblur.com.crt').toString();
    ca = fs.readFileSync('./config/certificates/intermediate.crt').toString();
    io = require('socket.io').listen(8889, {
      key: privateKey,
      cert: certificate,
      ca: ca
    });
  } else {
    io = require('socket.io').listen(8888);
  }

  io.configure('production', function() {
    io.set('log level', 1);
    io.enable('browser client minification');
    io.enable('browser client etag');
    return io.enable('browser client gzip');
  });

  io.configure('development', function() {
    return io.set('log level', 2);
  });

  io.sockets.on('connection', function(socket) {
    var ip;
    ip = socket.handshake.headers['x-real-ip'] || socket.handshake.address.address;
    socket.on('subscribe:feeds', function(feeds, username) {
      var _ref, _ref1,
        _this = this;
      this.feeds = feeds;
      this.username = username;
      log.info(this.username, ("Connecting (" + feeds.length + " feeds, " + ip + "),") + (" (" + (io.sockets.clients().length) + " users on) ") + (" " + (SECURE ? "(SSL)" : "(non-SSL)")));
      if (!this.username) {
        return;
      }
      if ((_ref = socket.subscribe) != null) {
        _ref.on("error", function(err) {
          return console.log(" ---> Error (pre): " + err);
        });
      }
      if ((_ref1 = socket.subscribe) != null) {
        _ref1.end();
      }
      socket.subscribe = redis.createClient(6379, REDIS_SERVER);
      socket.subscribe.on("error", function(err) {
        console.log(" ---> Error: " + err);
        return socket.subscribe.end();
      });
      socket.subscribe.on("connect", function() {
        socket.subscribe.subscribe(_this.feeds);
        return socket.subscribe.subscribe(_this.username);
      });
      return socket.subscribe.on('message', function(channel, message) {
        log.info(_this.username, "Update on " + channel + ": " + message);
        if (channel === _this.username) {
          return socket.emit('user:update', channel, message);
        } else {
          return socket.emit('feed:update', channel, message);
        }
      });
    });
    return socket.on('disconnect', function() {
      var _ref, _ref1;
      if ((_ref = socket.subscribe) != null) {
        _ref.end();
      }
      return log.info(this.username, ("Disconnect (" + ((_ref1 = this.feeds) != null ? _ref1.length : void 0) + " feeds, " + ip + "),") + (" there are now " + (io.sockets.clients().length - 1) + " users. ") + (" " + (SECURE ? "(SSL)" : "(non-SSL)")));
    });
  });

}).call(this);
