import BIP32Factory from 'bip32';
import { networks, payments } from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from 'bip39';

// 助记词
const mnemonic = 'become vicious wealth dutch sort lazy present tunnel film daring harvest valley';
// 通过助记词生成种子
const seed = bip39.mnemonicToSeedSync(mnemonic);
// 通过种子生成根密钥
const root = BIP32Factory(ecc).fromSeed(seed, networks.bitcoin);
// 派生路径
const path = "m/44'/0'/0'/0/0";
// 通过派生路径生成子密钥
const child = root.derivePath(path);
// 通过子密钥生成密钥对实例
const keyPairInstance = ECPairFactory(ecc).fromPrivateKey(child.privateKey!, { network: networks.bitcoin });
// 通过密钥对实例创建一个新的P2PKH地址
const { address, pubkey } = payments.p2pkh({ pubkey: keyPairInstance.publicKey, network: networks.bitcoin });
// P2WPKH 地址
const { address: p2wpkhAddress } = payments.p2wpkh({ pubkey: keyPairInstance.publicKey, network: networks.bitcoin });

console.debug('Address:', address);
console.debug('P2WPKH Address:', p2wpkhAddress);
console.debug('Public key:', pubkey!.toString('hex'));
console.debug('Private key:', keyPairInstance.toWIF());
