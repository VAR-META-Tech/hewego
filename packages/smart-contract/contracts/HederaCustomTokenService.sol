// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;

import "./hedera/system/HederaTokenService.sol";
import "./hedera/system/HederaResponseCodes.sol";
import "./hedera/system/IHederaTokenService.sol";

contract HederaCustomTokenService is HederaTokenService {
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
    }
}
