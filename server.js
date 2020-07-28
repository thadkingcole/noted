// required modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// set up express app
const app = express();
const PORT = process.env.PORT || 5404; // Chiefs Super Bowls: LIV & IV

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// read notes
// let notesdb = [];
// function updateNotes() {
//   fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
//     if (err) return console.log(err);
//     notesdb = JSON.parse(data);
//     // data.forEach(note => notesdb.push(note));
//     // notesdb.push(data);
//   });
// }
// updateNotes();

// api routes
// ========================================================================== //
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
    if (err) return console.log(err);
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  // get current notes from db
  fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
    if (err) return console.log(err);
    let noteData = JSON.parse(data);
    // add new note to db
    noteData.push(newNote);
    // save note to db
    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(noteData),
      (err) => {
        if (err) return console.log(err);
        res.json(newNote);
      }
    );
  });
});

app.delete("/api/notes/:id");
// ========================================================================== //

// nav routes
// ========================================================================== //
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// * means all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// ========================================================================== //

// starts server to begin listening
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
