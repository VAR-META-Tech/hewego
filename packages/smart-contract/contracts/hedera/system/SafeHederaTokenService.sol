// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;
pragma experimental ABIEncoderV2;

import "./HederaTokenService.sol";
import "./SafeCast.sol";
import "./IHederaTokenService.sol";

abstract contract SafeHederaTokenService is HederaTokenService {
    using SafeCast for uint256;

    event Transfer(address indexed from, address indexed to, uint64 value);

    function safeMintToken(
        address token,
        uint256 amount,
        bytes[] memory metadata
    ) internal returns (int64 newTotalSupply, int64[] memory serialNumbers) {
        int256 responseCode;
        (responseCode, newTotalSupply, serialNumbers) = HederaTokenService.mintToken(token, amount.toInt64(), metadata);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe mint failed!");
    }

    function safeBurnToken(
        address token,
        uint256 amount,
        int64[] memory serialNumbers
    ) internal returns (int64 newTotalSupply) {
        int256 responseCode;
        (responseCode, newTotalSupply) = HederaTokenService.burnToken(token, amount.toInt64(), serialNumbers);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe burn failed!");
    }

    function safeAssociateTokens(address account, address[] memory tokens) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.associateTokens(account, tokens);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe multiple associations failed!");
    }

    function safeAssociateToken(address account, address token) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.associateToken(account, token);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe single association failed!");
    }

    function safeTransferToken(address token, address sender, address receiver, uint256 amount) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.transferToken(token, sender, receiver, amount.toInt64());
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe token transfer failed!");
    }

    function safeTransferTokenRouter(address token, address sender, address receiver, uint256 amount) internal {
        int32 responseCode;
        (responseCode) = HederaTokenService.transferTokenRouter(token, sender, receiver, amount.toInt64());
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe token transfer router failed!");
    }

    function safeApprove(address token, address spender, uint256 amount) internal {
        int responseCode;
        (responseCode) = HederaTokenService.approve(token, spender, amount);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe approve failed!");
    }
}
