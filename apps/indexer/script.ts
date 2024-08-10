import { AccountId } from '@hashgraph/sdk';
import { ethers } from 'ethers';
// Function to convert EVM address to Hedera Account ID
// function evmAddressToHederaAccountId(evmAddress: string): string {
//     try {
//     // Ensure the address is in the correct format
//     if (!ethers.utils.isAddress(evmAddress)) {
//         throw new Error('Invalid Ethereum address');
//     }

//     // Hash the Ethereum address
//     const hash = ethers.utils.keccak256(ethers.utils.arrayify(evmAddress));

//     // Get the account number from the last 20 bytes of the hash
//     const accountNumberHex = hash.slice(-40); // Last 40 hex characters (20 bytes)

//     // Convert to decimal
//     const accountNumber = parseInt(accountNumberHex, 16);
    
//     // Create Hedera account ID (shard number: 0, realm number: 0)
//     const accountId = AccountId.fromString(`0.0.${accountNumber}`);
    
//     return accountId.toString();
// } catch (error) {
//     console.error(error);
// }
// }

// // Example usage
// const evmAddress = '0x000000000000000000000000000000000046D132';
// const hederaAccountId = evmAddressToHederaAccountId(evmAddress);
// console.log(`Hedera Account ID: ${hederaAccountId}`);

// Function to convert hex address to Hedera Account ID
function convertHexToHederaAccountId(hexAddress: string): AccountId {
    try {
    // Remove the '0x' prefix if it exists
    if (hexAddress.startsWith("0x")) {
      hexAddress = hexAddress.substring(2);
    }
  
    // Ensure the address is 40 characters long (20 bytes)
    if (hexAddress.length !== 40) {
      throw new Error("Invalid hexadecimal address length");
    }
  
    // Create Hedera Account ID (assumes shard 0 and realm 0)
    const accountId = AccountId.fromSolidityAddress(hexAddress);
  
    return accountId;
} catch (error) {
    console.error(error);
}
  }
  
  // Example usage
  const hexAddress = "0xb75EF6F9A1c4311cc2803C2511BFccd83d9c0Ff0";
  const accountId = convertHexToHederaAccountId(hexAddress);
  console.log("Hedera Account ID:", accountId.toString());