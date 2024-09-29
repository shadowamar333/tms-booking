const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using serviceAccountKey
const serviceAccount = require('/Users/amarn/Downloads/tms ticket bookig/t-m-s-b0a28-firebase-adminsdk-5t4qp-e33b0d9c30.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db };
