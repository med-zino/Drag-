const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};