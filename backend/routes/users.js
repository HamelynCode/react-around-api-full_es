const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, getCurrentUser, updateProfile, updateAvatar
} = require('../controllers/users');

const UPDATE_PROFILE_SCHEMA = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().max(256),
  })
};
const UPDATE_AVATAR_SCHEMA = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp('https?:\/\/(www\.)?.{1,}')).required()
  })
};

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUserById);//urls con variables deben ir siempre al final
router.patch('/users/me', celebrate(UPDATE_PROFILE_SCHEMA), updateProfile);
router.patch('/users/me/avatar', celebrate(UPDATE_AVATAR_SCHEMA), updateAvatar);

module.exports = router;
