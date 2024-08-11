import { Signer } from "ethers";
import * as fs from "fs";
import * as hre from "hardhat";
import * as path from "path";
import { HederaERC20TokenManage } from "../typechain-types";

const ethers = hre.ethers;
const wrapErc20AbiPath = path.join(__dirname, "../contract-flattens/HederaERC20TokenManage/HederaERC20TokenManage.abi");
const wrapErc20BytecodePath = path.join(
    __dirname,
    "../contract-flattens/HederaERC20TokenManage/HederaERC20TokenManage.bin",
);

export async function deployHederaERC20TokenManage(
    admin: Signer,
    name: string,
    symbol: string,
    decimal: number,
): Promise<HederaERC20TokenManage> {
    const abi = JSON.parse(fs.readFileSync(wrapErc20AbiPath, "utf8"));
    const bytecode = fs.readFileSync(wrapErc20BytecodePath, "utf8");
    const BondIssuanceFactory = new ethers.ContractFactory(abi, bytecode, admin);

    const bondIssuance: HederaERC20TokenManage = (await BondIssuanceFactory.deploy(name, symbol, decimal, 0, {
        value: ethers.parseEther("20"),
        gasLimit: 1000000,
    })) as HederaERC20TokenManage;

    await bondIssuance.waitForDeployment();
    return bondIssuance;
}

// async function main() {
//     const accounts: Signer[] = await ethers.getSigners();
//     const [admin, user, user1] = accounts;
//     console.table({ admin, user, user1 });

//     const evmAddress = await deployHederaERC20TokenManage(admin, "Hedera erc20 wrap", "HEW", 8);
//     console.log("HederaERC20TokenManage deployed to:", evmAddress.target);
//     let tx = null;
//     tx = await evmAddress.mint(await admin.getAddress(), 10000000000);
//     await tx.wait();
//     tx = await evmAddress.approve(await user.getAddress(), 10000000000);
//     await tx.wait();
//     tx = await evmAddress
//         .connect(user)
//         ["transferFrom(address,address,uint256)"](await admin.getAddress(), await user1.getAddress(), 100000000);
//     await tx.wait();
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });
