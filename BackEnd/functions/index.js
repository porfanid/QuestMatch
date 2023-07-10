const express = require("express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

exports.api = functions.https.onRequest(app);

