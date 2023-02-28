const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(403).send({ message: 'Authorization Error' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'clave-secreta');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  next();
};