const express = require("express");
const painCategories = require("./pain-categories.json");
const ObjectsToCsv = require("objects-to-csv");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get("/pain-items", function (req, res) {
  res.json(painCategories);
});

app.post("/pain-items", (req, res) => {
  const { name, selectedSymptoms, optionalNotes } = req.body;

  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);

  (async () => {
    const csv = new ObjectsToCsv([
      {
        name,
        symptoms: selectedSymptoms,
        notes: !!optionalNotes ? optionalNotes.replace(/[\r\n]+/g, ". ") : null,
        time: localISOTime,
      },
    ]);
    await csv.toDisk("./out.csv", { append: true });
  })();
  res.status(200).send();
});

app.listen(3030);
