const { celebrate, Joi } = require('celebrate');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const articlesValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().iso().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri().regex(/^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]){1,}?$/),
    image: Joi.string().required().uri().regex(/^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]){1,}?$/),
  }),
});

module.exports = { signInValidation, signUpValidation, articlesValidation };
