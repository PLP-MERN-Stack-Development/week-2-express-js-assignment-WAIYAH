// middleware/auth.js
const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer mysecrettoken123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
  }

  next();
};

module.exports = auth;
