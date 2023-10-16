const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema(
  {

    user_name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    access_key: {
      type: String,
      required: true
    },
    secret_key: {
      type: String,
      required: true
    },
    creationDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {collection: 'users'}
)
const User = model('User', userSchema)
module.exports = User;
