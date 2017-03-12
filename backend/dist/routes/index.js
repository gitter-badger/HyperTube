"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _util = require("util");

var _UserRoute = require("./User.route.js");

var _UserRoute2 = _interopRequireDefault(_UserRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var routes = [].concat(_toConsumableArray(_UserRoute2.default));

var createRouter = function createRouter(app) {
  var router = _express2.default.Router();

  routes.forEach(function (r) {
    if (r.validators) {
      router[r.method.toLowerCase()].apply(router, [r.path].concat(_toConsumableArray(r.validators), [r.handler]));
    } else {
      router[r.method.toLowerCase()](r.path, r.handler);
    }
  });
  app.use(router);
};

exports.default = createRouter;