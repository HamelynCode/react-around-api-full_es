const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

// create middleware
const pageNotFound = (req, res, next) => {
  res.status(404).send({ message: 'Requested resource not found' });
  next();
};

app.use((req, res, next) => {
  req.user = { _id: '639ba523ce51ba3c5ba5490a' };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routeUsers);
app.use('/', routeCards);
app.use(pageNotFound);

mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
