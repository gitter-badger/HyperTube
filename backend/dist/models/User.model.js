'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var UserSchema = _mongoose2.default.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  profilePhoto: { type: String, required: true }
});

UserSchema.virtual('lightSerialize').get(function () {
  return {
    id: this._id,
    email: this.email,
    nickname: this.nickname,
    profilePhoto: this.profilePhoto
  };
});

UserSchema.virtual('serialize').get(function () {
  return {
    id: this._id,
    email: this.email,
    nickname: this.nickname,
    firstname: this.firstname,
    lastname: this.lastname,
    profilePhoto: this.profilePhoto
  };
});

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;