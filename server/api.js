const express = require("express");
const pgp = require("pg-promise")();
const connectionString = require("./dbconn");

const db = pgp(connectionString);

var router = express.Router();

router.post("/add-author", function(req, res) {
  const name = req.body.authorName,
    age = req.body.authorAge,
    gender = req.body.authorGender,
    description = req.body.authorAbout;
  const query = `INSERT INTO authors (id, name, age, gender, description) VALUES (DEFAULT, '${name}', '${age}', '${gender}', '${description}')`;
  db
    .none(query)
    .then(data => {
      res.json({ status: "Success" });
    })
    .catch(err => {
      console.log(err);
      res.json({ status: "Error" });
    });
});

router.post("/add-book", function(req, res) {
  const name = req.body.bookName,
    author = req.body.bookAuthor,
    description = req.body.bookDescription;
  const query = `INSERT INTO books (id, name, author, description) VALUES (DEFAULT, '${name}', '${author}', '${description}')`;
  db
    .none(query)
    .then(data => {
      res.json({ status: "Success" });
    })
    .catch(err => {
      console.log(err);
      res.json({ status: "Error" });
    });
});

module.exports = router;
