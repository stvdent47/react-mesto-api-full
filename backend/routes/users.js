const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth.js');
const CastError = require('../errors/CastError.js');
const {
  login,
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
  // getUsers,
  // getUser,
} = require('../controllers/users.js');

const linkValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError('Переданы некорректные данные');
  }
  return value;
};

userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

userRouter.get('/users/me', getCurrentUserInfo);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatarUrl: Joi.string().required().custom(linkValidator),
  }),
}), auth, updateUserAvatar);
// userRouter.get('/', getUsers);
// userRouter.get('/:userId', getUser);

module.exports = userRouter;
