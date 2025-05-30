const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/ranked", auth, (req, res) => {
    const user_id = req.user.id;
    const { ranked_date, ranked_prov, ranked_ref, ranked_win_team, ranked_lose_team } = req.body;

    db.run(
        "INSERT INTO ranked (ranked_date, user_id, ranked_prov, ranked_ref, ranked_win_team, ranked_lose_team) VALUES (?, ?, ?, ?, ?, ?)",
        [ranked_date, user_id, ranked_prov, ranked_ref, ranked_win_team, ranked_lose_team],
        (err) => {
            if (err) return res.status(500).send("Something went wrong . Please try again");
            res.status(201).send("Thank you for your help");
        }
    );
});

// gebe alle ranked matches aus die in der db sind ranked_matches
// Route http://localhost:9000/api/ranked_matches

router.get("/ranked_matches", auth, (req, res) => {
    const user_id = req.user.id;
    db.all("SELECT * FROM ranked_finals", (err, rows) => {
        if (err) return res.status(500).send("Something went wrong . Please try again");
        res.status(200).json(rows);
    });
});





module.exports = router;