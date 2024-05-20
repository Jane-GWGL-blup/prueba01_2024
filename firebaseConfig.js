// backend/firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-firebase-storage-bucket'
});

const bucket = admin.storage().bucket();

module.exports = bucket;

