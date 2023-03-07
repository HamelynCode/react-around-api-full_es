const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

const CARD_SCHEMA = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(new RegExp('https?:\/\/(www\.)?.{1,}')).required()
  })
};

router.get('/cards', getCards);
router.post('/cards', celebrate(CARD_SCHEMA), createCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/:id/likes', addLike);
router.delete('/cards/:id/likes', removeLike);

module.exports = router;
