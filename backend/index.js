const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { ERROR_CODE_404, errorMessage404 } = require('./utils/utils.js');

const app = express();
const { port = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5fb1bc08203e9926cd683d15',
  };

  next();
});
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => res.status(ERROR_CODE_404).send({ message: errorMessage404 }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
