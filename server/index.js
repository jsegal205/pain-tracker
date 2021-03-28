const express = require("express");
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
  res.json([
    {
      name: "Eyes",
      symptoms: [
        "Aura",
        "Shooting stars",
        "Grey curtain",
        "Double vision",
        "Strain",
      ],
    },
    {
      name: "Back",
      symptoms: [
        "Lower",
        "Upper",
        "Mid",
        "Shoulder blades",
        "Butt",
        "Nerve Pain",
        "Numb",
      ],
    },
    {
      name: "Digestive",
      symptoms: [
        "Acid",
        "Nausea ",
        "Bloating",
        "Cramps",
        "Constipation",
        "Diarrhea",
        "Gas",
      ],
    },
    {
      name: "Neck",
      symptoms: [],
    },
    {
      name: "TMJ",
      symptoms: [
        "Left",
        "Right",
        "Both",
        "Muscle Fatigue",
        "Neck Pain",
        "Numb",
      ],
    },
    {
      name: "Light headed",
      symptoms: [],
    },
  ]);
});

app.post("/pain-items", (req, res) => {});

app.listen(3030);
