// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

// Interface for the price feed
interface IPriceFeed {
    function getLatestPrice(address _tokenA, address _tokenB) external view returns (uint256, uint256); // price, lastUpdated
}

contract BondIssuance is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant BORROWER_ROLE = keccak256("BORROWER_ROLE");
    bytes32 public constant LENDER_ROLE = keccak256("LENDER_ROLE");

    IPriceFeed public priceFeed;

    struct Lender {
        address lender;
        uint256 amount;
    }

    struct Bond {
        string name;
        address loanToken;
        uint256 loanAmount;
        uint256 volumeBond;
        uint256 bondDuration; // in weeks
        uint256 borrowerInterestRate;
        uint256 lenderInterestRate;
        address collateralToken;
        uint256 collateralAmount;
        uint256 issuanceDate;
        uint256 maturityDate;
        address borrower;
        Lender[] lenders;
        bool isActive;
        uint256 totalLend;
        bool isRepaid;
        bool isClaimed;
    }

    Bond[] public bonds;
    mapping(address => uint256[]) public userBonds;
    mapping(address => uint256) public rateTokenPerBond;
    mapping(address => uint256) public upScaleCollateral;

    event BondCreated(uint256 bondId, string name, address indexed borrower);
    event RateTokenPerBondUpdated(address indexed token, uint256 rate);
    event UpScaleCollateralUpdated(address indexed token, uint256 scale);
    event LenderParticipated(uint256 bondId, address indexed lender, uint256 amount);
    event BondRepaid(uint256 bondId, address indexed borrower);
    event BorrowerClaimLoanToken(uint256 bondId, address indexed borrower, address lentToken, uint256 amount);

    constructor(address _priceFeed) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        priceFeed = IPriceFeed(_priceFeed);
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    modifier onlyBorrower() {
        require(hasRole(BORROWER_ROLE, msg.sender), "Caller is not a borrower");
        _;
    }

    modifier onlyLender() {
        require(hasRole(LENDER_ROLE, msg.sender), "Caller is not a lender");
        _;
    }

    function setBorrower(address _borrower) external onlyAdmin {
        grantRole(BORROWER_ROLE, _borrower);
    }

    function setLender(address _lender) external onlyAdmin {
        grantRole(LENDER_ROLE, _lender);
    }

    function setRateTokenPerBond(address _token, uint256 _rate) external onlyAdmin {
        rateTokenPerBond[_token] = _rate;
        emit RateTokenPerBondUpdated(_token, _rate);
    }

    function setUpScaleCollateral(address _token, uint256 _scale) external onlyAdmin {
        // 1000 scale is 100%
        upScaleCollateral[_token] = _scale;
        emit UpScaleCollateralUpdated(_token, _scale);
    }

    function loanTokenToBond(address _loanToken, uint256 _loanAmount) public view returns (uint256) {
        require(rateTokenPerBond[_loanToken] > 0, "Rate for token is not set");
        return _loanAmount / rateTokenPerBond[_loanToken];
    }

    function createBond(
        string memory _name,
        address _loanToken,
        uint256 _loanAmount,
        uint256 _bondDuration, // in weeks
        uint256 _borrowerInterestRate,
        uint256 _lenderInterestRate,
        address _collateralToken
    ) public onlyBorrower {
        require(_loanAmount >= 1000, "Loan amount must be a minimum of 1000 units");

        uint256 issuanceDate = block.timestamp + 7 days;
        uint256 maturityDate = issuanceDate + (_bondDuration * 1 weeks);

        uint256 volumeBond = loanTokenToBond(_loanToken, _loanAmount);

        (uint256 collateralRate, ) = priceFeed.getLatestPrice(_loanToken, _collateralToken);
        require(collateralRate > 0, "Invalid price from price feed");

        uint256 scale = upScaleCollateral[_collateralToken];
        require(scale > 0, "Upscale factor for collateral token is not set");
        uint256 collateralAmount = ((_loanAmount / collateralRate) * scale) / 1000;
        console.log(collateralAmount);
        Bond memory newBond = Bond({
            name: _name,
            loanToken: _loanToken,
            loanAmount: _loanAmount,
            volumeBond: volumeBond,
            bondDuration: _bondDuration,
            borrowerInterestRate: _borrowerInterestRate,
            lenderInterestRate: _lenderInterestRate,
            collateralToken: _collateralToken,
            collateralAmount: collateralAmount,
            issuanceDate: issuanceDate,
            maturityDate: maturityDate,
            borrower: msg.sender,
            lenders: new Lender[](0),
            isActive: true,
            totalLend: 0,
            isRepaid: false,
            isClaimed: false
        });

        IERC20 collateralToken = IERC20(newBond.collateralToken);
        require(collateralToken.transferFrom(msg.sender, address(this), newBond.collateralAmount), "Transfer failed");

        bonds.push(newBond);
        uint256 bondId = bonds.length - 1;
        userBonds[msg.sender].push(bondId);

        emit BondCreated(bondId, _name, msg.sender);
    }

    function lendBond(uint256 bondId, uint256 amount) external onlyLender {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond is not active");
        require(!bond.isRepaid, "Bond is already repaid");
        require(bond.totalLend + amount <= bond.loanAmount, "Borrower not need borrow more");
        require(block.timestamp <= bond.issuanceDate, "Bond was issuanced");

        // Transfer the loan token from lender to the contract
        IERC20 loanToken = IERC20(bond.loanToken);
        console.log("bond.loanToken", bond.loanToken, amount);
        require(loanToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        bond.lenders.push(Lender({lender: msg.sender, amount: amount}));
        bond.totalLend += amount;

        emit LenderParticipated(bondId, msg.sender, amount);
    }

    function repayBond(uint256 bondId) external onlyBorrower {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.borrower == msg.sender, "Caller is not the borrower");
        require(bond.isActive, "Bond is not active");
        require(!bond.isRepaid, "Bond is already repaid");

        IERC20 loanToken = IERC20(bond.loanToken);
        IERC20 collateralToken = IERC20(bond.collateralToken);
        uint256 repaymentAmount = bond.totalLend + ((bond.totalLend * bond.borrowerInterestRate) / 1000);
        require(loanToken.transferFrom(msg.sender, address(this), repaymentAmount), "Transfer failed");

        for (uint256 i = 0; i < bond.lenders.length; i++) {
            Lender storage lender = bond.lenders[i];
            uint256 lenderRepayment = lender.amount + ((lender.amount * bond.lenderInterestRate) / 1000);
            require(loanToken.transfer(lender.lender, lenderRepayment), "Transfer to lender failed");
            console.log("lenderRepayment: ", lenderRepayment);
        }
        require(collateralToken.transfer(bond.borrower, bond.collateralAmount), "Transfer to borrower failed");

        bond.isRepaid = true;
        emit BondRepaid(bondId, msg.sender);
    }

    function borrowerClaim(uint256 bondId) external onlyBorrower {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.borrower == msg.sender, "Caller is not the borrower");
        require(bond.isActive, "Bond is not active");
        require(
            block.timestamp > bond.issuanceDate && block.timestamp < bond.maturityDate,
            "Claim must in issuance date to maturity date"
        );
        require(bond.isClaimed == false, "Claimed before");

        IERC20 loanToken = IERC20(bond.loanToken);
        require(loanToken.transfer(bond.borrower, bond.totalLend), "Transfer to lend token to borrower failed");

        bond.isClaimed = true;

        emit BorrowerClaimLoanToken(bondId, msg.sender, bond.loanToken, bond.totalLend);
    }

    function getBond(uint256 bondId) external view returns (Bond memory) {
        require(bondId < bonds.length, "Bond does not exist");
        return bonds[bondId];
    }

    function getUserBonds(address user) external view returns (uint256[] memory) {
        return userBonds[user];
    }
}
