const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'User',
  },
  blackList: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userModel = model('User', userSchema);

module.exports = {
    userModel,
}
