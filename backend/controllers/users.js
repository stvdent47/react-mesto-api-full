const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { getJwtToken } = require('../utils/jwt.js');
const AuthError = require('../errors/AuthError.js');
const BadRequestError = require('../errors/BadRequestError.js');
const UniqueError = require('../errors/UniqueError.js');
const NotFoundError = require('../errors/NotFoundError.js');

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AuthError('Переданные данные некорректны');
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);

      return res.status(200).send({
        name: user.name,
        email: user.email,
        about: user.about,
        avatar: user.avatar,
        id: user._id,
        token,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Переданные данные некорректны');
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UniqueError('Пользователь с таким электронным адресом уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            email,
            password: hash,
          })
            .then(res.status(201).send({ message: 'Пользователь успешно создан' }))
            .catch(next);
        });
    })
    .catch(next);
};

const getCurrentUserInfo = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  const { id } = payload;
  return User.findById(id)
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    about: req.body.about,
  },
  {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((user) => {
      const { name, about } = user;
      return res.status(200).send({ name, about });
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { userId } = req.body;
  User.findByIdAndUpdate(userId,
    { avatar: req.body.avatarUrl },
    {
      new: true,
      runValidators: true,
    })
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((user) => {
      const { avatar } = user;
      return res.status(200).send({ avatar });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch(next);
};
// eslint-disable-next-line consistent-return
const getUser = (req, res, next) => {
  const { authorization } = req.body;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  const { userId } = req.params;
  return User.findById(userId)
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
  createUser,
  login,
  getUsers,
  getUser,
};
