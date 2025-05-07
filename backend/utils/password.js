const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}

module.exports = { hashPassword, verifyPassword };
