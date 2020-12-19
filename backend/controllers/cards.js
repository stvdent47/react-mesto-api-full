const Card = require('../models/card.js');
const { checkErrors } = require('../utils/utils.js');

const getCards = (req, res) => {
  Card.find()
    .then((card) => res.status(200).send(card))
    .catch((err) => checkErrors(res, err));
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({
    name,
    link,
    owner,
    createdAt: Date.now(),
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => checkErrors(res, err));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => checkErrors(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
