import mongoose from "mongoose"
mongoose.Promise = global.Promise

const UserSchema = mongoose.Schema({
  nickname: {type: String},
  email: {type: String, required: true, unique: true},
  isPasswordValid: {type: Boolean, default: false},
  password: {type: String},
  firstname: {type: String},
  lastname: {type: String},
  profilePhoto: {type: String},
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
