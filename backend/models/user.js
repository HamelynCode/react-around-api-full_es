const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid url!`,
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(www\.)?.{1,}/.test(v),
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
