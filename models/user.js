const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const { ErrorUnauthorized } = require('../moduls/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(e) {
        return validator.isEmail(e);
      },
      message: (props) => `'${props.value}' E-mail`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  if (!email || !password) {
    throw new ErrorUnauthorized('Неправильные почта или пароль!');
  }
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized('Неверные e-mail или пароль'));
      }
      return bcryptjs.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized('Неверные e-mail или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);