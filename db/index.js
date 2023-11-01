const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "./db.json");

// Retrieves the data and returns as an object
function getData() {
  const json = fs.readFile(dbPath, "utf-8");

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

// Function to generate unique ID for each note
function generateId() {
  return uuidv4();
}

module.exports = { getData, writeData, generateId };
