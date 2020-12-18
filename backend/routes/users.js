const userRouter = require('express').Router();
const auth = require('../middlewares/auth.js');
const {
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
  // getUsers,
  // getUser,
} = require('../controllers/users.js');

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', auth, updateUser);
userRouter.patch('/me/avatar', auth, updateUserAvatar);
// userRouter.get('/', getUsers);
// userRouter.get('/:userId', getUser);

module.exports = userRouter;
