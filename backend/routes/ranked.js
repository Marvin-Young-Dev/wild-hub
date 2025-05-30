const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");


// gebe alle ranked matches aus die in der db sind ranked_matches
// Route http://localhost:9000/api/ranked_matches

router.get("/ranked_matches", auth, (req, res) => {
    const user_id = req.user.id;
    db.all("SELECT * FROM ranked_finals", (err, rows) => {
        if (err) return res.status(500).send("Something went wrong . Please try again");
        res.status(200).json(rows);
    });
});

router.post("/ranked_name_correction", auth, (req, res) => {
    const { fromName, toName } = req.body;
  
    if (!fromName || !toName) {
      return res.status(400).send("Bitte alte und neue Namen angeben");
    }
  
    const sql = `
      UPDATE ranked_finals
      SET
        ranked_bans = REPLACE(ranked_bans, ?, ?),
        ranked_blue_team = REPLACE(ranked_blue_team, ?, ?),
        ranked_red_team = REPLACE(ranked_red_team, ?, ?)
      WHERE
        ranked_bans LIKE '%' || ? || '%'
        OR ranked_blue_team LIKE '%' || ? || '%'
        OR ranked_red_team LIKE '%' || ? || '%'
    `;
  
    const params = [fromName, toName, fromName, toName, fromName, toName, fromName, fromName, fromName];
  
    db.run(sql, params, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Fehler bei der Namenskorrektur");
      }
      res.status(200).send(`Alle Vorkommen von "${fromName}" wurden zu "${toName}" geändert.`);
    });
  });
  




module.exports = router;