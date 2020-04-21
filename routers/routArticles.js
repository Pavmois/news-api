const router = require('express').Router();
const { articlesValidation } = require('../moduls/validation');
const { getArticles, addArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', articlesValidation, addArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;