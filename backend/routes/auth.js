const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../utils/password");
const auth = require("../middleware/auth");

// Starter data
const starterTitle = "Join the WildHub";
const starterHeros = [
  "Jinx", "Ahri", "Garen", "Blitzcrank", "Vayne", "Master Yi", "Ashe",
  "Camille", "Annie", "Dr. Mundo", "Amumu", "Vi", "Nasus",
  "Lux", "Seraphine", "Janna", "Miss Fortune"
];

// Register endpoint
router.post("/userregister", async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }
  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long");
  }

  // Check for existing user
  db.get("SELECT * FROM user WHERE username = ?", [username], async (err, row) => {
    if (err) return res.status(500).send("Error executing the query");
    if (row) return res.status(400).send("Username already exists");

    try {
      // Hash password
      const hashedPassword = await hashPassword(password);

      // Insert into user table
      db.run(
        "INSERT INTO user (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          if (err) return res.status(500).send("Error creating the user");

          const userId = this.lastID;

          // 1: Create profile
          db.run(
            "INSERT INTO profile (profile_id) VALUES (?)",
            [userId],
            function (err) {
              if (err) return res.status(500).send("Error creating the profile");

              const profileId = userId;

              // 2: Insert starter title
              db.run(
                "INSERT INTO user_titles (profile_id, title_name, is_active) VALUES (?, ?, ?)",
                [profileId, starterTitle, 1],
                function (err) {
                  if (err) return res.status(500).send("Error adding the title");

                  // 3: Insert starter heroes using serialize for atomicity
                  db.serialize(() => {
                    const stmt = db.prepare(
                      "INSERT INTO user_heros (profile_id, hero_name, mastery_level) VALUES (?, ?, ?)"
                    );

                    for (const hero of starterHeros) {
                      stmt.run(profileId, hero, 1);
                    }

                    stmt.finalize(err => {
                      if (err) return res.status(500).send("Error adding the starter heroes");

                      // Registration complete
                      res.status(201).send(
                        "User successfully created with profile, title, and starter heroes"
                      );
                    });
                  });
                }
              );
            }
          );
        }
      );
    } catch (e) {
      res.status(500).send("Internal server error");
    }
  });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM user WHERE username = ?", [username], async (err, row) => {
    if (err) return res.status(500).send("Error executing the query");
    if (!row) return res.status(400).send("User not found");

    const match = await verifyPassword(password, row.password);
    if (!match) {
      return res.status(400).send("Incorrect password");
    }

    const token = jwt.sign(
      { id: row.user_id, username: row.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token });
  });
});

// Protected route (JWT)
router.get("/protected", auth, (req, res) => {
  res.send(`You are logged in as ${req.user.username}`);
});

module.exports = router;
