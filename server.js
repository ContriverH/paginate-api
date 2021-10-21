const express = require("express");
const app = express();
const mongoose = require("mongoose");

const User = require("./users");

mongoose.connect("mongodb://localhost/pagination", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", async () => {
  if ((await User.countDocuments()) > 0) return; // we do not want to populate the database with the dulplicate users, if it has already contained some users in it.

  // if there are no user, then we will create some in the database

  Promise.all([
    User.create({ name: "User 1" }),
    User.create({ name: "User 2" }),
    User.create({ name: "User 3" }),
    User.create({ name: "User 4" }),
    User.create({ name: "User 5" }),
    User.create({ name: "User 6" }),
    User.create({ name: "User 7" }),
    User.create({ name: "User 8" }),
    User.create({ name: "User 9" }),
    User.create({ name: "User 10" }),
  ]).then(console.log("Added users"));
});

app.get("/users", paginatedResult(User), (req, res) => {
  res.json(res.paginatedResult);
});

function paginatedResult(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (startIndex > 0) results.prev = { page: page - 1, limit: limit };
    if (endIndex < (await model.countDocuments().exec()))
      results.next = { page: page + 1, limit: limit };

    // results.result = model.slice(startIndex, endIndex);
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResult = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

app.listen(3000);
