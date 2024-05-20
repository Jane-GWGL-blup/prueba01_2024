// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const bucket = require('../firebaseConfig');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/profile-image', upload.single('image'), (req, res) => {
  const file = bucket.file(req.file.originalname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (error) => {
    console.error(error);
    res.status(500).send('Error uploading file');
  });

  stream.on('finish', () => {
    file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500'
    }).then((url) => res.json({ url }))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error getting file URL');
      });
  });

  stream.end(req.file.buffer);
});

module.exports = router;
