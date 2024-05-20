// backend/routes/paypal.js
const express = require('express');
const paypal = require('paypal-rest-sdk');
const { auth } = require('../middleware/auth');
const router = express.Router();

paypal.configure({
  mode: 'sandbox', // o 'live'
  client_id: 'your-client-id',
  client_secret: 'your-client-secret'
});

router.post('/create-payment', auth, (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": { "payment_method": "paypal" },
    "redirect_urls": {
      "return_url": "http://return.url",
      "cancel_url": "http://cancel.url"
    },
    "transactions": [{
      "item_list": { "items": req.body.items },
      "amount": { "currency": "USD", "total": req.body.total },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error creating payment');
    } else {
      res.json({ id: payment.id });
    }
  });
});

module.exports = router;
