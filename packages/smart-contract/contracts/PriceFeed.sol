// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PriceFeed is Ownable, AccessControl {
    bytes32 public constant FEEDER_ROLE = keccak256("FEEDER_ROLE");

    struct PriceData {
        uint256 price;
        uint256 lastUpdated;
    }

    mapping(address => mapping(address => PriceData)) private prices;

    event PriceUpdated(address indexed tokenA, address indexed tokenB, uint256 price, uint256 lastUpdated);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(FEEDER_ROLE, msg.sender);
    }

    function getLatestPrice(address _tokenA, address _tokenB) external view returns (uint256, uint256) {
        PriceData memory priceData = prices[_tokenA][_tokenB];
        require(priceData.price > 0, "Price for token pair is not set");
        return (priceData.price, priceData.lastUpdated);
    }

    function setPrice(address _tokenA, address _tokenB, uint256 _newPrice) external {
        require(hasRole(FEEDER_ROLE, msg.sender), "Caller is not a feeder");
        prices[_tokenA][_tokenB] = PriceData({price: _newPrice, lastUpdated: block.timestamp});
        emit PriceUpdated(_tokenA, _tokenB, _newPrice, block.timestamp);
    }

    function grantFeederRole(address account) external onlyOwner {
        grantRole(FEEDER_ROLE, account);
    }

    function revokeFeederRole(address account) external onlyOwner {
        revokeRole(FEEDER_ROLE, account);
    }
}
