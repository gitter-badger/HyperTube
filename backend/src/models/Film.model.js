import mongoose from "mongoose"

const CommentSchema = mongoose.Schema({
  value: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
})

const FilmSchema = mongoose.Schema({
  name: {type: String, required: true},
  video: {type: String},
  originTorrent: {type: String},
  comments: [CommentSchema],
})

FilmSchema.virtual('serialize').get(function() {
  return {
    id: this._id,
    name: this.name,
  }
})

const Film = mongoose.model('Film', FilmSchema)

export default Film
