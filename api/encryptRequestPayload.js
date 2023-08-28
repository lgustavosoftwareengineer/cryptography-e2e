const Sodium = require("libsodium-wrappers");

const { FRONTEND_PUBLIC_KEY } = require("../constants");
const { base64ToUint8Array } = require("../helpers");

/**
 * @param {any} data
 */
async function encryptRequestPayload(data) {
  // Generate key symmetric
  const symmetricKey = Sodium.randombytes_buf(32);
  const nonce = Sodium.randombytes_buf(24);

  const bundleEncrypted = Sodium.crypto_secretbox_easy(
    JSON.stringify(data),
    nonce,
    symmetricKey,
    "base64"
  );

  const symmetricKeyEncrypted = Sodium.crypto_box_seal(
    symmetricKey,
    base64ToUint8Array(FRONTEND_PUBLIC_KEY),
    "base64"
  );

  return {
    symmetricKey: symmetricKeyEncrypted,
    nonce: Buffer.from(nonce).toString("base64"),
    data: bundleEncrypted,
  };
}

module.exports = {
  encryptRequestPayload,
};
