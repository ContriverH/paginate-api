const express = require("express");
const app = express();

const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
  { id: 3, name: "user 3" },
  { id: 4, name: "user 4" },
  { id: 5, name: "user 5" },
  { id: 6, name: "user 6" },
  { id: 7, name: "user 7" },
  { id: 8, name: "user 8" },
  { id: 9, name: "user 9" },
  { id: 10, name: "user 10" },
  { id: 11, name: "user 11" },
  { id: 12, name: "user 12" },
  { id: 13, name: "user 13" },
  { id: 14, name: "user 14" },
];

const posts = [
  { id: 1, name: "post 1" },
  { id: 2, name: "post 2" },
  { id: 3, name: "post 3" },
  { id: 4, name: "post 4" },
  { id: 5, name: "post 5" },
  { id: 6, name: "post 6" },
  { id: 7, name: "post 7" },
  { id: 8, name: "post 8" },
  { id: 9, name: "post 9" },
  { id: 10, name: "post 10" },
  { id: 11, name: "post 11" },
  { id: 12, name: "post 12" },
  { id: 13, name: "post 13" },
  { id: 14, name: "post 14" },
];

app.get("/posts", paginatedResult(posts), (req, res) => {
  res.send(res.paginatedResult);
});

app.get("/users", paginatedResult(users), (req, res) => {
  res.json(res.paginatedResult);
});

function paginatedResult(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (startIndex > 0) results.prev = { page: page - 1, limit: limit };
    if (endIndex < model.length)
      results.next = { page: page + 1, limit: limit };

    results.result = model.slice(startIndex, endIndex);

    res.paginatedResult = results;
    next();
  };
}

app.listen(3000);
