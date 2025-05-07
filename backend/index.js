const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
const port = 9000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routen
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Raw Aram
const rawAramRoute = require("./routes/rawAram");
app.use("/api", rawAramRoute);

// Serverstart
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
