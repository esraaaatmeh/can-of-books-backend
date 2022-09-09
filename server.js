"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3010;
mongoose.connect("mongodb://localhost:27017/booksLibrary", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
});

const BookModel = mongoose.model("booksLibrary", BookSchema); //compile the schem into a model

async function seedData() {
  const firstBook = new BookModel({
    name: "Calculus 1",
    description: "Mathmatical book",
    status: "valid",
  });

  const secondBook = new BookModel({
    name: "physics 1",
    description: "science book",
    status: "valid",
  });

  const thirdBook = new BookModel({
    name: "MRI",
    description: "medical device Book",
    status: "valid",
  });

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}
app.get("/", homeHandler);
app.get("/test", testHandler);
app.get("/Books", getBooksHandler);
app.get("*", defualtHandler);

function homeHandler(req, res) {
  res.send("Welcome to LTUC Library");
}

function testHandler(req, res) {
  res.status(200).send("You are requesting the test route");
}

app.get("/test", (request, response) => {
  response.send("test request received");
});

function defualtHandler(req, res) {
  res.status(404).send("Sorry, Page not found");
}
function getBooksHandler(req, res) {
  BookModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
