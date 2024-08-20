// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./BondERC1155Token.sol";
import "./hedera/system/SafeHederaTokenService.sol";

/**
 * @title BondIssuance
 * @dev [Vincent]
 */

// feature update: check priceFeed last update is validate
// feature update: support for different token decimal
interface IPriceFeed {
    function getLatestPrice(address _tokenA, address _tokenB) external view returns (uint256, uint256); // price, lastUpdated
}

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract BondIssuance is AccessControl, ReentrancyGuard, SafeHederaTokenService {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public vault;

    bool public useErc20Mode = false;
    uint256 public platformFeePercent = 50; // 5%
    uint256 public issuanceDateWaitingLoan;
    address public platformFeeAddress;

    IPriceFeed public priceFeed;
    BondERC1155Token public bondToken;
    IUniswapV2Router public saucerSwapRouter = IUniswapV2Router(0x0000000000000000000000000000000000004b40);

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
        uint256 platformFeePercent;
        address collateralToken;
        uint256 collateralAmount;
        uint256 issuanceDate;
        uint256 maturityDate;
        address borrower;
        Lender[] lenders;
        uint256 totalLend;
        uint256 totalBond;
        uint256 liquidationLoanTokenAmount;
        bool isActive;
        bool readyToRepay;
        bool isBorrowerClaimed;
    }

    Bond[] public bonds;
    mapping(address => uint256[]) public userBonds;
    mapping(address => uint256) public loanTokenRatePerBond;
    mapping(address => uint256) public collateralScalingFactor;
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
        uint256 repaymentAmount,
        uint256 interestPaid,
        uint256 collateralReturnedAmount
    );
    event BorrowerClaimLoanToken(uint256 bondId, address indexed borrower, address loanToken, uint256 loanAmount);
    event BorrowerRefundoanToken(
        uint256 bondId,
        address indexed borrower,
        address collateralToken,
        uint256 collateralAmount
    );

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
        uint256 indexed bondId,
        address indexed lender,
        uint256 bondTokenAmount,
        uint256 loanTokenAmount,
        uint256 interestLoanTokenAmount,
        uint256 repaymentAmount
    );
    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event CollateralAdded(
        uint256 indexed bondId,
        address indexed borrower,
        address collateralToken,
        uint256 additionalCollateralAmount,
        uint256 newCollateralAmount
    );

    constructor(address _priceFeed) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        priceFeed = IPriceFeed(_priceFeed);
        platformFeeAddress = msg.sender;

        bondToken = new BondERC1155Token("https://hedera.com/ipfs/vincent");
        vault = address(this);
        issuanceDateWaitingLoan = 7 minutes;
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    function setPlatformFeeAddress(address _newFeeAddress) external onlyAdmin {
        require(_newFeeAddress != address(0), "Invalid address");
        platformFeeAddress = _newFeeAddress;
    }

    function setRateTokenPerBond(address _token, uint256 _rate) external onlyAdmin {
        loanTokenRatePerBond[_token] = _rate;
        emit RateTokenPerBondUpdated(_token, _rate);
    }

    function setUpScaleCollateral(address _token, uint256 _scale) external onlyAdmin {
        // 1000 scale is 100%
        collateralScalingFactor[_token] = _scale;
        emit UpScaleCollateralUpdated(_token, _scale);
    }

    function setThresholdLiquidityCollateral(address _token, uint256 _scale) external onlyAdmin {
        thresholdLiquidityCollateral[_token] = _scale;
    }

    function setPlatformFee(uint256 _newFee) external onlyAdmin {
        require(_newFee <= 1000, "Fee must be less than or equal to 1000");
        uint256 oldFee = platformFeePercent;
        platformFeePercent = _newFee;
        emit PlatformFeeUpdated(oldFee, _newFee);
    }

    function setIssuanceDateWaitingLoan(uint256 _waitingPeriod) external onlyAdmin {
        issuanceDateWaitingLoan = _waitingPeriod;
    }

    function calculateLoanTokenToBondToken(address _loanToken, uint256 _loanAmount) public view returns (uint256) {
        require(loanTokenRatePerBond[_loanToken] > 0, "Rate for loan token not set.");
        return _loanAmount / loanTokenRatePerBond[_loanToken];
    }

    function calculateBondTokenToLoanToken(address _loanToken, uint256 _bondTokenAmount) public view returns (uint256) {
        require(loanTokenRatePerBond[_loanToken] > 0, "Rate for loan token not set.");
        return _bondTokenAmount * loanTokenRatePerBond[_loanToken];
    }

    function collateralAmountCalculation(
        address _loanToken,
        uint256 _loanAmount,
        address _collateralToken
    ) public view returns (uint256) {
        (uint256 collateralRate, ) = priceFeed.getLatestPrice(_collateralToken, _loanToken);
        require(collateralRate > 0, "Invalid price from price feed");
        return (_loanAmount * 1e8) / collateralRate;
    }

    function collateralAmountCalculationWithScale(
        address _loanToken,
        uint256 _loanAmount,
        address _collateralToken
    ) public view returns (uint256) {
        (uint256 collateralRate, ) = priceFeed.getLatestPrice(_collateralToken, _loanToken);
        require(collateralRate > 0, "Invalid price from price feed");
        uint256 scale = collateralScalingFactor[_collateralToken];
        require(scale > 0, "Upscale factor for collateral token is not set");
        return ((((_loanAmount * 1e8) / collateralRate) * scale) / 1000);
    }

    function calculateBondDates(
        uint256 _bondDuration
    ) private view returns (uint256 issuanceDate, uint256 maturityDate) {
        issuanceDate = block.timestamp + issuanceDateWaitingLoan;
        maturityDate = issuanceDate + (_bondDuration * 1 hours);
    }

    function createBond(
        string memory _name,
        address _loanToken,
        uint256 _loanAmount,
        uint256 _bondDuration, // in hours
        uint256 _borrowerInterestRate,
        uint256 _lenderInterestRate,
        address _collateralToken
    ) public {
        uint256 volumeBond = calculateLoanTokenToBondToken(_loanToken, _loanAmount);
        require(volumeBond > 0, "Volume bond must be greater than 1");
        require(
            _lenderInterestRate + platformFeePercent == _borrowerInterestRate,
            "Lender Interest Rate and Platform Fee must equal Borrower Interest Rate"
        );

        uint256 issuanceDate;
        uint256 maturityDate;
        (issuanceDate, maturityDate) = calculateBondDates(_bondDuration);

        uint256 collateralAmount = collateralAmountCalculationWithScale(_loanToken, _loanAmount, _collateralToken);

        Bond memory newBond = Bond({
            name: _name,
            loanToken: _loanToken,
            loanAmount: _loanAmount,
            volumeBond: volumeBond,
            bondDuration: _bondDuration,
            borrowerInterestRate: _borrowerInterestRate,
            platformFeePercent: platformFeePercent,
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

        if (useErc20Mode) {
            IERC20 collateralToken = IERC20(newBond.collateralToken);
            require(
                collateralToken.transferFrom(msg.sender, address(this), newBond.collateralAmount),
                "Collateral transfer from borrower failed"
            );
        } else {
            safeTransferToken(newBond.collateralToken, msg.sender, vault, newBond.collateralAmount);
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
        address lender = msg.sender;
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid");
        require(block.timestamp <= bond.issuanceDate, "Bond was issuanced");

        uint256 amountLend = calculateBondTokenToLoanToken(bond.loanToken, amount);
        require(bond.totalLend + amountLend <= bond.loanAmount, "Borrower not need borrow more");

        if (useErc20Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transferFrom(lender, address(this), amountLend), "Transfer failed");
        } else {
            safeTransferToken(bond.loanToken, lender, vault, amountLend);
        }

        bond.lenders.push(Lender({lender: lender, amountLend: amountLend, amountBond: amount}));
        bond.totalLend += amountLend;
        bond.totalBond += amount;
        bondToken.mint(lender, bondId, amount, "");

        emit LenderParticipated(bondId, lender, amountLend, amount);
    }

    function borrowerClaim(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist.");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid.");
        require(!bond.isBorrowerClaimed, "Claimed before");
        require(block.timestamp > bond.issuanceDate, "Claim must be after issuance date.");

        if (useErc20Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transfer(bond.borrower, bond.totalLend), "Transfer to lend token to borrower failed");
        } else {
            safeTransferToken(bond.loanToken, vault, bond.borrower, bond.totalLend);
        }

        bond.isBorrowerClaimed = true;

        emit BorrowerClaimLoanToken(bondId, bond.borrower, bond.loanToken, bond.totalLend);
    }

    function borrowerRefund(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist.");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid.");
        require(!bond.isBorrowerClaimed, "Claimed before");
        require(bond.totalLend == 0, "Refund must be no lender participation.");
        if (block.timestamp <= bond.issuanceDate) {
            require(bond.borrower == msg.sender, "Only borrower refund in issuance date time.");
        }
        if (useErc20Mode) {
            IERC20 collateralToken = IERC20(bond.collateralToken);
            require(
                collateralToken.transfer(bond.borrower, bond.collateralAmount),
                "Transfer to collateral token to borrower failed"
            );
        } else {
            safeTransferToken(bond.collateralToken, vault, bond.borrower, bond.collateralAmount);
        }

        bond.isBorrowerClaimed = true;
        bond.isActive = false;

        emit BorrowerRefundoanToken(bondId, bond.borrower, bond.collateralToken, bond.collateralAmount);
    }

    function repayBond(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid");
        require(block.timestamp > bond.issuanceDate, "Repay Bond be in issuance date");

        uint256 repaymentAmount = bond.totalLend + (bond.totalLend * bond.borrowerInterestRate) / 1000;
        uint256 interestPaid = repaymentAmount - bond.totalLend;

        uint256 platformFee = ((bond.totalLend * bond.platformFeePercent) / 1000) - 1;

        IERC20 loanToken = IERC20(bond.loanToken);
        IERC20 collateralToken = IERC20(bond.collateralToken);
        if (useErc20Mode) {
            require(
                loanToken.transferFrom(msg.sender, address(this), repaymentAmount),
                "Transfer from borrower failed"
            );
            require(
                collateralToken.transfer(bond.borrower, bond.collateralAmount),
                "Transfer of collateral to borrower failed"
            );
            require(loanToken.transfer(platformFeeAddress, platformFee), "Transfer of platform fee failed");
        } else {
            safeTransferToken(bond.collateralToken, vault, bond.borrower, bond.collateralAmount);
            safeTransferToken(bond.loanToken, msg.sender, vault, repaymentAmount);
            safeTransferToken(bond.loanToken, vault, platformFeeAddress, platformFee);
        }

        bond.readyToRepay = true;

        emit BondRepaid(bondId, bond.borrower, bond.totalLend, repaymentAmount, interestPaid, bond.collateralAmount);
    }

    function lenderClaim(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(bond.readyToRepay, "Bond is not ready to repay");

        uint256 bondBalance = bondToken.balanceOf(msg.sender, bondId);
        require(bondBalance > 0, "Bond value insufficient");

        uint256 effectiveLoanAmount = (bond.liquidationLoanTokenAmount > 0)
            ? (bond.liquidationLoanTokenAmount * bondBalance) / bond.totalBond
            : (bond.totalLend * bondBalance) / bond.totalBond;

        uint256 repaymentAmount = effectiveLoanAmount + ((effectiveLoanAmount * bond.lenderInterestRate) / 1000);
        uint256 loanTokenAmount = calculateBondTokenToLoanToken(bond.loanToken, bondBalance);

        if (useErc20Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transfer(msg.sender, repaymentAmount), "Transfer to lender failed");
        } else {
            safeTransferToken(bond.loanToken, vault, msg.sender, repaymentAmount);
        }

        bondToken.burn(msg.sender, bondId, bondBalance);

        emit LenderClaimed(
            bondId,
            msg.sender,
            bondBalance,
            loanTokenAmount,
            repaymentAmount - loanTokenAmount,
            repaymentAmount
        );
    }

    function isBondLiquidatable(uint256 bondId) public view returns (uint256, bool) {
        Bond memory bond = bonds[bondId];

        require(
            thresholdLiquidityCollateral[bond.collateralToken] > 0,
            "Threshold liquidity collateral not set for this token."
        );
        (uint256 currentRate, ) = priceFeed.getLatestPrice(bond.collateralToken, bond.loanToken);
        uint256 currentCollateralValue = (bond.collateralAmount * currentRate) / 1e8;
        return (
            currentCollateralValue,
            currentCollateralValue < (bond.totalLend * thresholdLiquidityCollateral[bond.collateralToken]) / 1000
        );
    }

    function liquidateBond(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive && !bond.readyToRepay, "Bond cannot be liquidated");
        (uint256 currentCollateralValue, bool isLiquidate) = isBondLiquidatable(bondId);
        require(
            isLiquidate || block.timestamp > bond.maturityDate,
            "Liquidated must hight rich or after maturity date"
        );

        IERC20 loanToken = IERC20(bond.loanToken);
        uint256 swapLoanTokenReceive = 0;
        if (useErc20Mode) {
            swapLoanTokenReceive = 200 * 1e8; // mock
        } else {
            uint256[] memory amounts = swapCollateralToLoan(
                bond.collateralToken,
                bond.loanToken,
                bond.collateralAmount,
                0,
                block.timestamp + 15 minutes
            );
            swapLoanTokenReceive = amounts[1];
        }

        uint256 repaymentAmount = bond.totalLend + (bond.totalLend * bond.borrowerInterestRate) / 1000;
        uint256 platformFee = ((bond.totalLend * bond.platformFeePercent) / 1000) - 1;

        uint256 excessRefund = 0;
        if (swapLoanTokenReceive > repaymentAmount) {
            excessRefund = swapLoanTokenReceive - repaymentAmount;

            if (useErc20Mode) {
                require(loanToken.transfer(bond.borrower, excessRefund), "Transfer excess refund to borrower failed");
            } else {
                safeTransferToken(bond.loanToken, vault, bond.borrower, excessRefund);
            }
        }
        bond.liquidationLoanTokenAmount = swapLoanTokenReceive - excessRefund;
        bond.liquidationLoanTokenAmount = bond.liquidationLoanTokenAmount > bond.totalLend
            ? bond.totalLend
            : swapLoanTokenReceive - excessRefund;

        if (useErc20Mode) {
            require(loanToken.transfer(platformFeeAddress, platformFee), "Transfer of platform fee failed");
        } else {
            safeTransferToken(bond.loanToken, vault, platformFeeAddress, platformFee); //transfer fee
        }

        bond.readyToRepay = true;

        emit BondLiquidated(
            bondId,
            bond.borrower,
            bond.collateralAmount,
            currentCollateralValue,
            swapLoanTokenReceive,
            repaymentAmount,
            excessRefund
        );
    }

    function addCollateral(uint256 bondId, uint256 additionalCollateralAmount) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid");

        if (useErc20Mode) {
            IERC20 collateralToken = IERC20(bond.collateralToken);
            require(
                collateralToken.transferFrom(msg.sender, address(this), additionalCollateralAmount),
                "Collateral transfer from borrower failed"
            );
        } else {
            safeTransferToken(bond.collateralToken, msg.sender, vault, additionalCollateralAmount);
        }

        bond.collateralAmount += additionalCollateralAmount;

        emit CollateralAdded(
            bondId,
            bond.borrower,
            bond.collateralToken,
            additionalCollateralAmount,
            bond.collateralAmount
        );
    }

    function swapCollateralToLoan(
        address collateralToken,
        address loanToken,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 deadline
    ) private returns (uint256[] memory) {
        require(amountIn > 0, "Amount in must be greater than 0");
        require(collateralToken != address(0) && loanToken != address(0), "Invalid token addresses");
        address[] memory path = new address[](2);
        path[0] = collateralToken;
        path[1] = loanToken;

        if (useErc20Mode) {
            IERC20(collateralToken).approve(address(saucerSwapRouter), amountIn);
        } else {
            safeApprove(collateralToken, address(saucerSwapRouter), amountIn);
        }

        uint256[] memory amounts = saucerSwapRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );

        return amounts;
    }

    function getBond(uint256 bondId) external view returns (Bond memory) {
        require(bondId < bonds.length, "Bond does not exist");
        return bonds[bondId];
    }

    function getUserBonds(address user) external view returns (uint256[] memory) {
        return userBonds[user];
    }

    function tokenAssociate(address token) external onlyAdmin {
        safeAssociateToken(address(this), token);
    }
}
