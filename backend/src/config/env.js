require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'secret_key',
  port: process.env.PORT || 5000,
};
