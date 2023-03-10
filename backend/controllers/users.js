const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'clave-secreta';

const INVALID_ERROR = 400;
const DONT_EXIST_ERROR = 404;
const SERVER_ERROR = 500;

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'An error has ocurred on the server' }));
};

const getUserById = (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .orFail(() => {
      const error = new Error('User ID not found');
      error.statusCode = DONT_EXIST_ERROR;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(DONT_EXIST_ERROR).send({ message: err }));
};

const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({email, password:hash, name, about, avatar }))
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_ERROR).send({ message: 'Los datos no son válidos' });
      }
      return res.status(SERVER_ERROR).send({ message: 'An error has ocurred on the server' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id:user._id }, secretKey, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  UserModel.findOne({ _id: req.user._id })
    .orFail(() => {
      const error = new Error('User ID not found');
      error.statusCode = DONT_EXIST_ERROR;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(DONT_EXIST_ERROR).send({ message: err }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error('User ID not found');
      error.statusCode = DONT_EXIST_ERROR;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(DONT_EXIST_ERROR).send({ message: err }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      const error = new Error('User ID not found');
      error.statusCode = DONT_EXIST_ERROR;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(DONT_EXIST_ERROR).send({ message: err }));
};

module.exports = {
  getUsers, getUserById, createUser, login, getCurrentUser, updateProfile, updateAvatar,
};
