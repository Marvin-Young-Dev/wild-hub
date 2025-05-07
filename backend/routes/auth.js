const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../utils/password");
const auth = require("../middleware/auth");

// Registrierung
router.post("/users", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) return res.status(500).send("Fehler in deiner Query Anfrage");
    if (row) return res.status(400).send("Benutzername existiert bereits");

    const hashedPassword = await hashPassword(password);
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      (err) => {
        if (err) return res.status(500).send("Fehler beim Erstellen des Benutzers");
        res.status(201).send("Benutzer erfolgreich erstellt");
      }
    );
  });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) return res.status(500).send("Fehler in deiner Query Anfrage");
    if (!row) return res.status(400).send("User not found!");

    const match = await verifyPassword(password, row.password);
    if (!match) {
      return res.status(400).send("Falsches Passwort");
    }

    const token = jwt.sign(
      { id: row.id, username: row.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login erfolgreich", token });
  });
});

// JWT TEST ROUTE
router.get("/protected", auth, (req, res) => {
  res.send(`Du bist eingeloggt als ${req.user.username}`);
});

module.exports = router;
