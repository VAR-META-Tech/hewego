// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
contract PriceFeed is Ownable {
    struct PriceData {
        uint256 price;
        uint256 lastUpdated;
    }
    mapping(address => mapping(address => PriceData)) private prices;
    event PriceUpdated(address indexed tokenA, address indexed tokenB, uint256 price, uint256 lastUpdated);

    function setInitialPrice(address _tokenA, address _tokenB, uint256 _initialPrice) external onlyOwner {
        prices[_tokenA][_tokenB] = PriceData({price: _initialPrice, lastUpdated: block.timestamp});
        emit PriceUpdated(_tokenA, _tokenB, _initialPrice, block.timestamp);
    }

    function getLatestPrice(address _tokenA, address _tokenB) external view returns (uint256, uint256) {
        PriceData memory priceData = prices[_tokenA][_tokenB];
        require(priceData.price > 0, "Price for token pair is not set");
        return (priceData.price, priceData.lastUpdated);
    }

    function setPrice(address _tokenA, address _tokenB, uint256 _newPrice) external onlyOwner {
        prices[_tokenA][_tokenB] = PriceData({price: _newPrice, lastUpdated: block.timestamp});
        emit PriceUpdated(_tokenA, _tokenB, _newPrice, block.timestamp);
    }
}
