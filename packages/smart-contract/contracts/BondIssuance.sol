// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./BondERC1155Token.sol";
import "./hedera/system/SafeHederaTokenService.sol";

// import "hardhat/console.sol";

// Interface for the price feed
interface IPriceFeed {
    function getLatestPrice(address _tokenA, address _tokenB) external view returns (uint256, uint256); // price, lastUpdated
}

contract BondIssuance is AccessControl, ReentrancyGuard, SafeHederaTokenService {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public admin;
    IPriceFeed public priceFeed;
    BondERC1155Token public bondToken;
    bool useErc2Mode = false;
    struct Lender {
        address lender;
        uint256 amountLend;
        uint256 amountBond;
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
        uint256 totalBond;
        bool readyToRepay;
        bool isBorrowerClaimed;
        uint256 liquidationLoanTokenAmount;
    }

    Bond[] public bonds;
    mapping(address => uint256[]) public userBonds;
    mapping(address => uint256) public rateTokenPerBond;
    mapping(address => uint256) public upScaleCollateral;
    mapping(address => uint256) public thresholdLiquidityCollateral;

    event BondCreated(
        uint256 bondId,
        string name,
        address indexed borrower,
        address loanToken,
        uint256 loanAmount,
        uint256 volumeBond,
        uint256 bondDuration,
        uint256 borrowerInterestRate,
        uint256 lenderInterestRate,
        address collateralToken,
        uint256 collateralAmount,
        uint256 issuanceDate,
        uint256 maturityDate
    );
    event RateTokenPerBondUpdated(address indexed token, uint256 rate);
    event UpScaleCollateralUpdated(address indexed token, uint256 scale);
    event LenderParticipated(uint256 bondId, address indexed lender, uint256 amountLend, uint256 amountBond);
    event BondRepaid(
        uint256 indexed bondId,
        address indexed borrower,
        uint256 totalLend,
        uint256 interestPaid,
        uint256 repaymentAmount,
        bool collateralReturned
    );
    event BorrowerClaimLoanToken(uint256 bondId, address indexed borrower, address lentToken, uint256 amount);
    event BondLiquidated(
        uint256 indexed bondId,
        address indexed borrower,
        uint256 collateralAmount,
        uint256 currentCollateralValue,
        uint256 loanTokenReceived,
        uint256 repaymentAmount,
        uint256 excessRefund
    );
    event LenderClaimed(
        address indexed lender,
        uint256 indexed bondId,
        uint256 bondTokenAmount,
        uint256 loanTokenAmount,
        uint256 totalRepayment
    );

    constructor(address _priceFeed) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        priceFeed = IPriceFeed(_priceFeed);

        bondToken = new BondERC1155Token("");
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
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

    function loanTokenToBondTokenCalculation(address _loanToken, uint256 _loanAmount) public view returns (uint256) {
        require(rateTokenPerBond[_loanToken] > 0, "Rate for token is not set");
        return _loanAmount / rateTokenPerBond[_loanToken];
    }

    function bondTokenToLoanTokenCalculation(
        address _loanToken,
        uint256 _bondTokenAmount
    ) public view returns (uint256) {
        require(rateTokenPerBond[_loanToken] > 0, "Rate for token is not set");
        return _bondTokenAmount * rateTokenPerBond[_loanToken];
    }

    function collateralAmountCalculation(
        address _loanToken,
        uint256 _loanAmount,
        address _collateralToken
    ) public view returns (uint256) {
        (uint256 collateralRate, ) = priceFeed.getLatestPrice(_loanToken, _collateralToken);
        require(collateralRate > 0, "Invalid price from price feed");
        uint256 scale = upScaleCollateral[_collateralToken];
        require(scale > 0, "Upscale factor for collateral token is not set");
        // console.log("_loanAmount, collateralRate, scale");
        // console.log(_loanAmount, collateralRate, scale);
        return (((_loanAmount / collateralRate) * scale) / 1000) * 1e8;
    }

    function createBond(
        string memory _name,
        address _loanToken,
        uint256 _loanAmount,
        uint256 _bondDuration, // in weeks
        uint256 _borrowerInterestRate,
        uint256 _lenderInterestRate,
        address _collateralToken
    ) public {
        uint256 volumeBond = loanTokenToBondTokenCalculation(_loanToken, _loanAmount);
        require(volumeBond > 0, "Volume bond must greater 1");
        uint256 issuanceDate = 0;
        uint256 maturityDate = 0;
        if (useErc2Mode) {
            issuanceDate = block.timestamp + 7 days;
            maturityDate = issuanceDate + (_bondDuration * 1 weeks);
        } else {
            issuanceDate = block.timestamp + 7 minutes;
            maturityDate = issuanceDate + (_bondDuration * 1 hours);
        }

        uint256 collateralAmount = collateralAmountCalculation(_loanToken, _loanAmount, _collateralToken);
        // console.log("createBond-collateralAmount: ", collateralAmount);
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
            totalLend: 0,
            totalBond: 0,
            isActive: true,
            isBorrowerClaimed: false,
            readyToRepay: false,
            liquidationLoanTokenAmount: 0
        });

        if (useErc2Mode) {
            IERC20 collateralToken = IERC20(newBond.collateralToken);
            require(
                collateralToken.transferFrom(msg.sender, address(this), newBond.collateralAmount),
                "Transfer failed"
            );
        } else {
            safeTransferToken(newBond.collateralToken, msg.sender, admin, newBond.collateralAmount);
        }

        bonds.push(newBond);
        uint256 bondId = bonds.length - 1;
        userBonds[msg.sender].push(bondId);

        emit BondCreated(
            bondId,
            _name,
            msg.sender,
            _loanToken,
            _loanAmount,
            volumeBond,
            _bondDuration,
            _borrowerInterestRate,
            _lenderInterestRate,
            _collateralToken,
            collateralAmount,
            issuanceDate,
            maturityDate
        );
    }

    function buyBond(uint256 bondId, uint256 amount) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond is not active");
        require(!bond.readyToRepay, "Bond is already repaid");
        require(block.timestamp <= bond.issuanceDate, "Bond was issuanced");

        uint256 amountLend = bondTokenToLoanTokenCalculation(bond.loanToken, amount);
        require(bond.totalLend + amountLend <= bond.loanAmount, "Borrower not need borrow more");

        if (useErc2Mode) {
            // console.log("bond.loanToken", bond.loanToken, amount);
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transferFrom(msg.sender, address(this), amountLend), "Transfer failed");
        } else {
            safeTransferToken(bond.loanToken, msg.sender, admin, amountLend);
        }

        bond.lenders.push(Lender({lender: msg.sender, amountLend: amountLend, amountBond: amount}));
        bond.totalLend += amountLend;
        bond.totalBond += amount;
        bondToken.mint(msg.sender, bondId, amount, "");

        emit LenderParticipated(bondId, msg.sender, amountLend, amount);
    }

    function borrowerClaim(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.borrower == msg.sender, "Caller is not the borrower");
        require(bond.isActive, "Bond is not active");
        require(!bond.readyToRepay, "Bond is already repaid");
        require(!bond.isBorrowerClaimed, "Claimed before");
        require(
            block.timestamp > bond.issuanceDate && block.timestamp < bond.maturityDate,
            "Claim must in issuance date to maturity date"
        );

        if (useErc2Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transfer(bond.borrower, bond.totalLend), "Transfer to lend token to borrower failed");
        } else {
            safeTransferToken(bond.loanToken, admin, bond.borrower, bond.totalLend);
        }

        bond.isBorrowerClaimed = true;

        emit BorrowerClaimLoanToken(bondId, msg.sender, bond.loanToken, bond.totalLend);
    }

    function repayBond(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.borrower == msg.sender, "Caller is not the borrower");
        require(bond.isActive, "Bond is not active");
        require(!bond.readyToRepay, "Bond is already repaid");

        IERC20 loanToken = IERC20(bond.loanToken);
        IERC20 collateralToken = IERC20(bond.collateralToken);

        uint256 repaymentAmount = bond.totalLend + ((bond.totalLend * bond.borrowerInterestRate) / 1000);
        // console.log("repaymentAmount : ", repaymentAmount);
        uint256 interestPaid = repaymentAmount - bond.totalLend;

        if (useErc2Mode) {
            require(
                loanToken.transferFrom(msg.sender, address(this), repaymentAmount),
                "Transfer from borrower failed"
            );
        } else safeTransferToken(bond.loanToken, msg.sender, admin, repaymentAmount);

        if (useErc2Mode) {
            require(
                collateralToken.transfer(bond.borrower, bond.collateralAmount),
                "Transfer of collateral to borrower failed"
            );
        } else safeTransferToken(bond.collateralToken, admin, bond.borrower, bond.collateralAmount);

        bond.readyToRepay = true;

        emit BondRepaid(bondId, msg.sender, bond.totalLend, interestPaid, repaymentAmount, true);
    }

    function lenderClaim(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.readyToRepay, "Bond is not ready to repay");

        uint256 bondBalance = bondToken.balanceOf(msg.sender, bondId);

        require(bondBalance > 0, "Bond value insufficient");

        uint256 effectiveBondAmount = 0;
        if (bond.liquidationLoanTokenAmount > 0) {
            effectiveBondAmount = (bond.liquidationLoanTokenAmount * bondBalance) / bond.totalBond;
        } else {
            effectiveBondAmount = (bond.totalLend * bondBalance) / bond.totalBond;
        }
        // console.log("effectiveBondAmount:", effectiveBondAmount);

        uint256 lenderRepayment = effectiveBondAmount + ((effectiveBondAmount * bond.lenderInterestRate) / 1000);
        uint256 loanTokenAmount = bondTokenToLoanTokenCalculation(bond.loanToken, bondBalance);

        if (useErc2Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            uint256 currentBalance = loanToken.balanceOf(address(this));
            // console.log("currentBalance-loanToken-this: ", currentBalance);
            // console.log("lenderRepayment: ", lenderRepayment);
            require(loanToken.transfer(msg.sender, lenderRepayment), "Transfer to lender failed");
        } else safeTransferToken(bond.loanToken, admin, msg.sender, lenderRepayment);

        bondToken.burn(msg.sender, bondId, bondBalance);
        emit LenderClaimed(msg.sender, bondId, bondBalance, loanTokenAmount, lenderRepayment);
    }

    function liquidateBond(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive && !bond.readyToRepay, "Bond cannot be liquidated");

        (uint256 currentRate, ) = priceFeed.getLatestPrice(bond.loanToken, bond.collateralToken);
        uint256 currentCollateralValue = (bond.collateralAmount * currentRate) / 1e8;

        require(
            (currentCollateralValue * thresholdLiquidityCollateral[bond.collateralToken]) / 1000 < bond.totalLend,
            "Collateral value insufficient"
        );

        IERC20 loanToken = IERC20(bond.loanToken);
        uint256 currentBalance = loanToken.balanceOf(address(this));
        // console.log("liquidateBond-loanToken-this: ", currentBalance);
        // TODO : Swap Collateral token to loan token
        uint256 mockSwapLoanTokenReceive = 200 * 1e8;

        uint256 repaymentAmount = bond.totalLend + ((bond.totalLend * bond.borrowerInterestRate) / 1000);
        // console.log("liquidateBond-repaymentAmount-this: ", repaymentAmount);

        uint256 excessRefund = 0;
        if (mockSwapLoanTokenReceive > repaymentAmount) {
            excessRefund = mockSwapLoanTokenReceive - repaymentAmount;
            // console.log("liquidateBond-excessRefund-this: ", excessRefund);

            if (useErc2Mode) {
                require(loanToken.transfer(bond.borrower, excessRefund), "Transfer excess refund to borrower failed");
            } else safeTransferToken(bond.loanToken, admin, bond.borrower, excessRefund);
        }
        bond.liquidationLoanTokenAmount = mockSwapLoanTokenReceive - excessRefund;
        if (bond.liquidationLoanTokenAmount > bond.totalLend) {
            bond.liquidationLoanTokenAmount = bond.totalLend;
        }

        // console.log("liquidateBond-liquidationLoanTokenAmount-this: ", bond.liquidationLoanTokenAmount);

        bond.readyToRepay = true;

        emit BondLiquidated(
            bondId,
            bond.borrower,
            bond.collateralAmount,
            currentCollateralValue,
            mockSwapLoanTokenReceive,
            repaymentAmount,
            excessRefund
        );
    }

    function getBond(uint256 bondId) external view returns (Bond memory) {
        require(bondId < bonds.length, "Bond does not exist");
        return bonds[bondId];
    }

    function getUserBonds(address user) external view returns (uint256[] memory) {
        return userBonds[user];
    }
}
