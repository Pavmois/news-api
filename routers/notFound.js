const { ErrorNotFound } = require('../moduls/errors');

const someNotFound = (req, res, next) => {
  next(new ErrorNotFound());
};

const error = (err, req, res, next) => {
  let comingError = err;
  if (/Cast to [a-z]+ failed/i.test(comingError.message)) {
    comingError = new ErrorNotFound();
  }
  const { statusCode = 500, message } = comingError;
  res.status(statusCode).send({ message, statusCode });
  return next();
};

module.exports = { error, someNotFound };

