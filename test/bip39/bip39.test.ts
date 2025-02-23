const bip39 = require('bip39');
const crypto_ts = require('crypto');

import {
    createMnemonic,
    mnemonicToEntropy,
    entropyToMnemonic,
    mnemonicToSeed,
    mnemonicToSeedSync,
    validateMnemonic
} from "../../src/bip39/bip39";


// 1. 生成 128 位随机熵 12 15 18 21 24
const entropy = crypto_ts.randomBytes(16); // 128 位是 16 字节

// 2. 计算校验和 (SHA-256)
const hash = crypto_ts.createHash('sha256').update(entropy).digest();
const checksum = hash[0] >> 4; // 取前 4 位

// 3. 组合熵和校验和
let bits = '';
for (let i = 0; i < entropy.length; i++) {
    bits += entropy[i].toString(2).padStart(8, '0');
}
bits += checksum.toString(2).padStart(4, '0');

// 4. 分割为助记词索引
const indices = [];
for (let i = 0; i < bits.length; i += 11) {
    const index = parseInt(bits.slice(i, i + 11), 2);
    indices.push(index);
}

// 5. 映射为助记词
const wordlist = bip39.wordlists.english;
const mnemonic = indices.map(index => wordlist[index]).join(' ');

console.log(mnemonic);
//
//
// const english_mnemonic = createMnemonic(12, "english")
// console.log(english_mnemonic);
//
// const encrpytCode = mnemonicToEntropy(english_mnemonic, "english")
// console.log(encrpytCode);
//
// const decodeCode = entropyToMnemonic(encrpytCode, "english")
// console.log(decodeCode)
//
// const seed = await mnemonicToSeed(english_mnemonic, "")
// console.log(seed)  // Bip32 导出 rootKey
//
//
// const typedArray = new Uint8Array(10);
//
// const bytes = crypto_ts.randomBytes(typedArray.byteLength);
// // @ts-ignore
// typedArray.set(new typedArray.constructor(bytes.buffer));
//
// console.log(typedArray)
