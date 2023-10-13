const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const PORT = 3030;

const app = express();

// GET /notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../notes.html"));
});

// GET * should return the index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post("/api/notes", (req, res) => {
  fs.readFile("../../Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuidv4();
    // ^^ this creates a unique id for the new note

    notes.push(newNote);

    fs.writeFile(
      "../../Develop/db/db.json",
      JSON.stringify(notes),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json(newNote);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
