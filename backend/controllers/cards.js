const Card = require('../models/card.js');
const CastError = require('../errors/CastError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
const NotFoundError = require('../errors/NotFoundError.js');

const getCards = (req, res, next) => {
  Card.find()
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user.id,
    createdAt: Date.now(),
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((card) => {
      if (!card) throw new CastError('Неверный id карточки');
      if (card.owner.toString() === req.user.id.toString()) {
        Card.findByIdAndRemove(cardId)
          .then((cardToRemove) => res.status(200).send(cardToRemove))
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять карточки, которые были созданы не вами');
      }
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const removeLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемый ресурс не найден'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
