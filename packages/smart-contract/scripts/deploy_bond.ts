import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { Signer } from "ethers";
import * as fs from "fs";
import * as hre from "hardhat";
import * as path from "path";
import { BondIssuance, PriceFeed } from "../typechain-types";
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const ethers = hre.ethers;
const bondIssuanceAbiPath = path.join(__dirname, "../contract-flattens/BondIssuance/BondIssuance.abi");
const bondIssuanceBytecodePath = path.join(__dirname, "../contract-flattens/BondIssuance/BondIssuance.bin");

async function main() {
    const client = Client.forTestnet();
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);

    client.setOperator(operatorId, operatorKey);

    const accounts: Signer[] = await ethers.getSigners();
    const [admin, borrower, lender] = accounts;
    console.table({
        admin: await admin.getAddress(),
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
    const BondIssuanceFactory = new ethers.ContractFactory(abi, bytecode, admin);
    const bondIssuance: BondIssuance = (await BondIssuanceFactory.deploy(priceFeed.getAddress(), {
        gasLimit: 10000000,
    })) as BondIssuance;
    await bondIssuance.waitForDeployment();
    console.log("BondIssuance deployed to:", await bondIssuance.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
