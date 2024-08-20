import * as hre from "hardhat";

async function main() {
    try {
        await hre.run("verify:verify", {
            address: "0xfad109dB4527244375ad17928ABFA398735Ab4BC",
            constructorArguments: [],
            hre,
        });
    } catch (err) {
        console.log("err >>", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
