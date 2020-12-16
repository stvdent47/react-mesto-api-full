const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.body;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ messagge: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send({ messagge: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};