const userRouter = require('express').Router();
const {
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
  // getUsers,
  // getUser,
} = require('../controllers/users.js');

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

// userRouter.get('/', getUsers);
// userRouter.get('/:userId', getUser);

module.exports = userRouter;
