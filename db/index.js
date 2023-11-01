const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "./db.json");
const { v4: uuidv4 } = require("uuid");

// Retrieves the data and returns as an object
function getData() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Take in the new database array and stringify it, then overwrite the old db.json with the new array
function writeData(dbArray) {
  fs.writeFile(dbPath, JSON.stringify(dbArray, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      // Handle the error accordingly
    } else {
      console.log("Database Updated Successfully");
      // Handle the success accordingly
    }
  });
}

// Function to generate unique ID for each note
function generateId() {
  return uuidv4();
}

module.exports = { getData, writeData, generateId };
