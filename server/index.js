require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
app.use(helmet());
app.use(express.static(path.join(__dirname, "../build")));

// routes
app.get("/pain-items", async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];

    const rows = await sheet.getRows();

    const data = [];
    rows.map((row) => {
      const symptoms = !!row.symptoms ? row.symptoms.split(",") : [];

      return data.push({
        name: row.name,
        symptoms: symptoms.map((s) => s.trim()),
      });
    });

    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

app.post("/pain-items", async (req, res) => {
  const { name, selectedSymptoms, optionalNotes } = req.body;

  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      name,
      symptoms: selectedSymptoms.join(", "),
      notes: !!optionalNotes ? optionalNotes.replace(/[\r\n]+/g, ". ") : "",
      time: localISOTime,
    });

    res.status(200).send();
  } catch (e) {
    console.log(e);
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../build/index.html"));
});

// start the server
const port = process.env.PORT || 3030;
app.listen(port);

console.log(`Pain Tracker App listening on ${port}`);
