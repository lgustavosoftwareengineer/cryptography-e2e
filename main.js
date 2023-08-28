const _sodium = require("libsodium-wrappers");

const {
  decryptRequestPayload: frontendDecryptRequestPayload,
} = require("./frontend/decryptRequestPayload");
const {
  encryptRequestPayload: frontendEncryptRequestPayload,
} = require("./frontend/encryptRequestPayload");

const {
  encryptRequestPayload: apiEncryptRequestPayload,
} = require("./api/encryptRequestPayload");
const {
  decryptRequestPayload: backendDecryptRequestPayload,
} = require("./api/decryptRequestPayload");

const { BACKEND_PUBLIC_KEY } = require("./constants");

async function main() {
  await _sodium.ready;

  // Backend
  const backendEncryptedResponse = await apiEncryptRequestPayload({
    test: "test1",
  });
  console.log({ backendEncryptedResponse });

  // Frontend
  const frontendDecryptedResponse = await frontendDecryptRequestPayload(
    backendEncryptedResponse
  );
  console.log({ frontendDecryptedResponse });

  // Frontend encrypt to backend
  const frontendEncryptedResponse = await frontendEncryptRequestPayload(
    { test: "test2" },
    BACKEND_PUBLIC_KEY
  );
  console.log({ frontendEncryptedResponse });

  // Backend decrypt from frontend
  const backendDecryptedResponse = await backendDecryptRequestPayload(
    frontendEncryptedResponse
  );
  console.log({ backendDecryptedResponse });
}

main();
