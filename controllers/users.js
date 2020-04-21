require('dotenv').config();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../moduls/key');
const User = require('../models/user');
const checkNull = require('../moduls/checkNull');
const { ErrorBadRequest } = require('../moduls/errors');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(checkNull)
    .then((user) => res.send({ name: user, email: user.email }))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (password && password.length >= 8) {
      return bcryptjs.hash(password, 10)
      .then((hash) => User.create({ name, email, password: hash }))
      .then(checkNull)
      .then((user) => res.send({
        name: user.name,
        email: user.email,
      }))
      .catch((e) => {
        let err;
        if(/validation failed/.test(e.message)){
          err = new ErrorBadRequest(e.message);
        } else if (/duplicate key/.test(e.message)) {
          err = new ErrorBadRequest('Пользователь с таким e-mail уже существует!')
        } else {
          err = e;
        }
          return next(err);
      });
    }
    throw new ErrorBadRequest('Необходимо ввести пароль');
  } catch (e) {
       return next(e);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 9000000,
        httpOnly: true,
      })
        .send({
          name: user.name,
          email: user.email,
        });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ status: true });
};

module.exports = {
  getUser, createUser, login, logout,
};