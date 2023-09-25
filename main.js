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
const { symmetricDecrypt } = require("./symetric/symmetricDecrypt");
const { symmetricEncrypt } = require("./symetric/symmetricEncrypt");

async function main() {
  await _sodium.ready;

  // Backend
  // const backendEncryptedResponse = await apiEncryptRequestPayload({
  //   test: "test1",
  // });
  // console.log({ backendEncryptedResponse });

  // Frontend
  // const frontendDecryptedResponse = await frontendDecryptRequestPayload({
  //   symmetricKey:
  //     "AhNmcAADecCmGiZ_59uN-_eRvzDQqkFO2cXgswCe0Cg0-DtQ5xiugTRHdVgZOOt2g5dCuS2j7CJEbY-7koxXemhZUKQjrTP2gYXqPR17jaQ",
  //   nonce: "rp3ldj9hbEB7uSiugx/bIsqVWhFwY0Wp",
  //   data: "IDx4fw_XfpL1-nMnvLvzCM1V1QX2hiIs1XHCe-ZBgind7_9ugXzA-S0hDLCbQ0sQRqOrw2L9_81cFwJZgpuxxDH2MW2JqMnW53faaMKySqKTU0cB5gUo0_mATscYGh18zEqYEsf-1BjjlQsU8AEAsincUAwmrA2gHG3urBXwrFXuBMyGprMy4WxTCiKfIyWbYeb0uCzegyGIqXipnCBzk06irCF8tlnlL4v7ZaChWp_775kEwLvy781WPo7RBTTAvkx1BNLoPuwBKQxVtkqL_TrNQMaL4zhhEJJEqy0U91VUb0smDCKDN4XxpKy7yzbcqYWgYeqiV9f1p7Rvb5D96X6HhBQb2U8ceeNyNenJde5hhUPv0I_m6olsitXXdFKbrZTRx4xkHHRvJZlhenizoO6jiH3vIF-OUFcuiOSxyz9hiWolt1zixV9N5e3dFnautf4kkYGK1di_x0f8wtbGsm6Gbvk-FoBXsigFWLeJGrnSfVYzcDAW7yidSh_YYo9QhrpIpZFfPQvl94NWEL78wQCpte8Jt5gfZ7s4WWp5fp8sxvluTR7u6kUd_5aepak1SKByzTUa1e3usWOo-0L3viLFl8AwZ7lHfQ3j2uAnCokNUf5UZi2x9TkXiaWzE0AzmOsusxl5rjDI89LBcf9G0HaDQY1YpJ41o3-Dq-LuiIzhFcvMDTOE542O89YNHOHphr9-6BWf-TQNknYcyMt6wjEc3Idh0Xi_DWQCUboRSQ3PXi0a15LZYAMzoRGMicvQszxCzvrPtDxdQCbW5JZS_Gov3lMO1pZ1bm1cOtaB_6cdPOeSJ5r6P6wdG4xWCqbwYqmE968mm45GfCPXT1_lCDMu87k-o-3BStv0qaxB1kjcFqyChT4QAWaysX2b_kch-eKAONnE9KGldihyeCI9YAuCB_THgcy0Qq5DG4e3XlrYT9EiSs70zdE9PtCvGWp5vvFUPDS7_b-EHZfH0C2d5A0Kiuej_SxY6v1JxMP1xe-1HddwBd4GpFJSsSvrvDlQqPyZrzMPDqgvrul0lx98zMRF-Ch0xm8UqvGH56xa4Mdek6YMLNYSHeIaDWw46jCyI22CgOEakt_NdYjyU1CIrafdqi_08ZDbMchzEexYQ8ixOq7WADxrdkpyAF9GwJNMjpYsXYhMFehoN65uWN0MTaTVnEm0cD9-wzX7U4OCN63GuRlUcVQjkK95dl9sUyumeibCR96UhEJQBNNvnaDOa8I2SuLXV_AfPEeBmyBwXVWA7SkVDq0bboIqDrb4uJy6eAdctYVQqIa7U7-k_julL2abGZPpfvfdTo4ZRTAIqbPRNT5YuqhjAq5UyW4Ef3KXAQwhdD5BsmRHCuAgLYKuUT9W0T9tRq8QKxlUL0X-e05X-wM3ojLnYm6EIQwU8dsZPkZFw6O7JD4Df16uTjpD34UprqGnCPlDVXw_N1KXYqfxsXXHtRQEhjQSnBvOK07fXtIyW_7JuJG8_VUMEWv5ybCHwJlqalAvsE9rcsa-ChMd5h8Oa7PmOcDF6UVH5p_R-uZ1YXTWB2iEeU-F1QXDd5JKOHnVwrkGGBTZvfjaC3Edzl-ohdeVM3Q8PkRUGS0XONP2GrPIZcq8C-bzNbTDAHWuVExp1uIs-1YPNw5ReT1XNomLPG2zpZEPV1HKR_815T93dqa5wePck5WmjuYEt04bLU-BKnOHsojBv5v8cNwGWWjUUwCV4QKUZYet4spuxphOMUiXeg7aaFOdKj9yx3TpP5yWspLSeLS5YIPebkQnpP_m7KdLKZX-l-NvhyglpbN3moM2mTsRz3juT6CsnatslrVbrZj0TmJW7nG-kjNRpy4U77r0c7tc91ZKU4UbnswqvQZRTdnxWiCdrbJqXSSan7x3ycdJioXdLGlso4dJBgX_QtqYOby-syeCefOlV8Y5dA3taKShTgDZYJBEb-MHB2b1cXL6NRZVKrzwZXDorigrmztpmRD2o4ButCg2BeDiFdWBnfjIUFXNr17rD1qYXn8in1LBO95DwQ",
  // });
  // console.log({
  //   frontendDecryptedResponse,
  // });
  // console.log({
  //   frontendDecryptedResponse: frontendDecryptedResponse.patientAttachments,
  // });

  // Frontend encrypt to backend
  // const frontendEncryptedResponse = await frontendEncryptRequestPayload(
  //   {
  //     patientCPF: "37298943820",
  //     physicianCRM: "99999AM",
  //   },
  //   BACKEND_PUBLIC_KEY
  // );
  // console.log({ frontendEncryptedResponse });

  // Backend decrypt from frontend
  // const backendDecryptedResponse = await backendDecryptRequestPayload(
  //   frontendEncryptedResponse
  // );
  // console.log({ backendDecryptedResponse });

  // Encrypt using symmetric strategy only
  console.log(
    symmetricEncrypt({
      patientCPF: "13369327406",
      physicianCRM: "99999AM",
    })
  );

  // Decrypt using Symmetric strategy only
  // console.log(
  //   symmetricDecrypt(
  //     "df8ff3efc1b18c534462629bfdfc2856e87e21780fda1302b31327266afde035820a8df55005ccc6a582bdc6801ee6d6193d3d901f91ec436c4f4be9721b1560e50c4d2c583b2e67fedb1464663ca995f194269f392071cc4ead52a063e52f649e6a21794adb94ef6b83cf28ac3c1ed0f5eb689bd840b19882c07b149669d7f84658240cdb82f7a75cf09e708ed318a15bd2a0e2f5d071c5a25c4c795f0eaa83bec758c18b5519b1b0856c080975f018a0e864209ef6d4b7675b406001ed45461750c64a6e09a55dca077d0d48a0a8c6ffdcb5a10a9ffb7cc6e1b157e2942e880c6fbf266abdffa89a497e8f709adb63cd97ed0634df9592354fe5c83dec5afbc0960cc9ae156b853a7428bd4786437e2c46e5b820bb44fa9507d8c3050c32ceeffa1351100cfc32369cddcbab007b333598071be02c93f05869ef737eb1b9158cb4ee9a07d2fd3ad832d44903b865ce5d26d91caac28392bba50085e4714252ea85d3c450852fe9fe8a3089523bc6d36b5bf80a14259561deb4cd0416d940354a79c8d37fb2a11f7cf9fe94a6f1f24232decb46b0652224080930e2ea075cc644778434ddcf6c73979abd896bf74d9a1acf4ceb885eb9794228826f8d244c5b024d8b089610ad46810d4f877a549a5d"
  //   )
  // );
}

main();
