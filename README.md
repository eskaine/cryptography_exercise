# Cryptography Challenge : Problem Statement

1. Generate a 32 bytes private key using  any  one of the  Pbkdf2/Scrypt/random submodules 
2. Calculate the sha256 hash of the message  “Web3 is Awesome”
3. Compute the public key using secp256k1 submodule from the private key generated in step 1
4. Use  Keccak256 hash to generate signer’s  Ethereum address from public key generated in step 3
5. Use  sign function of secp256k1 submodule  and  signer’s private key generated in step 1 to calculate the signature of the message hash generated in step 2 .
6. Use  verify function of secp256k1 submodule  and  public  key generated in step 3 to verify the signature generated in step 5.
7. Use recover function of secp256k1 submodule, message hash generated in step 2  ,signature generated in step 5 and  public  key generated in step 3 and recovery bit 1 to recover public key 
8. Use recovered public key step 7 to generate signer’s Ethereum address
