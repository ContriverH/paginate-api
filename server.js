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

app.get("/users", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (startIndex > 0) results.prev = { page: page - 1, limit: limit };
  if (endIndex < users.length) results.next = { page: page + 1, limit: limit };

  results.result = users.slice(startIndex, endIndex);
  res.json(results);
});

app.listen(3000);
