const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'clave-secreta';

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
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new AuthError('Authorization Error'));
  }

  req.user = payload;
  next();
};