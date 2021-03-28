require("dotenv").config();
const express = require("express");
const path = require("path");
const painCategories = require("./pain-categories.json");

const { GoogleSpreadsheet } = require("google-spreadsheet");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.use(express.static(path.join(__dirname, "../build")));

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
    try {
      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });

      await doc.loadInfo(); // loads document properties and worksheets

      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
      await sheet.addRow({
        name,
        symptoms: selectedSymptoms.join(", "),
        notes: !!optionalNotes ? optionalNotes.replace(/[\r\n]+/g, ". ") : "",
        time: localISOTime,
      });
    } catch (e) {
      console.log(e);
    }
  })();

  res.status(200).send();
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../build/index.html"));
});

const port = process.env.PORT || 3030;
app.listen(port);

console.log(`Pain Tracker App listening on ${port}`);
