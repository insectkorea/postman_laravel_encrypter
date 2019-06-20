const BASE_64_PREFIX = 'base64:';

function encrypt(original, app_key) {
    if (app_key.startsWith(BASE_64_PREFIX)) {
        app_key = app_key.replace(BASE_64_PREFIX, '');
    }
    var key = CryptoJS.enc.Base64.parse(app_key);
    var iv = CryptoJS.lib.WordArray.random(16);

    var value = CryptoJS.AES.encrypt(original, key, {iv: iv}).toString();
    var iv = CryptoJS.enc.Base64.stringify(iv);
    var mac = CryptoJS.HmacSHA256(iv+value, key).toString();

    var json = {"iv":iv, "value":value, "mac":mac};

    var encodedJson = CryptoJS.enc.Utf8.parse(JSON.stringify(json).toString());
    return CryptoJS.enc.Base64.stringify(encodedJson);
}

function decrypt(payload, app_key) {
    if (app_key.startsWith(BASE_64_PREFIX)) {
        app_key = app_key.replace(BASE_64_PREFIX, '');
    }
    var decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(payload));
    var json = JSON.parse(decoded);
    var key = CryptoJS.enc.Base64.parse(app_key);
    var iv = CryptoJS.enc.Base64.parse(json.iv);

    return CryptoJS.AES.decrypt(json.value, key, {iv: iv}).toString(CryptoJS.enc.Utf8);
}