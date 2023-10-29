const fs = require("fs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  fs.readFile("db.json", "utf-8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  const newNoteId = generateUniqueId();

  // Read the contents of the db.json file
  fs.readFile("db.json", "utf-8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const notes = JSON.parse(data);

      newNote.id = newNoteId;
      notes.push(newNote);

      // Write the updated notes data back to the db.json file
      fs.writeFile("db.json", JSON.stringify(notes), function (err) {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

// Function to genereate unique ID for each note
function generateUniqueId() {
  return uuid.v4();
}

app.listen(PORT, function () {
  console.log(`Server listening on PORT ${PORT}`);
});
