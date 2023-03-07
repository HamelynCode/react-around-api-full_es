const NotFoundError = require('../errors/notFoundError');

module.exports = (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
};