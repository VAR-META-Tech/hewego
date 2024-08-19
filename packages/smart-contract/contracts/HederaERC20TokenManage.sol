// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./hedera/system/KeyHelper.sol";
import "./hedera/system/SafeHederaTokenService.sol";
import "./hedera/system/HederaResponseCodes.sol";
import "./hedera/system/IHederaTokenService.sol";

contract HederaERC20TokenManage is SafeHederaTokenService, KeyHelper {
    using SafeCast for uint256;

    struct TokenInfo {
        string name;
        string symbol;
        address tokenAddress;
        uint256 initialSupply;
    }

    TokenInfo[] public tokens;

    function createToken(
        string memory name,
        string memory symbol,
        int32 decimal,
        uint256 initialSupply
    ) external payable returns (address) {
        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = getSingleKey(KeyType.SUPPLY, KeyValueType.CONTRACT_ID, address(this));

        IHederaTokenService.Expiry memory expiry = IHederaTokenService.Expiry({
            autoRenewAccount: address(this),
            autoRenewPeriod: 8_000_000,
            second: 0
        });
        IHederaTokenService.HederaToken memory myToken;
        myToken.name = name;
        myToken.symbol = symbol;
        myToken.treasury = address(this);
        myToken.expiry = expiry;
        myToken.tokenKeys = keys;

        (int responseCode, address _token) = HederaTokenService.createFungibleToken(
            myToken,
            initialSupply.toInt64(),
            decimal
        );

        require(responseCode == HederaResponseCodes.SUCCESS, "TOKEN_CREATION_FAILED");

        tokens.push(TokenInfo({name: name, symbol: symbol, tokenAddress: _token, initialSupply: initialSupply}));

        return _token;
    }

    function mint(uint256 tokenIndex, address account, uint256 amount) external returns (bool) {
        require(amount > 0, "MINT_AMOUNT_ZERO");
        require(tokenIndex < tokens.length, "TOKEN_INDEX_OUT_OF_BOUNDS");

        address token = tokens[tokenIndex].tokenAddress;

        safeMintToken(token, amount, new bytes[](0));
        safeTransferToken(token, address(this), account, amount);
        return true;
    }

    function getTokenInfo(
        uint256 tokenIndex
    ) external view returns (string memory name, string memory symbol, address tokenAddress, uint256 initialSupply) {
        require(tokenIndex < tokens.length, "TOKEN_INDEX_OUT_OF_BOUNDS");
        TokenInfo memory tokenInfo = tokens[tokenIndex];
        return (tokenInfo.name, tokenInfo.symbol, tokenInfo.tokenAddress, tokenInfo.initialSupply);
    }

    function tokenAssociate(uint256 tokenIndex) external {
        TokenInfo memory tokenInfo = tokens[tokenIndex];
        safeAssociateToken(address(this), tokenInfo.tokenAddress);
    }
}
