const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/wild-hub.db");

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;");
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
});

process.on("exit", () => {
  db.close();
});

module.exports = db;