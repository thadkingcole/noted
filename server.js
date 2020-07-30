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
app.use(express.static("public"));

// api routes =============================================================== //
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
    if (err) return res.json(err);
    data ? res.json(JSON.parse(data)) : res.json(false);
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  // get current notes from db
  fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
    if (err) return res.json(err);
    let noteData = JSON.parse(data);
    if (noteData.length === 0) {
      newNote.id = 1; // note id 0 cannot be read later, starting at 1 instead
    } else {
      newNote.id = noteData[0].id + 1;
    }
    // add new note to db
    noteData.unshift(newNote);
    // save note to db
    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(noteData),
      (err) => {
        if (err) return res.json(err);
        res.json(newNote);
      }
    );
  });
});

app.delete("/api/notes/:id", (req, res) => {
  // get id of note to be deleted
  const delId = req.params.id;
  // read note db
  fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
    if (err) return res.json(err);
    const noteData = JSON.parse(data);
    // filter out by note id
    const noteRemoved = noteData.filter((note) => note.id != delId);
    // write filtered array to db
    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(noteRemoved),
      (err) => {
        if (err) return res.json(err);
        res.json(noteRemoved);
      }
    );
  });
});
// ========================================================================== //

// nav routes =============================================================== //
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
