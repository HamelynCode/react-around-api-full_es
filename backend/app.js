const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const pageNotFound = require('./middlewares/pageNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { celebrate, Joi, errors } = require('celebrate');

//----------------- SCHEMAS ------------------
const SIGNUP_SCHEMA = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().max(256),
    avatar: Joi.string().pattern(new RegExp('https?:\/\/(www\.)?.{1,}'))
  })
};
const SIGNIN_SCHEMA = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  })
};
//----------------------- App ------------------------
require('dotenv').config();
const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({ origin : '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.post('/api/signup', celebrate(SIGNUP_SCHEMA), createUser);
app.post('/api/signin', celebrate(SIGNIN_SCHEMA), login);
app.use(auth);
app.use('/api/', routeUsers);
app.use('/api/', routeCards);
app.use(pageNotFound);

app.use(errorLogger);

//errors handler
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'An error has ocurred on the server' } = err;
  res.status(statusCode).send({ message: message });
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
