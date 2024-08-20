import { Signer } from "ethers";
import * as fs from "fs";
import * as hre from "hardhat";
import * as path from "path";
import { HederaERC20TokenManage } from "../typechain-types";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const ethers = hre.ethers;
const bondIssuanceAbiPath = path.join(
    __dirname,
    "../contract-flattens/HederaERC20TokenManage/HederaERC20TokenManage.abi",
);
const bondIssuanceBytecodePath = path.join(
    __dirname,
    "../contract-flattens/HederaERC20TokenManage/HederaERC20TokenManage.bin",
);

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

    // Deploy HederaERC20TokenManage contract
    const abi = JSON.parse(fs.readFileSync(bondIssuanceAbiPath, "utf8"));
    const bytecode = fs.readFileSync(bondIssuanceBytecodePath, "utf8");
    const BondIssuanceFactory = new ethers.ContractFactory(abi, bytecode, admin);
    // const bondIssuance: HederaERC20TokenManage = (await BondIssuanceFactory.attach(
    //     "0x2834bcbf3e3356c8137fd562a96f240e9be037ed",
    // )) as HederaERC20TokenManage;
    const bondIssuance: HederaERC20TokenManage = (await BondIssuanceFactory.deploy({
        gasLimit: 10000000,
    })) as HederaERC20TokenManage;
    // await bondIssuance.waitForDeployment();
    let tx = null;
    console.log("HederaERC20TokenManage deployed to:", await bondIssuance.getAddress());
    tx = await bondIssuance.createToken("Collateral Token", "CTK", 8, 0, {
        value: ethers.parseEther("20"),
    });
    await tx.wait();
    tx = await bondIssuance.createToken("Loan Token", "LTK", 8, 0, {
        value: ethers.parseEther("20"),
    });
    await tx.wait();

    tx = await bondIssuance.tokenAssociate(0, {
        gasLimit: 15000000,
    });

    tx = await bondIssuance.tokenAssociate(1, {
        gasLimit: 15000000,
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
