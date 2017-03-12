'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotFoundError = exports.NotFoundError = function NotFoundError(target) {
  _classCallCheck(this, NotFoundError);

  this.target = target;
};

var ValidationError = exports.ValidationError = function ValidationError(target, action) {
  _classCallCheck(this, ValidationError);

  this.target = target;
  this.action = action;
};

var BadAuthorizationError = exports.BadAuthorizationError = function BadAuthorizationError(problem) {
  _classCallCheck(this, BadAuthorizationError);
};

var NotAuthorizedError = exports.NotAuthorizedError = function NotAuthorizedError() {
  _classCallCheck(this, NotAuthorizedError);
};

var handleError = exports.handleError = function handleError(err, res, message) {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ results: null, message: err.target + ' not found' });
  } else if (err instanceof ValidationError) {
    return res.status(400).json({ results: null, message: 'Parameter ' + err.target + ' is ' + err.action });
  } else if (err instanceof BadAuthorizationError) {
    return res.status(401).json({ results: null, message: 'Authorization header is ' + err.problem });
  } else if (err instanceof NotAuthorizedError) {
    return res.status(403).json({ results: null, message: 'You are noe authorized to perform this action' });
  }
  res.status(500).json({ results: null, message: message });
};