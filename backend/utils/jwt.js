const jwt = require('jsonwebtoken');
// it is necessary to move this var to .env file
const SECRET_KEY = 'm"t9wp`pq"8BQ;"_s#FP';

module.exports.getJwtToken = (id) => jwt.sign({ id }, SECRET_KEY, { expiresIn: '7d' });
