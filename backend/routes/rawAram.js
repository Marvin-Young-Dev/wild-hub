const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// RAW-Aram
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

// gebe das erste match aus die in der db sind raw_arams
// Route http://localhost:9000/api/rawAram_matches

router.get("/rawAram_matches", auth, (req, res) => {
    const user_id = req.user.id;
    db.all("SELECT * FROM aram_raw", (err, rows) => {
        if (err) return res.status(500).send("Something went wrong . Please try again");
        res.status(200).json(rows);
    });
});

module.exports = router;
