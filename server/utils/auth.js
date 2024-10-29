// authUtils.js
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err) return reject({ status: 403, message: 'Invalid token' });
      resolve(decodedUser);
    });
  });
};

module.exports = { verifyToken };