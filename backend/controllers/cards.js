const CardModel = require('../models/card');

const INVALID_ERROR = 400;
const DONT_EXIST_ERROR = 404;
const SERVER_ERROR = 500;

const getCards = (req, res) => {
  CardModel.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'An error has ocurred on the server' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  CardModel.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_ERROR).send({ message: 'Los datos no son válidos' });
      }
      return res.status(SERVER_ERROR).send({ message: 'An error has ocurred on the server' });
    });
};

const deleteCard = (req, res) => {
  CardModel.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch(() => res.status(DONT_EXIST_ERROR).send({ message: 'User ID not found' }));
};

const addLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card ID not found');
      error.statusCode = DONT_EXIST_ERROR;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(DONT_EXIST_ERROR).send({ message: err }));
};

const removeLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card ID not found');
      error.statusCode = DONT_EXIST_ERROR;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(DONT_EXIST_ERROR).send({ message: err }));
};

module.exports = {
  getCards, createCard, deleteCard, addLike, removeLike,
};
