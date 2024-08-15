import { AccountId, Client, PrivateKey, TokenId } from "@hashgraph/sdk";
import { Signer } from "ethers";
import * as fs from "fs";
import * as hre from "hardhat";
import * as path from "path";
import { BondIssuance, ERC20Token, HederaERC20TokenManage, PriceFeed } from "../typechain-types";
import { addressToAccountId, approveTokenAllowance, associateToken } from "./token";
import { sleep } from "./utils/time";

const ethers = hre.ethers;
const bondIssuanceAbiPath = path.join(__dirname, "../contract-flattens/BondIssuance/BondIssuance.abi");
const bondIssuanceBytecodePath = path.join(__dirname, "../contract-flattens/BondIssuance/BondIssuance.bin");

const priceFeedAbiPath = path.join(__dirname, "../contract-flattens/PriceFeed/PriceFeed.abi");
const priceFeedBytecodePath = path.join(__dirname, "../contract-flattens/PriceFeed/PriceFeed.bin");
let tx = null;

async function main() {
    const provider = ethers.provider;
    const network = await provider.getNetwork();

    const accounts: Signer[] = await ethers.getSigners();
    const [admin, borrower, lender] = accounts;
    console.table({
        admin: await admin.getAddress(),
        borrower: await borrower.getAddress(),
        lender: await lender.getAddress(),
    });

    const client = Client.forTestnet();
    const clientBorrower = Client.forTestnet();
    const clientLender = Client.forTestnet();

    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);

    const operatorIdBorrower = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID_1!);
    const operatorKeyBorrower = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY_1!);

    const operatorIdLender = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID_2!);
    const operatorKeyLender = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY_2!);

    client.setOperator(operatorId, operatorKey);
    clientBorrower.setOperator(operatorIdBorrower, operatorKeyBorrower);
    clientLender.setOperator(operatorIdLender, operatorKeyLender);

    const collateralTokenInfo = {
        address: "0x0000000000000000000000000000000000474Df2",
        accountId: "0.0.4673010",
    };

    const loanTokenInfo = {
        address: "0x0000000000000000000000000000000000474df3",
        accountId: "0.0.4673011",
    };

    // Deploy PriceFeed contract
    const HederaERC20TokenManageFactory = await ethers.getContractFactory("HederaERC20TokenManage");

    const abiPriceFeed = JSON.parse(fs.readFileSync(priceFeedAbiPath, "utf8"));
    const bytecodePriceFeed = fs.readFileSync(priceFeedBytecodePath, "utf8");
    const PriceFeedFactory = new ethers.ContractFactory(abiPriceFeed, bytecodePriceFeed, admin);
    // const priceFeed: PriceFeed = (await PriceFeedFactory.deploy()) as PriceFeed;
    // await priceFeed.waitForDeployment();

    const priceFeed: PriceFeed = PriceFeedFactory.attach("0xbe354fe8EA98dc9eE6684e4fD835780EfA946DB6") as PriceFeed;
    console.log("PriceFeed deployed to:", await priceFeed.getAddress());

    // Deploy ERC20Token contracts
    // const TokenFactory = await ethers.getContractFactory("ERC20Token");
    // const collateralToken: ERC20Token = await TokenFactory.deploy("Collateral Token", "CTK");
    // await collateralToken.waitForDeployment();

    const HederaERC20TokenManageContract: HederaERC20TokenManage = (await HederaERC20TokenManageFactory.attach(
        "0x1682d11948e374F13203ab16DAbFaB2a95CD2066",
    )) as HederaERC20TokenManage;
    // // const collateralToken = await deployHederaERC20TokenManage(admin, "Collateral Token", "CTK", 8);
    const TokenFactory = await ethers.getContractFactory("ERC20Token");
    const collateralToken: ERC20Token = TokenFactory.attach(collateralTokenInfo.address) as ERC20Token;
    console.log("Collateral Token deployed to:", await collateralToken.getAddress());

    // // const loanToken: ERC20Token = await TokenFactory.deploy("Loan Token", "LTK");
    // // await loanToken.waitForDeployment();

    // const loanToken = await deployHederaERC20TokenManage(admin, "Loan Token", "LTK", 8);
    const loanToken: ERC20Token = TokenFactory.attach(loanTokenInfo.address) as ERC20Token;
    console.log("Loan Token deployed to:", await loanToken.getAddress());

    // Deploy BondIssuance contract
    const abi = JSON.parse(fs.readFileSync(bondIssuanceAbiPath, "utf8"));
    const bytecode = fs.readFileSync(bondIssuanceBytecodePath, "utf8");
    // const BondIssuanceFactory = await ethers.getContractFactory("BondIssuance");
    const BondIssuanceFactory = new ethers.ContractFactory(abi, bytecode, admin);
    const bondIssuance: BondIssuance = (await BondIssuanceFactory.deploy(priceFeed.getAddress(), {
        gasLimit: 10000000,
    })) as BondIssuance;
    await bondIssuance.waitForDeployment();

    // const bytecode = fs.readFileSync(bondIssuanceBytecodePath);
    // const { contractId, adminKey, contractAddress } = await deployContractWithAdminKey(client, operatorKey, bytecode, [
    //     await priceFeed.getAddress(),
    // ]);
    // const bondIssuance: BondIssuance = (await BondIssuanceFactory.attach(contractAddress || "")) as BondIssuance;

    const bondIssuanceContractId = await addressToAccountId(client, `${bondIssuance.target}`);
    console.log("BondIssuance deployed to:", bondIssuance.target);
    console.log("BondIssuance deployed to:", bondIssuanceContractId.toString());

    try {
        await associateToken(
            clientBorrower,
            TokenId.fromString(collateralTokenInfo.accountId),
            operatorIdBorrower,
            operatorKeyBorrower,
        );
    } catch (error) {
        console.log(1, error);
    }

    try {
        await associateToken(
            clientBorrower,
            TokenId.fromString(loanTokenInfo.accountId),
            operatorIdBorrower,
            operatorKeyBorrower,
        );
    } catch (error) {
        console.log(2, error);
    }

    try {
        await associateToken(
            clientLender,
            TokenId.fromString(collateralTokenInfo.accountId),
            operatorIdLender,
            operatorKeyLender,
        );
    } catch (error) {
        console.log(3, error);
    }

    try {
        await associateToken(
            clientLender,
            TokenId.fromString(loanTokenInfo.accountId),
            operatorIdLender,
            operatorKeyLender,
        );
    } catch (error) {
        console.log(4, error);
    }

    try {
        await associateToken(client, TokenId.fromString(collateralTokenInfo.accountId), operatorId, operatorKey);
    } catch (error) {
        console.log(5, error);
    }

    try {
        await associateToken(client, TokenId.fromString(loanTokenInfo.accountId), operatorId, operatorKey);
    } catch (error) {
        console.log(6, error);
    }

    await approveTokenAllowance(
        client,
        TokenId.fromString(loanTokenInfo.accountId),
        operatorId,
        bondIssuanceContractId,
        10000000000 * 10 ** 8,
        operatorKey,
    );
    await approveTokenAllowance(
        client,
        TokenId.fromString(collateralTokenInfo.accountId),
        operatorId,
        bondIssuanceContractId,
        10000000000 * 10 ** 8,
        operatorKey,
    );

    // // Mint tokens to respective addresses
    // let tx = await collateralToken.mint(await borrower.getAddress(), ethers.parseUnits("1000", 8));
    // await tx.wait();
    // tx = await loanToken.mint(await borrower.getAddress(), ethers.parseUnits("1000", 8));
    // await tx.wait();
    // tx = await loanToken.mint(await lender.getAddress(), ethers.parseUnits("1000", 8));
    // await tx.wait();

    tx = await HederaERC20TokenManageContract.mint(0, await borrower.getAddress(), ethers.parseUnits("1000", 8));
    await tx.wait();
    tx = await HederaERC20TokenManageContract.mint(1, await borrower.getAddress(), ethers.parseUnits("1000", 8));
    await tx.wait();
    tx = await HederaERC20TokenManageContract.mint(1, await lender.getAddress(), ethers.parseUnits("1000", 8));
    await tx.wait();

    // Set initial price in the PriceFeed contract
    tx = await priceFeed.setPrice(collateralTokenInfo.address, loanTokenInfo.address, ethers.parseUnits("1", 8));
    await tx.wait();

    tx = await bondIssuance.connect(admin).setRateTokenPerBond(loanTokenInfo.address, ethers.parseUnits("10", 8));
    await tx.wait();
    tx = await bondIssuance.connect(admin).setUpScaleCollateral(collateralTokenInfo.address, 1500);
    await tx.wait();

    // Create bond and lending operations
    const bondDetails = {
        name: "Development Bond",
        loanAmount: ethers.parseUnits("100", 8),
        bondDuration: 12, // weeks
        borrowerInterestRate: 100, // 10%
        lenderInterestRate: 50, // 5%
        collateralTokenAddress: collateralTokenInfo.address,
    };

    const amountCollateral = await bondIssuance.collateralAmountCalculationWithScale(
        loanToken.target,
        bondDetails.loanAmount,
        collateralToken.target,
    );

    // tx = await collateralToken.connect(borrower).approve(bondIssuance.target, amountCollateral);

    await approveTokenAllowance(
        clientBorrower,
        TokenId.fromString(collateralTokenInfo.accountId),
        operatorIdBorrower,
        bondIssuanceContractId,
        +amountCollateral.toString(),
        operatorKeyBorrower,
    );
    await tx.wait();
    tx = await bondIssuance
        .connect(borrower)
        .createBond(
            bondDetails.name,
            loanTokenInfo.address,
            bondDetails.loanAmount,
            bondDetails.bondDuration,
            bondDetails.borrowerInterestRate,
            bondDetails.lenderInterestRate,
            bondDetails.collateralTokenAddress,
        );
    await tx.wait();
    const bondId = 0;
    const bond = await bondIssuance.getBond(bondId);
    console.log(bond);
    if (bond.name !== bondDetails.name || bond.loanAmount.toString() !== bondDetails.loanAmount.toString()) {
        throw new Error("Bond creation failed.");
    }

    // tx = await bondIssuance.swapCollateralToLoan(
    //     collateralTokenInfo.address,
    //     loanTokenInfo.address,
    //     100000000,
    //     0,
    //     999999999999,
    // );
    // await tx.wait();

    // tx = await loanToken.connect(lender).approve(bondIssuance.target, bondDetails.loanAmount);
    // await tx.wait();

    await approveTokenAllowance(
        clientLender,
        TokenId.fromString(loanTokenInfo.accountId),
        operatorIdLender,
        bondIssuanceContractId,
        +bondDetails.loanAmount.toString(),
        operatorKeyLender,
    );

    const boneAmount = await bondIssuance.calculateLoanTokenToBondToken(loanTokenInfo.address, bondDetails.loanAmount);

    tx = await bondIssuance.connect(lender).buyBond(bondId, boneAmount);
    await tx.wait();

    const updatedBond = await bondIssuance.getBond(bondId);
    if (updatedBond.totalLend.toString() !== bondDetails.loanAmount.toString()) {
        throw new Error("Bond lending failed.");
    }

    await sleep(8 * 60 * 1000); // 8 minutes
    const beforeBalance = await loanToken.balanceOf(await borrower.getAddress());
    tx = await bondIssuance.connect(borrower).borrowerClaim(bondId);
    await tx.wait();
    const afterBalance = await loanToken.balanceOf(await borrower.getAddress());
    console.log({ beforeBalance: beforeBalance.toString(), afterBalance: afterBalance.toString() });

    const repaymentAmount = ethers.parseUnits("200", 8); // Original plus interest
    // tx = await loanToken.connect(borrower).approve(bondIssuance.target, repaymentAmount);

    await approveTokenAllowance(
        clientBorrower,
        TokenId.fromString(loanTokenInfo.accountId),
        operatorIdBorrower,
        bondIssuanceContractId,
        +repaymentAmount.toString(),
        operatorKeyBorrower,
    );

    await tx.wait();
    tx = await bondIssuance.connect(borrower).repayBond(bondId);
    await tx.wait();

    const beforeBalanceClaim = await loanToken.balanceOf(await lender.getAddress());
    await bondIssuance.connect(lender).lenderClaim(bondId);
    const afterBalanceClaim = await loanToken.balanceOf(await lender.getAddress());
    console.log("Should lender claim", { beforeBalanceClaim, afterBalanceClaim });

    const finalBond = await bondIssuance.getBond(bondId);
    if (!finalBond.readyToRepay) {
        throw new Error("Bond repayment failed.");
    }

    console.log("Bond issuance, lending, and repayment completed successfully.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
