function base64ToBuffer(str) {
  return Buffer.from(str, "base64");
}

function fromUInt8ArrayToBase64String(uIntArray) {
  return Buffer.from(uIntArray).toString("base64");
}

function base64ToUint8Array(str) {
  return new Uint8Array(Buffer.from(str, "base64"));
}

module.exports = {
  fromUInt8ArrayToBase64String,
  base64ToUint8Array,
  base64ToBuffer,
};
