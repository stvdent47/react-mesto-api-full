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

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.string().required(),
  }),
}), createCard);

cardRouter.delete('/:cardId', deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), addLike);

cardRouter.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), removeLike);

module.exports = cardRouter;
