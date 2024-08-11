import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-docgen";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-log-remover";
dotenv.config();

const accounts = [
    process.env.PRIVATE_KEY || "",
    process.env.PRIVATE_KEY_1 || "",
    process.env.PRIVATE_KEY_2 || "",
    process.env.PRIVATE_KEY_3 || "",
];
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: { count: 100 },
        },
        local: {
            url: "http://localhost:7546",
            accounts: accounts,
            chainId: 298,
        },
        testnet: {
            url: "https://testnet.hashio.io/api",
            accounts: accounts,
            chainId: 296,
            timeout: 200000,
        },
        ftmtestnet: {
            url: `https://rpc.testnet.fantom.network/`,
            accounts: accounts,
        },
    },
    etherscan: {
        apiKey: {
            ftmTestnet: `${process.env.FANTOM_KEY}`,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    viaIR: true,
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./tests",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 200000,
        reporter: "mocha-multi-reporters",
        reporterOptions: {
            configFile: "./mocha-report.json",
        },
    },
    docgen: {
        path: "./docs",
        clear: true,
        runOnCompile: false,
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 1,
        enabled: process.env.REPORT_GAS ? true : false,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: "ETH",
        excludeContracts: [],
        src: "./contracts",
    },
    typechain: {
        outDir: "typechain-types",
        target: "ethers-v6",
    },
};

module.exports = config;
