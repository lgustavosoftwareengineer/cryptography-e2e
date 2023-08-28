const Sodium = require("libsodium-wrappers");
const fs = require("fs");

const { fromUInt8ArrayToBase64String } = require("./helpers");

async function generateKeys() {
  await Sodium.ready;

  const { privateKey: BACKEND_PRIVATE_KEY, publicKey: BACKEND_PUBLIC_KEY } =
    Sodium.crypto_box_keypair();
  const { privateKey: FRONTEND_PRIVATE_KEY, publicKey: FRONTEND_PUBLIC_KEY } =
    Sodium.crypto_box_keypair();

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
    }`;

  try {
    fs.writeFileSync("constants.js", content);
  } catch (err) {
    console.error(err);
  }
}

generateKeys();
