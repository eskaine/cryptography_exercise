const { scrypt } = require("ethereum-cryptography/scrypt");
const { sha256 } = require("ethereum-cryptography/sha256");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { bytesToHex, hexToBytes } = require("ethereum-cryptography/utils");

function main() {
//   generate32BytesPrivateKey();
//   generate256Hash();
//   derivePublicKeyFromPrivateKey();
//   generateEthAddressFromPublicKey();
//   generateSignature();
//   verifySignature();
//   recoverPublicKey();
  recoverAddress();
}

// 1.
async function generate32BytesPrivateKey(messageOne = "Web3 is Awesome", messageTwo = "Web3 is Awesome") {
  const privateKey = bytesToHex(
    await scrypt(utf8ToBytes(messageOne), utf8ToBytes(messageTwo), 1024, 8, 1, 32)
  );
  console.log("32 bytes private key:", privateKey);

  return privateKey;
}

// 2.
function generate256Hash(message = "Web3 is Awesome") {
    const hash = bytesToHex(sha256(utf8ToBytes(message)));
    console.log("sha256 hash:", hash);

    return hash;
}

// 3.
async function derivePublicKeyFromPrivateKey() {
    const privateKey = await generate32BytesPrivateKey("web3", "blockchain");
    const publicKey = bytesToHex(secp256k1.getPublicKey(privateKey, false));

    console.log("Public Key", publicKey);

    return publicKey;
}

// 4.
async function generateEthAddressFromPublicKey() {
    const publicKey = await derivePublicKeyFromPrivateKey();
    const address = "0x" + bytesToHex(keccak256(hexToBytes(publicKey.substring(2)))).substring(24);
    console.log("Address:", address);

    return address;
}

// 5.
async function generateSignature() {
    const privateKey = await generate32BytesPrivateKey("web3", "blockchain");
    const hash = generate256Hash("mitochondria eve");
    const signature = await secp256k1.sign(hash, privateKey);
    console.log("Signature:", signature);

    return signature;
}

// 6.
async function verifySignature() {
    const privateKey = await generate32BytesPrivateKey("web3", "blockchain");
    const publicKey = secp256k1.getPublicKey(privateKey);
    const hash = generate256Hash("mitochondria eve");
    const signature = await secp256k1.sign(hash, privateKey);
    const verified = secp256k1.verify(signature, hash, publicKey);
    console.log("Verification:", verified);
}

async function recoverPublicKey() {
    const privateKey = await generate32BytesPrivateKey("web3", "blockchain");
    const hash = generate256Hash("mitochondria eve");
    const signature = await secp256k1.sign(hash, privateKey);
    const recoveredPubKey = signature.recoverPublicKey(hash).toHex(false);

    console.log("Recovered Public Key:", recoveredPubKey);
}

async function recoverAddress() {
    const privateKey = await generate32BytesPrivateKey("web3", "blockchain");
    const hash = generate256Hash("mitochondria eve");
    const signature = await secp256k1.sign(hash, privateKey);
    const recoveredPubKey = signature.recoverPublicKey(hash).toHex(false);
    const recoveredAddress = "0x" + bytesToHex(keccak256(hexToBytes(recoveredPubKey.substring(2)))).substring(24);

    const publicKey = bytesToHex(secp256k1.getPublicKey(privateKey, false));
    const address = "0x" + bytesToHex(keccak256(hexToBytes(publicKey.substring(2)))).substring(24);

    console.log("Recovered:", recoveredAddress);
    console.log("Is Address Matched:", recoveredAddress === address);
}

main();
