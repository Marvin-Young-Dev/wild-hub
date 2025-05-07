const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// RAW-Aram Create

// Route http://localhost:9000/api/rawAram

router.post("/rawAram", auth, (req, res) => {
    const user_id = req.user.id;
    const { aram_raw_date, aram_raw_prov, aram_raw_ref, aram_raw_win_team, aram_raw_lose_team } = req.body;

    db.run(
        "INSERT INTO aram_raw (aram_raw_date, user_id, aram_raw_prov, aram_raw_ref, aram_raw_win_team, aram_raw_lose_team) VALUES (?, ?, ?, ?, ?, ?)",
        [aram_raw_date, user_id, aram_raw_prov, aram_raw_ref, aram_raw_win_team, aram_raw_lose_team],
        (err) => {
            if (err) return res.status(500).send("Something went wrong . Please try again");
            res.status(201).send("Thank you for your help");
        }
    );
});

module.exports = router;
