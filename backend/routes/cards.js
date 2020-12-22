const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const CastError = require('../errors/CastError.js');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards.js');

const linkValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError('Переданы некорректные данные');
  }
  return value;
};

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(linkValidator),
  }),
}), createCard);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }),
}), deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }),
}), addLike);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().length(24).hex() }),
}), removeLike);

module.exports = cardRouter;
