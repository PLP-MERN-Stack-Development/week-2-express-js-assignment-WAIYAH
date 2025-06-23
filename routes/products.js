const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory array to simulate DB
let products = [];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST new product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: uuidv4(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
  const { name, price } = req.body;
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { ...products[index], name, price };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
