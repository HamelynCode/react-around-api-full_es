const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const pageNotFound = require('./middlewares/pageNotFound');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({ origin : '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/', routeUsers);
app.use('/', routeCards);
app.use(pageNotFound);

//errors handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'An error has ocurred on the server' } = err;
  res.status(statusCode).send({ message: message });
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
