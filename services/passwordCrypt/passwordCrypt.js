const crypto = require("crypto");
const hashAlgo = "sha256";

module.exports = (text) => {
  return crypto.createHash(hashAlgo).update(text).digest("hex");
};
