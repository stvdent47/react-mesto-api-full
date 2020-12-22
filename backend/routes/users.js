const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const CastError = require('../errors/CastError.js');
const {
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

userRouter.get('/me', getCurrentUserInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    id: Joi.string().required().length(24).hex(),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatarUrl: Joi.string().required().custom(linkValidator),
    userId: Joi.string().required().length(24).hex(),
  }),
}), updateUserAvatar);
// userRouter.get('/', getUsers);
// userRouter.get('/:userId', getUser);

module.exports = userRouter;
