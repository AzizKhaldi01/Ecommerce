const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    return decodedUser;
  } catch (err) {
    throw { status: 403, message: 'Invalid token' };
  }
};

module.exports = { verifyToken };
