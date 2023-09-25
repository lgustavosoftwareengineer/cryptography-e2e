const {
  DEFAULT_SYMMETRIC_TEMPORARY_IV,
  DEFAULT_SYMMETRIC_ALGORITHM,
  TEMPORARY_SYMMETRIC_SECRET_KEY,
} = require("../constants");
const crypto = require("crypto");

function symmetricDecrypt(data) {
  const decipher = crypto.createDecipheriv(
    DEFAULT_SYMMETRIC_ALGORITHM,
    TEMPORARY_SYMMETRIC_SECRET_KEY,
    DEFAULT_SYMMETRIC_TEMPORARY_IV
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(data, "hex")),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString());
}

module.exports = {
  symmetricDecrypt,
};
