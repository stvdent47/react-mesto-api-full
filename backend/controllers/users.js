const User = require('../models/user.js');
const { checkErrors } = require('../utils/utils.js');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => checkErrors(res, err));
};

const getUser = (req, res) => {
  const { userId } = req.params;
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
  User.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => checkErrors(res, err));
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  createUser,
};
