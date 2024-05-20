// backend/routes/admin.js
const express = require('express');
const { auth, admin } = require('../middleware/auth');
const Product = require('../models/Product');
const router = express.Router();

router.use(auth);
router.use(admin);

router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.sendStatus(201);
});

module.exports = router;
