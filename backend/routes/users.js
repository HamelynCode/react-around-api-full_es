const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateProfile, updateAvatar
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUserById);//urls con variables deben ir siempre al final
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
