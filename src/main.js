const { scrypt } = require("ethereum-cryptography/scrypt");
const { sha256 } = require("ethereum-cryptography/sha256");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { bytesToHex } = require("ethereum-cryptography/utils");

function main() {
//   generate32BytesPrivateKey();
//   generate256Hash();
//   derivePublicKeyFromPrivateKey();
  generateEthAddressFromPublicKey();
}

async function generate32BytesPrivateKey(messageOne = "Web3 is Awesome", messageTwo = "Web3 is Awesome") {
  const privateKey = bytesToHex(
    await scrypt(utf8ToBytes(messageOne), utf8ToBytes(messageTwo), 1024, 8, 1, 32)
  );
  console.log("32 bytes private key:", privateKey);

  return privateKey;
}

function generate256Hash(message = "Web3 is Awesome") {
    const hash = bytesToHex(sha256(utf8ToBytes(message)));
    console.log("sha256 hash:", hash);

    return hash;
}

async function derivePublicKeyFromPrivateKey() {
    const privateKey = await generate32BytesPrivateKey("web3", "blockchain");
    const publicKey = secp256k1.getPublicKey(privateKey);
    console.log("Public Key", publicKey);

    return publicKey;
}

async function generateEthAddressFromPublicKey() {
    const publicKey = await derivePublicKeyFromPrivateKey();
    const hash = bytesToHex(keccak256(publicKey));
    console.log("Address:", hash);

    return hash;
}

main();
