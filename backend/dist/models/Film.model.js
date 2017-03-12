'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilmSchema = _mongoose2.default.Schema({
  name: { type: String, required: true },
  video: { type: String, required: true },
  meta: { type: _mongoose2.default.Schema.Types.Mixed }
});

FilmSchema.virtual('serialize').get(function () {
  return {
    id: this._id,
    name: this.name,
    video: this.video
  };
});

var Film = _mongoose2.default.model('Film', FilmSchema);

exports.default = Film;