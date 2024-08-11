// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;

import "./hedera/system/HederaTokenService.sol";
import "./hedera/system/HederaResponseCodes.sol";
import "./hedera/system/IHederaTokenService.sol";

// import "./IHederaCustomTokenService.sol";

contract HederaCustomTokenService is HederaTokenService {
    // // Transfer tokens from the sender's account to another account
    // function tokenTransfer(address tokenId, address toAccountId, int64 tokenAmount) external {
    //     int response = HederaTokenService.transferToken(tokenId, msg.sender, toAccountId, tokenAmount);

    //     if (response != HederaResponseCodes.SUCCESS) {
    //         revert("Transfer Failed");
    //     }
    // }

    // // Transfer tokens from one account to another account with approval
    // function tokenTransferFrom(
    //     address tokenId,
    //     address fromAccountId,
    //     address toAccountId,
    //     int64 tokenAmount
    // ) external {
    //     int response = HederaTokenService.transferToken(tokenId, fromAccountId, toAccountId, tokenAmount);

    //     if (response != HederaResponseCodes.SUCCESS) {
    //         revert("Transfer Failed");
    //     }
    // }

    // // Approve another account to spend tokens on behalf of the sender
    // function tokenApprove(address tokenId, address spender, uint256 amount) external {
    //     int response = HederaTokenService.approve(tokenId, spender, amount);

    //     if (response != HederaResponseCodes.SUCCESS) {
    //         revert("Approval Failed");
    //     }
    // }

    // // Allowance function to check how much spender is allowed to spend
    // function tokenAllowance(address tokenId, address owner, address spender) public returns (uint256) {
    //     (int responseCode, uint256 allowance) = HederaTokenService.allowance(tokenId, owner, spender);

    //     if (responseCode != HederaResponseCodes.SUCCESS) {
    //         revert("Failed to retrieve allowance");
    //     }

    //     return allowance;
    // }

    // // Mint new tokens
    // function tokenMint(address tokenId, int64 amount, bytes[] calldata metadata) external {
    //     (int response, , ) = HederaTokenService.mintToken(tokenId, amount, metadata);

    //     if (response != HederaResponseCodes.SUCCESS) {
    //         revert("Mint Failed");
    //     }
    // } // Create a new token

    // function createToken(
    //     IHederaTokenService.HederaToken memory token,
    //     int64 initialTotalSupply,
    //     int32 decimals
    // ) external returns (address tokenAddress) {
    //     // Set the token creation parameters
    //     // The token struct is passed as a parameter and contains all necessary attributes for the token

    //     (int responseCode, address createdTokenId) = HederaTokenService.createFungibleToken(
    //         token,
    //         initialTotalSupply,
    //         decimals
    //     );

    //     if (responseCode != HederaResponseCodes.SUCCESS) {
    //         revert("Token creation failed");
    //     }

    //     return createdTokenId;
    // }

    function tokenAssociate(address sender, address tokenAddress) external {
        int response = HederaTokenService.associateToken(sender, tokenAddress);

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Associate Failed");
        }
    }

    function tokenTransfer(address tokenId, address fromAccountId, address toAccountId, int64 tokenAmount) external {
        int response = HederaTokenService.transferToken(tokenId, fromAccountId, toAccountId, tokenAmount);

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Transfer Failed");
        }
    }

    function tokenDissociate(address sender, address tokenAddress) external {
        int response = HederaTokenService.dissociateToken(sender, tokenAddress);

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Dissociate Failed");
        }
    }

    function tokenMint(address tokenId, int64 amount, bytes[] calldata metadata) external {
        (int response, , ) = HederaTokenService.mintToken(tokenId, amount, metadata);

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Mint Failed");
        }
    } // Create a new token
}
