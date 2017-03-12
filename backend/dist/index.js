"use strict";

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require("passport-jwt");

var _index = require("../config/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./routes/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = console;

var app = (0, _express2.default)();

var env = process.env.node_end || 'development';
var config = _index2.default[env];

global.User = require('./models/User.model.js').default;

app.use((0, _cors2.default)());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

_passport2.default.use(new _passportJwt.Strategy({
  jwtFromRequest: function jwtFromRequest(req) {
    try {
      console.log('Header', req.headers.authorization);
      if (!req.headers || !req.headers.authorization) {
        return null;
      }

      var splitted = req.headers.authorization.split(' ');
      if (splitted.length !== 2 || splitted[0] !== 'Bearer') {
        return null;
      }
      console.log('Token', splitted[1]);
      return splitted[1];
    } catch (e) {
      return null;
    }
  },
  secretOrKey: config.jwt.secret
}, function (payload, done) {
  console.log('Payload', payload);
  User.findById(payload.id, function (err, user) {
    if (err) {
      return done(err, false);
    } else if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect("mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.dbName);
var db = _mongoose2.default.connection;
db.on('error', function (err) {
  Logger.log('FAILED TO CONNECT', err);
  process.exit(1);
});

db.once('open', function () {
  (0, _index4.default)(app);
  app.listen(config.server.port);
  app.emit('ready');
  Logger.log("App is running and listening to port " + config.server.port);
});