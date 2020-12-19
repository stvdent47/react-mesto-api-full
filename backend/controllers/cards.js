const Card = require('../models/card.js');

const getCards = (req, res, next) => {
  Card.find()
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, owner } = req.body;

  Card.create({
    name,
    link,
    owner,
    createdAt: Date.now(),
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notValidId'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const addLike = (req, res, next) => {
  const { userId } = req.body;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const removeLike = (req, res, next) => {
  const { userId } = req.body;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
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
