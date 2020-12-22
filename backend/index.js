require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const rateLimit = require('express-rate-limit');

const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const auth = require('./middlewares/auth.js');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users.js');
const NotFoundError = require('./errors/NotFoundError.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(process.env.MONGO_URL = 'mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(express.json(), cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  next();
});

app.use(bodyParser.json());
const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 10,
});
app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
