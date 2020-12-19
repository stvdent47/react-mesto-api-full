const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth.js');

const {
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
  // getUsers,
  // getUser,
} = require('../controllers/users.js');

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2)
      .max(30),
    about: Joi.string().required().min(2)
      .max(30),
    id: Joi.string().required(),
  }),
}), auth, updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatarUrl: Joi.string().required(),
    id: Joi.string().required(),
  }),
}), auth, updateUserAvatar);
// userRouter.get('/', getUsers);
// userRouter.get('/:userId', getUser);

module.exports = userRouter;
