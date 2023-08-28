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
  const encryptedResponseFromBackendToFrontend = await apiEncryptRequestPayload(
    { test: "test1" }
  );

  // Frontend
  const decryptedResponseFromBackendToFrontend =
    await frontendDecryptRequestPayload(encryptedResponseFromBackendToFrontend);

  // Frontend encrypt to backend
  const encryptedResponseFromFrontendToBackend =
    await frontendEncryptRequestPayload({ test: "test2" }, BACKEND_PUBLIC_KEY);

  // Backend decrypt from frontend
  const decryptedResponseFromFrontendToBackend =
    await backendDecryptRequestPayload(encryptedResponseFromFrontendToBackend);
  console.log({ decryptedResponseFromFrontendToBackend });
}

main();
