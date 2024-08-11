// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IHederaTokenService {
    function createFungibleToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 decimals,
        uint32 autoRenewPeriod
    ) external payable returns (address tokenAddress);
}

contract HipTokenCreator {
    address constant HTS_PRECOMPILE = address(0x167); // HTS precompile address

    function createFungible(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 decimals,
        uint32 autoRenewPeriod
    ) public payable returns (address tokenAddress) {
        tokenAddress = IHederaTokenService(HTS_PRECOMPILE).createFungibleToken{value: msg.value}(
            name,
            symbol,
            initialSupply,
            decimals,
            autoRenewPeriod
        );
    }
}
