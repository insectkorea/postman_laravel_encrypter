# Postman Laravel Encrypter
## Introduction
This is `CryptoJS` implementation of `Laravel` Encrypter for `Postman`

Since `Postman` is only offering `CryptoJS` and prohibiting utilizing external library, we should implement `Laravel` Encypter inside of `Postman` script with `CryptoJS`.

You can find detailed information about `CryptoJS` in [Github](https://github.com/brix/crypto-js)

### Laravel Encrypter Algorithm
| Name          | Detail            |
| :-----        | :-----            |
| Cipher        | AES               |
| Mode          | CBC               |
| Padding       | PKCS5, PKCS7      |

Please note that these methods are not supporting `PHP serialize`.