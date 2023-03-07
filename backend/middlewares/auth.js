const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Authorization Error'));
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'clave-secreta');
  } catch (err) {
    next(new AuthError('Authorization Error'));
  }

  req.user = payload;
  next();
};