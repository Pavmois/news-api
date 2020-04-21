const jwt = require('jsonwebtoken');
const { ErrorUnauthorized } = require('../moduls/errors');
const key = require('../moduls/key');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new ErrorUnauthorized('Авторизуйтесь!'));
  }
  req.user = payload;
  return next();
};