const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  createUser,
} = require('../controllers/users.js');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.post('/', createUser);

module.exports = userRouter;
