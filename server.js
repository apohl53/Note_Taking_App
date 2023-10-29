const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbPath = path.join(__dirname, "db.json");

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
  const notes = getData();
  res.json(notes);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  const newNoteId = generateUniqueId();

  const notes = getData();
  newNote.id = newNoteId;
  notes.push(newNote);

  writeData(notes);

  res.json(newNote);
});

// DELETE notes by ID
app.delete("/api/notes/:id", function (req, res) {
  const noteId = req.params.id;

  const notes = getData();
  const filteredNotes = notes.filter((note) => note.id !== noteId);

  if (filteredNotes.length === notes.length) {
    res.status(404).send("Note not found");
    return;
  }

  writeData(filteredNotes);

  res.status(200).send("Note deleted!");
});

// Function to generate unique ID for each note
function generateUniqueId() {
  return uuidv4();
}

// Retrieves the data and returns as an object
function getData() {
  const json = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(json);
}

// Take in the new database array and stringify it, then overwrite the old db.json with the new array
function writeData(dbArray) {
  fs.writeFile(dbPath, JSON.stringify(dbArray, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Internal server error");
    } else {
      console.log("Database Updated Successfully");
    }
  });
}

app.listen(PORT, function () {
  console.log(`Server listening on PORT ${PORT}`);
});
