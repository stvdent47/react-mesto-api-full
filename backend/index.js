require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth.js');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users.js');
const { ERROR_CODE_404, errorMessage404 } = require('./utils/utils.js');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', (req, res) => res.status(ERROR_CODE_404).send({ message: errorMessage404 }));
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
