const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { NODE_ENV, DATABASE } = process.env;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const celebrateErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routers/index');
const { error, someNotFound } = require('./routers/notFound');

mongoose.connect(NODE_ENV === 'production' ? DATABASE : 'mongodb://localhost:27017/news-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors({
  origin: [
    'http://pavmois.tk',
    'https://pavmois.tk',
    'http://www.pavmois.tk',
    'https://www.pavmois.tk',
    'https://pavmois.github.io',
    'http://pavmois.github.io',
    'http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(indexRouter);
app.use(errorLogger);
app.use(celebrateErrors());
app.use('*', someNotFound);
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
