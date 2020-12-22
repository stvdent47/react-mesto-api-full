const jwt = require('jsonwebtoken');

module.exports.getJwtToken = (id) => jwt.sign(
  { id },
  process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'dev-key',
  { expiresIn: '7d' },
);
