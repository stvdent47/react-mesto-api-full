const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { checkErrors } = require('../utils/utils.js');
const { getJwtToken } = require('../utils/jwt.js');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => checkErrors(res, err));
};

// eslint-disable-next-line consistent-return
const getUser = (req, res) => {
  const { authorization } = req.body;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ messagge: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send({ messagge: 'Необходима авторизация' });
  }

  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('notValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => checkErrors(res, err));
};

const getCurrentUserInfo = (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .orFail(new Error('notValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => checkErrors(res, err));
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, {
    name: req.body.name,
    about: req.body.about,
  },
  {
    new: true,
    runValidators: true,
    // upsert: true,
  })
    .orFail(new Error('ValidationError'))
    .then((user) => res.status(200).send(user))
    .catch((err) => checkErrors(res, err));
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
      // upsert: true,
    })
    .orFail(new Error('ValidationError'))
    .then((user) => res.status(200).send(user))
    .catch((err) => checkErrors(res, err));
};

const createUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: 'Переданные данные некорректны' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Пользователь с таким электронным адресом уже существует' });
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            email,
            password: hash,
          })
            .then(res.status(201).send({ message: 'Пользователь успешно создан' }))
            .catch((err) => checkErrors(res, err));
        });
    })
    .catch((err) => checkErrors(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ message: 'Переданные данные некорректны' });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);

      return res.status(200).send({ token });
    })
  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }

  //     return bcrypt.compare(password, user.password)
  //       .then((matched) => {
  //         if (!matched) {
  //           return Promise.reject(new Error('Неправильные почта или пароль'));
  //         }
  //         const token = getJwtToken(user._id);
  //         return res.status(200).send({ token });
  //       });
  //   })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
  createUser,
  login,
};
