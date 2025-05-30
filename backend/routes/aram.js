const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/aram", auth, (req, res) => {
    const user_id = req.user.id;
    const { aram_date, aram_prov, aram_ref, aram_win_team, aram_lose_team } = req.body;

    db.run(
        "INSERT INTO aram (aram_date, user_id, aram_prov, aram_ref, aram_win_team, aram_lose_team) VALUES (?, ?, ?, ?, ?, ?)",
        [aram_date, user_id, aram_prov, aram_ref, aram_win_team, aram_lose_team],
        (err) => {
            if (err) return res.status(500).send("Something went wrong . Please try again");
            res.status(201).send("Thank you for your help");
        }
    );
});

// gebe alle ranked matches aus die in der db sind ranked_matches
// Route http://localhost:9000/api/aram_matches

router.get("/aram_matches", auth, (req, res) => {
    const user_id = req.user.id;
    db.all("SELECT * FROM aram_finals", (err, rows) => {
        if (err) return res.status(500).send("Something went wrong . Please try again");
        res.status(200).json(rows);
    });
});

module.exports = router;