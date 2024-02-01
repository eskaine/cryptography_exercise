const { scrypt } = require("ethereum-cryptography/scrypt");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { bytesToHex } = require("ethereum-cryptography/utils");

function main() {
  generate32BytesPrivateKey();
  generate256Hash();
}

async function generate32BytesPrivateKey() {
  const privateKey = bytesToHex(
    await scrypt(utf8ToBytes("Calyptus"), utf8ToBytes("Hello"), 1024, 8, 1, 32)
  );

  console.log("32 bytes private key:", privateKey);
}

async function generate256Hash() {
    const hash = bytesToHex(sha256(utf8ToBytes("Web3 is Awesome")));
    console.log("sha256 hash:", hash);
}

main();
