const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-return-assign
module.exports.getJwtToken = (id) => jwt.sign({ id }, process.env.SECRET_KEY = 'dev-key', { expiresIn: '7d' });
