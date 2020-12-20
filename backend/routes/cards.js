const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards.js');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.string().required(),
  }),
}), createCard);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), addLike);

cardRouter.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), removeLike);

module.exports = cardRouter;
