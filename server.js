// server.js - Cleaned and Final for Week 2 Assignment

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');

const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 Middleware
app.use(express.json()); // Parse JSON body
app.use(logger);         // Custom logger middleware

// 🧠 In-memory products DB
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// 🏠 Root
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Visit /api/products');
});

// 🔍 GET /api/products - with search, filter, pagination
app.get('/api/products', (req, res) => {
  let results = [...products];

  const { search, category, inStock, page = 1, limit = results.length } = req.query;

  if (search) {
    const keyword = search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword)
    );
  }

  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (inStock) {
    results = results.filter(p => p.inStock.toString() === inStock);
  }

  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + parseInt(limit));

  res.json({ total: results.length, page: parseInt(page), limit: parseInt(limit), data: paginated });
});

// 📦 GET /api/products/:id
app.get('/api/products/stats', (req, res) => {
  const countByCategory = {};
  products.forEach(p => {
    countByCategory[p.category] = (countByCategory[p.category] || 0) + 1;
  });
  res.json({ total: products.length, countByCategory });
});

// 📊 GET /api/products/stats
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// ➕ POST /api/products
app.post('/api/products', auth, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock: inStock ?? true
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 🛠️ PUT /api/products/:id
app.put('/api/products/:id', auth, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products[index] = {
    ...products[index],
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[index]);
});

// ❌ DELETE /api/products/:id
app.delete('/api/products/:id', auth, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

// 🔚 404 Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

// (Optional) Export for testing
module.exports = app;
