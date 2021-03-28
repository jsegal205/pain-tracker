const express = require("express");
const painCategories = require("./pain-categories.json");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/pain-items", function (req, res) {
  res.json(painCategories);
});

app.post("/pain-items", (req, res) => {});

app.listen(3030);
