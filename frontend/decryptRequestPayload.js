const Sodium = require("libsodium-wrappers");

const { base64ToBuffer, base64ToUint8Array } = require("../helpers");
const { FRONTEND_PUBLIC_KEY, FRONTEND_PRIVATE_KEY } = require("../constants");

/**
 * @param {{symmetricKey: string; nonce: any; data: string;}} payload
 * @returns {Promise<any>}
 */
async function decryptRequestPayload(payload) {
  const bundleEncryptedWithSymmetric = base64ToBuffer(payload.data);
  const nonce = base64ToUint8Array(payload.nonce);
  const symmetricKeyEncryptedWithAsymmetric = base64ToUint8Array(
    payload.symmetricKey
  );

  const symmetricKey = Sodium.crypto_box_seal_open(
    symmetricKeyEncryptedWithAsymmetric,
    base64ToUint8Array(FRONTEND_PUBLIC_KEY),
    base64ToUint8Array(FRONTEND_PRIVATE_KEY)
  );

  const bundle = Sodium.crypto_secretbox_open_easy(
    bundleEncryptedWithSymmetric,
    nonce,
    symmetricKey
  );

  const bundleParsed = JSON.parse(Buffer.from(bundle).toString("utf-8"));

  return bundleParsed;
}

module.exports = {
  decryptRequestPayload,
};
