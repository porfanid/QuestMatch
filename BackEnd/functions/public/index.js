const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.authenticateUser = functions.https.onCall(function(data, context) {
  const email = data.email;
  const password = data.password;

  return admin.auth().getUserByEmail(email)
      .then(function(user) {
        return admin.auth().signInWithEmailAndPassword(user.email, password)
            .then(function() {
              return {message: "Authentication successful!"};
            }).catch(function(error) {
              console.error("Authentication error:", error);
              throw new functions.https.HttpsError("internal",
                  "Authentication failed!");
            });
      })
      .catch(function(error) {
        console.error("Authentication error:", error);
        throw new functions.https.HttpsError("internal",
            "Authentication failed!");
      });
});

