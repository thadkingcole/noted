// required modules
const express = require("express");
const path = require("path");

// set up express app
const app = express();
const PORT = process.env.PORT || 5404;

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// starts server to begin listening
app.listen(PORT, () => console.log("listening on PORT: ", PORT));
