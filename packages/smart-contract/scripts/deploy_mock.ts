import * as hre from "hardhat";
import { Signer } from "ethers";
import { ERC20Token } from "../typechain-types";
import { saveContractAddress } from "./utils/file";
const contract_address_name = "mock_token";
const ethers = hre.ethers;

async function main() {
    const provider = ethers.provider;
    const network = await provider.getNetwork();

    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    console.log("admin: " + admin);

    const ERC20TokenFactory = await ethers.getContractFactory("ERC20Token");
    const erc20AddressContract: ERC20Token = await ERC20TokenFactory.deploy("Test", "Test");
    // await erc20AddressContract.waitForDeployment();
    await erc20AddressContract.deploymentTransaction();
    await erc20AddressContract.mint(admin, 10000);

    const erc20Address = await erc20AddressContract.getAddress();

    try {
        await hre.run("verify:verify", {
            address: erc20Address,
            hre,
        });
    } catch (err) {
        console.log("err >>", err);
    }

    const contractAddress = {
        erc20Address: erc20Address,
    };
    console.table(contractAddress);
    await saveContractAddress(network.name, contract_address_name, contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
