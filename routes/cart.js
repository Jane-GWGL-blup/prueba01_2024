// backend/routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
  res.json(cart);
});

router.post('/', async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.userId },
    { $push: { products: req.body } },
    { new: true, upsert: true }
  );
  res.json(cart);
});

module.exports = router;
