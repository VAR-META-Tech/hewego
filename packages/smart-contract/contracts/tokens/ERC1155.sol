// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

error InvalidSignature();
error DeadlinePassed();

contract ERC1155Token is ERC1155, ERC1155URIStorage, Ownable {
    mapping(address => uint256) private nonces;
    address public signer;

    event SignerSet(address indexed signer, address indexed oldSigner);

    constructor(string memory baseUri, address _signer) ERC1155(baseUri) {
        setSigner(_signer);
    }

    function mint(uint256 tokenId, uint256 amount, uint256 deadline, bytes memory signature) public {
        address account = msg.sender;
        if (verifyMintSig(account, tokenId, amount, getNonce(account), deadline, signature)) {
            nonces[account]++;
        } else {
            revert InvalidSignature();
        }

        _mint(account, tokenId, amount, "");
    }

    function mint(address account, uint256 tokenId, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, tokenId, amount, data);
    }

    function mintBatch(
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        uint256 deadline,
        bytes memory signature
    ) public {
        address account = msg.sender;
        if (verifyMintBatchSig(account, tokenIds, amounts, getNonce(account), deadline, signature)) {
            nonces[account]++;
        } else {
            revert InvalidSignature();
        }

        _mintBatch(account, tokenIds, amounts, "");
    }

    function mintBatch(
        address account,
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(account, tokenIds, amounts, data);
    }

    function uri(uint256 id) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(id);
    }

    function setSigner(address _signer) public onlyOwner {
        emit SignerSet(_signer, signer);
        signer = _signer;
    }

    function setURI(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _setURI(tokenId, tokenURI);
    }

    function setBaseURI(string memory baseUri) public onlyOwner {
        _setBaseURI(baseUri);
    }

    // Signatures functions
    function getNonce(address account) public view returns (uint256 nonce) {
        nonce = nonces[account];
    }

    function verifyMintSig(
        address account,
        uint256 tokenId,
        uint256 amount,
        uint256 nonce,
        uint256 deadline,
        bytes memory signature
    ) public view returns (bool) {
        if (block.timestamp > deadline) {
            revert DeadlinePassed();
        }

        uint256 chainId;

        assembly {
            chainId := chainid()
        }

        bytes32 message = ECDSA.toEthSignedMessageHash(
            keccak256(abi.encode(chainId, address(this), account, tokenId, amount, nonce, deadline))
        );

        return ECDSA.recover(message, signature) == signer;
    }

    function verifyMintBatchSig(
        address account,
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        uint256 nonce,
        uint256 deadline,
        bytes memory signature
    ) public view returns (bool) {
        if (block.timestamp > deadline) {
            revert DeadlinePassed();
        }

        uint256 chainId;

        assembly {
            chainId := chainid()
        }

        bytes32 message = ECDSA.toEthSignedMessageHash(
            keccak256(abi.encode(chainId, address(this), account, tokenIds, amounts, nonce, deadline))
        );

        return ECDSA.recover(message, signature) == signer;
    }
}
