import {
    AccountId,
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    ContractId,
    PrivateKey,
} from "@hashgraph/sdk";
import axios from "axios";
import { ethers } from "ethers";
import { getCurrentTimestampSecond, sleep } from "./utils/time";

// Constants
const networkId = "testnet";
const hashioRpc = `https://${networkId}.hashio.io/api`;
const bondsApi = "https://conquer2earn.dev.api.var-meta.com/api/internal/bonds";
const routerSwapEvmAddress = "0x0000000000000000000000000000000000004b40";

const contractIdPriceFeedString = "0.0.4679277";
const bondIssuanceEvmAddress = "0xC83442b46A03309af2058D0A5A1AB9F83D98ebd9";
const bondIssuanceContractIdString = "0.0.4689688";
const pairTokens = [
    { tokenA: "0x0000000000000000000000000000000000474Df2", tokenB: "0x0000000000000000000000000000000000474df3" },
];

const abiBondIssuance = [
    "function getBond(uint256 bondId) view returns ((string name, address loanToken, uint256 loanAmount, uint256 volumeBond, uint256 bondDuration, uint256 borrowerInterestRate, uint256 lenderInterestRate, address collateralToken, uint256 collateralAmount, uint256 issuanceDate, uint256 maturityDate, address borrower, (address lender, uint256 amountLend, uint256 amountBond)[] lenders, uint256 totalLend, uint256 totalBond, uint256 liquidationLoanTokenAmount, bool isActive, bool readyToRepay, bool isBorrowerClaimed))",
    "function isBondLiquidatable(uint256 bondId) view returns (uint256, bool)",
];
const abiSwap = [
    "function getAmountsOut(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)",
];

// Types
export interface Bond {
    bondId: number;
    name: string;
    loanTerm: number;
    loanAmount: string;
    totalSold: number;
    loanToken: string;
    collateralAmount: string;
    collateralToken: string;
    volumeBond: string;
    borrowerInterestRate: string;
    lenderInterestRate: string;
    issuanceDate: string;
    maturityDate: string;
    borrowerAddress: string;
    contractAddress: string;
    transactionHash: string;
    onchainStatus: string;
    status: string;
    claimedLoanAt: string | null;
    repaidAt: string | null;
    repaidAmount: string | null;
    gracePeriodEndsAt: string | null;
    liquidatedAt: string | null;
    canceledAt: string | null;
    blockNumber: string;
    createdAt: string;
    updatedAt: string;
}

// Helper functions
const getEthersProvider = () => new ethers.JsonRpcProvider(hashioRpc, "", { batchMaxCount: 1 });

const getBondContract = (contractAddress: string) =>
    new ethers.Contract(contractAddress, abiBondIssuance, getEthersProvider());

const getBond = async (contractAddress: string, bondId: number) => {
    const contract = getBondContract(contractAddress);
    try {
        const bond = await contract.getBond(bondId);
        return {
            name: bond.name,
            loanToken: bond.loanToken,
            loanAmount: bond.loanAmount.toString(),
            volumeBond: bond.volumeBond.toString(),
            bondDuration: bond.bondDuration.toString(),
            borrowerInterestRate: bond.borrowerInterestRate.toString(),
            lenderInterestRate: bond.lenderInterestRate.toString(),
            collateralToken: bond.collateralToken,
            collateralAmount: bond.collateralAmount.toString(),
            issuanceDate: bond.issuanceDate.toString(),
            maturityDate: bond.maturityDate.toString(),
            borrower: bond.borrower,
            lenders: bond.lenders,
            totalLend: bond.totalLend.toString(),
            totalBond: bond.totalBond.toString(),
            liquidationLoanTokenAmount: bond.liquidationLoanTokenAmount.toString(),
            isActive: bond.isActive,
            readyToRepay: bond.readyToRepay,
            isBorrowerClaimed: bond.isBorrowerClaimed,
        };
    } catch (error) {
        throw error;
    }
};

const isBondLiquidatable = async (contractAddress: string, bondId: number) => {
    const contract = new ethers.Contract(contractAddress, abiBondIssuance, getEthersProvider());
    try {
        const [currentCollateralValue, isLiquidatable] = await contract.isBondLiquidatable(bondId);
        return { currentCollateralValue, isBondLiquidatable: isLiquidatable };
    } catch (error) {
        throw error;
    }
};

const fetchBondOffChains = async (): Promise<Bond[]> => {
    try {
        const response = await axios.get<Bond[]>(bondsApi);
        return (response.data as any).data;
    } catch (error) {
        throw error;
    }
};

const createTransaction = async (
    client: Client,
    contractId: ContractId,
    functionName: string,
    functionParams: ContractFunctionParameters,
    adminKey: PrivateKey,
) => {
    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction(functionName, functionParams)
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    return await txResponse.getReceipt(client);
};

const schedulePriceUpdate = async (
    client: Client,
    contractId: ContractId,
    tokenA: string,
    tokenB: string,
    newPrice: number,
    adminKey: PrivateKey,
) => {
    const functionParams = new ContractFunctionParameters().addAddress(tokenA).addAddress(tokenB).addUint256(newPrice);
    const receipt = await createTransaction(client, contractId, "setPrice", functionParams, adminKey);
    console.log(`Scheduled transaction with Schedule ID: ${receipt}`);
};

const borrowerClaim = async (client: Client, contractId: ContractId, bondId: number, adminKey: PrivateKey) => {
    const functionParams = new ContractFunctionParameters().addUint256(bondId);
    const receipt = await createTransaction(client, contractId, "borrowerClaim", functionParams, adminKey);
    console.log(`borrowerClaim receipt: ${receipt}`);
};

const borrowerRefund = async (client: Client, contractId: ContractId, bondId: number, adminKey: PrivateKey) => {
    const functionParams = new ContractFunctionParameters().addUint256(bondId);
    const receipt = await createTransaction(client, contractId, "borrowerRefund", functionParams, adminKey);
    console.log(`borrowerRefund receipt: ${receipt}`);
};

const liquidateBond = async (client: Client, contractId: ContractId, bondId: number, adminKey: PrivateKey) => {
    const functionParams = new ContractFunctionParameters().addUint256(bondId);
    const receipt = await createTransaction(client, contractId, "liquidateBond", functionParams, adminKey);
    console.log(`liquidateBond receipt: ${receipt}`);
};

const rateA_B = async (tokenA: string, tokenB: string) => {
    const provider = getEthersProvider();
    const route = [tokenA, tokenB];
    const routerContract = new ethers.Contract(routerSwapEvmAddress, abiSwap, provider);
    const amounts = await routerContract.getAmountsOut(1 * 10 ** 8, route);
    return +amounts[1].toString();
};

const priceUpdate = async () => {
    const contractId = ContractId.fromString(contractIdPriceFeedString);
    const client = Client.forTestnet();
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    for (const { tokenA, tokenB } of pairTokens) {
        try {
            const key = `${tokenA}_${tokenB}`;
            const rate = await rateA_B(tokenA, tokenB);
            console.log(`Fetch price ${tokenA}-${tokenB}: ${rate}`);

            if (rate !== lastRate[key]) {
                await schedulePriceUpdate(client, contractId, tokenA, tokenB, rate, operatorKey);
                lastRate[key] = rate;
            }
        } catch (error) {
            console.error(`priceUpdate : ${error}`);
        }
    }
};

const bondIssuance = async () => {
    const bondIssuanceContractId = ContractId.fromString(bondIssuanceContractIdString);
    const client = Client.forTestnet();
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    const bondOffChains = await fetchBondOffChains();
    for (const bondOffChain of bondOffChains) {
        try {
            const bond = await getBond(bondIssuanceEvmAddress, bondOffChain.bondId);
            console.log(bond);

            const timestampSecondNow = getCurrentTimestampSecond();
            if (
                bond.isActive &&
                timestampSecondNow > Number(bond.issuanceDate) &&
                bond.totalLend > 0 &&
                !bond.isBorrowerClaimed
            ) {
                await borrowerClaim(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
            } else if (
                bond.isActive &&
                timestampSecondNow > Number(bond.issuanceDate) &&
                bond.totalLend == 0 &&
                !bond.isBorrowerClaimed
            ) {
                await borrowerRefund(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
            } else if (bond.isActive && timestampSecondNow > Number(bond.maturityDate) && !bond.readyToRepay) {
                await liquidateBond(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
            } else if (bond.isActive && timestampSecondNow < Number(bond.maturityDate) && !bond.readyToRepay) {
                const isBondLiquidatableInfo = await isBondLiquidatable(bondIssuanceEvmAddress, bondOffChain.bondId);
                if (isBondLiquidatableInfo.isBondLiquidatable) {
                    await liquidateBond(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
                }
            }
        } catch (error) {
            console.error(`bondIssuance : ${error}`);
        }
    }
};

let lastRate: Record<string, number> = {};

async function main() {
    do {
        try {
            await priceUpdate();
            await bondIssuance();
            await sleep(5 * 60 * 1000); // sleep 65 minutes
        } catch (error) {
            console.error(error);
        }
    } while (true);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
