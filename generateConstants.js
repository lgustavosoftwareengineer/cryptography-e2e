const Sodium = require("libsodium-wrappers");
const fs = require("fs");
const Crypto = require("crypto");

const { fromUInt8ArrayToBase64String } = require("./helpers");

async function generateConstants() {
  await Sodium.ready;

  const { privateKey: BACKEND_PRIVATE_KEY, publicKey: BACKEND_PUBLIC_KEY } =
    Sodium.crypto_box_keypair();
  const { privateKey: FRONTEND_PRIVATE_KEY, publicKey: FRONTEND_PUBLIC_KEY } =
    Sodium.crypto_box_keypair();
  const TEMPORARY_SYMMETRIC_SECRET_KEY = Buffer.from(Crypto.randomBytes(32))
    .toString("hex")
    .slice(0, 32);
  const DEFAULT_SYMMETRIC_TEMPORARY_IV = Buffer.from(
    Crypto.randomBytes(8)
  ).toString("hex");

  const content = `module.exports = {
      BACKEND_PUBLIC_KEY: "${fromUInt8ArrayToBase64String(BACKEND_PUBLIC_KEY)}",
      BACKEND_PRIVATE_KEY: "${fromUInt8ArrayToBase64String(
        BACKEND_PRIVATE_KEY
      )}",
      FRONTEND_PUBLIC_KEY: "${fromUInt8ArrayToBase64String(
        FRONTEND_PUBLIC_KEY
      )}",
      FRONTEND_PRIVATE_KEY: "${fromUInt8ArrayToBase64String(
        FRONTEND_PRIVATE_KEY
      )}",
      TEMPORARY_SYMMETRIC_SECRET_KEY: "${TEMPORARY_SYMMETRIC_SECRET_KEY}",
      DEFAULT_SYMMETRIC_TEMPORARY_IV: "${DEFAULT_SYMMETRIC_TEMPORARY_IV}",
      DEFAULT_SYMMETRIC_ALGORITHM: "aes-256-cbc",
    }`;

  try {
    fs.writeFileSync("constants.js", content);
  } catch (err) {
    console.error(err);
  }
}

generateConstants();
