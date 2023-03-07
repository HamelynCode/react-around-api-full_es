const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const pageNotFound = require('./middlewares/pageNotFound');

const { celebrate, Joi, errors } = require('celebrate');

const SIGNUP_SCHEMA = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().max(256),
    avatar: Joi.string().pattern(new RegExp('https?:\/\/(www\.)?.{1,}')).required()
  })
};
const SIGNIN_SCHEMA = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  })
};

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({ origin : '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', celebrate(SIGNUP_SCHEMA), createUser);
app.post('/signin', celebrate(SIGNIN_SCHEMA), login);
app.use(auth);
app.use('/', routeUsers);
app.use('/', routeCards);
app.use(pageNotFound);

app.use(errors());
//errors handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'An error has ocurred on the server' } = err;
  res.status(statusCode).send({ message: message });
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
