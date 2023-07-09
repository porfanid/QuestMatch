const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.authenticateUser = functions.https.onCall((data, context) => {
  
  const { email, password } = data;
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().signInWithEmailAndPassword(user.email, password);
    return { message: 'Authentication successful!' };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new functions.https.HttpsError('internal', 'Authentication failed!');
  }
});
