const {
  DEFAULT_SYMMETRIC_TEMPORARY_IV,
  DEFAULT_SYMMETRIC_ALGORITHM,
  TEMPORARY_SYMMETRIC_SECRET_KEY,
} = require("../constants");
const crypto = require("crypto");

function symmetricEncrypt(data) {
  const cipher = crypto.createCipheriv(
    DEFAULT_SYMMETRIC_ALGORITHM,
    TEMPORARY_SYMMETRIC_SECRET_KEY,
    DEFAULT_SYMMETRIC_TEMPORARY_IV
  );

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data)),
    cipher.final(),
  ]);

  return encrypted.toString("hex");
}

module.exports = {
  symmetricEncrypt,
};
