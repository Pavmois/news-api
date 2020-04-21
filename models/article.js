const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(u) {
        return validator.isURL(u);
      },
      message: (props) => `'${props.value}' Здесь должна быть ссылка!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(u) {
        return validator.isURL(u);
      },
      message: (props) => `'${props.value}' Здесь должна быть ссылка!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
