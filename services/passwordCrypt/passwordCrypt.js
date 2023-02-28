const crypto = require("crypto");
const hashAlgo = "sha256";

module.exports = (text) => {
  crypto.createHash(hashAlgo).update(text).digest("hex");
};
