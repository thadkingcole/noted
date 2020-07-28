// required modules
const express = require("express");
const path = require("path");

// set up express app
const app = express();
const PORT = process.env.PORT || 5404; // Chiefs Super Bowls: LIV & IV

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
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
app.listen(PORT, () => console.log("listening on PORT: ", PORT));
