const BASE_64_PREFIX = 'base64:';

function encrypt(original, app_key) {
    if (app_key.startsWith(BASE_64_PREFIX)) {
        app_key = app_key.replace(BASE_64_PREFIX, '');
    }
    const key = CryptoJS.enc.Base64.parse(app_key);
    const iv_byte = CryptoJS.lib.WordArray.random(16);

    const value = CryptoJS.AES.encrypt(original, key, {iv: iv_byte}).toString();
    const iv = CryptoJS.enc.Base64.stringify(iv_byte);
    const mac = CryptoJS.HmacSHA256(iv+value, key).toString();

    const json = JSON.stringify({"iv":iv, "value":value, "mac":mac}).toString();
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(json));
}

function decrypt(payload, app_key) {
    if (app_key.startsWith(BASE_64_PREFIX)) {
        app_key = app_key.replace(BASE_64_PREFIX, '');
    }
    const json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(payload)));
    const key = CryptoJS.enc.Base64.parse(app_key);
    const iv = CryptoJS.enc.Base64.parse(json.iv);

    return CryptoJS.AES.decrypt(json.value, key, {iv: iv}).toString(CryptoJS.enc.Utf8);
}