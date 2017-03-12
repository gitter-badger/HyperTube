import mongoose from "mongoose"

const FilmSchema = mongoose.Schema({
  name: {type: String, required: true},
  video: {type: String},
})

FilmSchema.virtual('serialize').get(function() {
  return {
    id: this._id,
    name: this.name,
  }
})

const Film = mongoose.model('Film', FilmSchema)

export default Film
