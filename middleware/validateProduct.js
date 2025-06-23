// middleware/validateProduct.js
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Product name is required and must be a string' });
  }

  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ error: 'Product price is required and must be a number' });
  }

  next();
};

module.exports = validateProduct;
