const jwt = require('jsonwebtoken');

module.exports.getJwtToken = (id) => jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '7d' });
