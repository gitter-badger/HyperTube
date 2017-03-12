import mongoose from "mongoose"
import passwordEncryption from "passwordEncryption"
mongoose.Promise = global.Promise

const UserSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  nickname: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  valid: {type: Boolean, required: true},
  firstname: {type: String},
  lastname: {type: String},
  profilePhoto: {type: String, required: true},
})

UserSchema.virtual('lightSerialize').get(function() {
  return {
    id: this._id,
    email: this.email,
    nickname: this.nickname,
    profilePhoto: this.profilePhoto,
  }
})

UserSchema.virtual('serialize').get(function() {
  return {
    id: this._id,
    email: this.email,
    nickname: this.nickname,
    firstname: this.firstname,
    lastname: this.lastname,
    profilePhoto: this.profilePhoto,
  }
})

const User = mongoose.model('User', UserSchema)

export default User
