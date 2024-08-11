import {
    Client,
    TokenCreateTransaction,
    TokenId,
    Hbar,
    PrivateKey,
    AccountId,
    TransactionReceipt,
    TokenMintTransaction,
    AccountBalanceQuery,
    TransferTransaction,
    TokenAssociateTransaction,
} from "@hashgraph/sdk";
import dotenv from "dotenv";
import { Signer } from "ethers";
import * as hre from "hardhat";
import { BondIssuance, PriceFeed } from "../typechain-types";
import * as path from "path";
import * as fs from "fs";

dotenv.config();

const ethers = hre.ethers;
const bondIssuanceAbiPath = path.join(__dirname, "../contract-flattens/BondIssuance/BondIssuance.abi");
const bondIssuanceBytecodePath = path.join(__dirname, "../contract-flattens/BondIssuance/BondIssuance.bin");

async function createToken(
    client: Client,
    tokenName: string,
    tokenSymbol: string,
    treasuryAccountId: AccountId,
    adminKey: PrivateKey,
    supplyKey: PrivateKey,
    initialSupply = ethers.parseUnits("1", 18),
    decimals = 18,
): Promise<TokenId> {
    const transaction = await new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setTreasuryAccountId(treasuryAccountId)
        .setInitialSupply(initialSupply)
        .setDecimals(decimals)
        .setAdminKey(adminKey)
        .setSupplyKey(supplyKey)
        .setMaxTransactionFee(new Hbar(30))
        .freezeWith(client);

    const signTx = await (await transaction.sign(adminKey)).sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;

    console.log(`The new token ID is ${tokenId}`);
    return tokenId!;
}

async function mintToken(client: Client, tokenId: TokenId, amount: BigInt, supplyKey: PrivateKey): Promise<void> {
    const transaction = await new TokenMintTransaction().setTokenId(tokenId).setAmount(amount).freezeWith(client);

    const signTx = await transaction.sign(supplyKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);

    console.log(`Minted ${amount} tokens of ID: ${tokenId}`);
}

async function checkBalance(client: Client, accountId: AccountId): Promise<void> {
    const balance = await new AccountBalanceQuery().setAccountId(accountId).execute(client);

    console.log(`Balance for account ${accountId}: ${balance.tokens}`);
}

async function associateToken(
    client: Client,
    tokenId: TokenId,
    accountId: AccountId,
    adminKey: PrivateKey,
): Promise<void> {
    const transaction = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);

    console.log(`Associated token ID: ${tokenId} with account: ${accountId}`);
}

async function transferTokens(
    client: Client,
    tokenId: TokenId,
    fromAccountId: AccountId,
    toAccountId: AccountId,
    amount: number,
    adminKey: PrivateKey,
): Promise<void> {
    const transaction = await new TransferTransaction()
        .addTokenTransfer(tokenId, fromAccountId, -amount)
        .addTokenTransfer(tokenId, toAccountId, amount)
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);

    console.log(`Transferred ${amount} tokens of ID: ${tokenId} from ${fromAccountId} to ${toAccountId}`);
}

async function main() {
    // Hedera Client Setup
    const client = Client.forTestnet();
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    // Treasury account is the same as operator in this example
    const treasuryAccountId = operatorId;
    const adminKey = operatorKey;
    const supplyKey = operatorKey; // Using the same key for simplicity; ideally, use a different key for supply management

    // Create Tokens on Hedera
    const collateralTokenId = await createToken(
        client,
        "Collateral Token",
        "CTK",
        treasuryAccountId,
        adminKey,
        supplyKey,
    );
    const loanTokenId = await createToken(client, "Loan Token", "LTK", treasuryAccountId, adminKey, supplyKey);

    console.log(loanTokenId.toSolidityAddress(), collateralTokenId.toSolidityAddress());
    // Mint additional tokens
    await mintToken(client, collateralTokenId, ethers.parseUnits("1000", 18), supplyKey);
    await mintToken(client, loanTokenId, ethers.parseUnits("1000", 18), supplyKey);

    // Check balance
    await checkBalance(client, operatorId);

    // // Associate token with operator account
    // await associateToken(client, collateralTokenId, operatorId, adminKey);
    // await associateToken(client, loanTokenId, operatorId, adminKey);

    // Transfer tokens (assuming operator account is associated with the token)
    await transferTokens(client, collateralTokenId, operatorId, operatorId, 500, adminKey);
    await transferTokens(client, loanTokenId, operatorId, operatorId, 500, adminKey);

    console.log(`Tokens created and additional tokens minted with IDs: ${collateralTokenId} and ${loanTokenId}`);

    // Ethereum setup
    const provider = ethers.provider;
    const network = await provider.getNetwork();

    const accounts: Signer[] = await ethers.getSigners();
    const [adminEth, borrower, lender] = accounts;

    console.table({
        admin: await adminEth.getAddress(),
        borrower: await borrower.getAddress(),
        lender: await lender.getAddress(),
    });

    // Deploy PriceFeed contract
    const PriceFeedFactory = await ethers.getContractFactory("PriceFeed");
    const priceFeed: PriceFeed = await PriceFeedFactory.deploy();
    await priceFeed.waitForDeployment();
    console.log("PriceFeed deployed to:", await priceFeed.getAddress());

    // Deploy BondIssuance contract
    const abi = JSON.parse(fs.readFileSync(bondIssuanceAbiPath, "utf8"));
    const bytecode = fs.readFileSync(bondIssuanceBytecodePath, "utf8");
    // const BondIssuanceFactory = await ethers.getContractFactory("BondIssuance");
    const BondIssuanceFactory = new ethers.ContractFactory(abi, bytecode, adminEth);
    const bondIssuance: BondIssuance = (await BondIssuanceFactory.deploy(priceFeed.getAddress(), {
        gasLimit: 10000000,
    })) as BondIssuance;
    await bondIssuance.waitForDeployment();
    console.log("BondIssuance deployed to:", await bondIssuance.getAddress());

    // Mint tokens to respective addresses
    let tx = await mintToken(client, collateralTokenId, ethers.parseUnits("1000", 18), supplyKey);
    tx = await mintToken(client, loanTokenId, ethers.parseUnits("1000", 18), supplyKey);
    tx = await mintToken(client, loanTokenId, ethers.parseUnits("1000", 18), supplyKey);

    // Set initial price in the PriceFeed contract
    tx = await priceFeed.setInitialPrice(
        "0x" + loanTokenId.toSolidityAddress(),
        "0x" + collateralTokenId.toSolidityAddress(),
        ethers.parseUnits("1", 18),
    );

    // Configure BondIssuance contract
    tx = await bondIssuance.connect(adminEth).setBorrower(await borrower.getAddress());
    tx = await bondIssuance.connect(adminEth).setLender(await lender.getAddress());
    tx = await bondIssuance
        .connect(adminEth)
        .setRateTokenPerBond("0x" + loanTokenId.toSolidityAddress(), ethers.parseUnits("10", 18));
    tx = await bondIssuance
        .connect(adminEth)
        .setUpScaleCollateral("0x" + collateralTokenId.toSolidityAddress(), ethers.parseUnits("1500", 18));

    // Create bond and lending operations
    const bondDetails = {
        name: "Development Bond",
        loanAmount: ethers.parseUnits("100", 18),
        bondDuration: 12, // weeks
        borrowerInterestRate: 100, // 10%
        lenderInterestRate: 50, // 5%
        collateralTokenAddress: "0x" + collateralTokenId.toSolidityAddress(),
    };

    const rateLoanTokenPerCollateralToken = await priceFeed.getLatestPrice(
        "0x" + loanTokenId.toSolidityAddress(),
        "0x" + collateralTokenId.toSolidityAddress(),
    );
    const amountCollateral =
        ((BigInt(bondDetails.loanAmount.toString()) / BigInt(rateLoanTokenPerCollateralToken[0].toString())) *
            BigInt(await bondIssuance.upScaleCollateral("0x" + collateralTokenId.toSolidityAddress()))) /
        BigInt(1000);

    // tx = await transferTokens(
    //     client,
    //     collateralTokenId,
    //     operatorId,
    //     AccountId.fromEvmAddress(0, 0, await borrower.getAddress()),
    //     Number(amountCollateral.toString()),
    //     adminKey,
    // );
    tx = await bondIssuance
        .connect(borrower)
        .createBond(
            bondDetails.name,
            "0x" + loanTokenId.toSolidityAddress(),
            bondDetails.loanAmount,
            bondDetails.bondDuration,
            bondDetails.borrowerInterestRate,
            bondDetails.lenderInterestRate,
            bondDetails.collateralTokenAddress,
        );

    const bondId = 0;
    const bond = await bondIssuance.getBond(bondId);
    console.log(bond);
    if (bond.name !== bondDetails.name || bond.loanAmount.toString() !== bondDetails.loanAmount.toString()) {
        throw new Error("Bond creation failed.");
    }

    tx = await transferTokens(
        client,
        loanTokenId,
        operatorId,
        AccountId.fromEvmAddress(0, 0, await lender.getAddress()),
        Number(bondDetails.loanAmount.toString()),
        adminKey,
    );
    tx = await bondIssuance.connect(lender).buyBond(bondId, bondDetails.loanAmount);

    const updatedBond = await bondIssuance.getBond(bondId);
    if (updatedBond.totalLend.toString() !== bondDetails.loanAmount.toString()) {
        throw new Error("Bond lending failed.");
    }

    // await hre.network.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]); // + 7 days
    const beforeBalance = await checkBalance(client, AccountId.fromEvmAddress(0, 0, await borrower.getAddress()));
    tx = await bondIssuance.connect(borrower).borrowerClaim(bondId);
    const afterBalance = await checkBalance(client, AccountId.fromEvmAddress(0, 0, await borrower.getAddress()));
    console.log({ beforeBalance: beforeBalance, afterBalance: afterBalance });

    // await hre.network.provider.send("evm_increaseTime", [12 * 7 * 24 * 60 * 60 + 1]); // + 12 weeks
    const repaymentAmount = ethers.parseUnits("200", 18); // Original plus interest
    tx = await transferTokens(
        client,
        loanTokenId,
        AccountId.fromEvmAddress(0, 0, await borrower.getAddress()),
        operatorId,
        Number(repaymentAmount.toString()),
        adminKey,
    );
    tx = await bondIssuance.connect(borrower).repayBond(bondId);

    const finalBond = await bondIssuance.getBond(bondId);
    if (!finalBond.isRepaid) {
        throw new Error("Bond repayment failed.");
    }

    console.log("Bond issuance, lending, and repayment completed successfully.");
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
