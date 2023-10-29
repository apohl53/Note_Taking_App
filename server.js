const fs = require("fs");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3333;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// GET /notes should return the notes.html file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"), function (err) {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("File sent successfully");
    }
  });
});

// GET * should return the index.html file.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"), function (err) {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("File sent successfully");
    }
  });
});
