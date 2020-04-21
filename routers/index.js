const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('../routers/users');
const articleRouter = require('../routers/routArticles');
const { login, createUser, logout } = require('../controllers/users');
const { signInValidation, signUpValidation } = require('../moduls/validation');

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articleRouter);
router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.get('/logout', auth, logout);

module.exports = router;
