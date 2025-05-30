const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
const port = 9000;

// Hall of Fame
const halloffameRoute = require("./routes/halloffame");
app.use("/api", halloffameRoute);

// Middlewares
app.use(cors());
app.use(express.json());

// Routen /login /Register
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Ranked Finals
const rankedRoute = require("./routes/ranked");
app.use("/api", rankedRoute);

// Raw Aram
const rawAramRoute = require("./routes/rawAram");
app.use("/api", rawAramRoute);

// Aram
const aramRoute = require("./routes/aram");
app.use("/api", aramRoute);

// Champs
const champsRoute = require("./routes/champs");
app.use("/api", champsRoute);

// Serverstart
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
