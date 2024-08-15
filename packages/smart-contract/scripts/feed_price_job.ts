import {
    AccountId,
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    ContractId,
    PrivateKey,
    TransactionReceipt,
} from "@hashgraph/sdk";
import axios from "axios";
import * as ethers from "ethers";
import { getCurrentTimestampSecond, sleep } from "./utils/time";

const networkId = "testnet";
const hashioRpc = `https://${networkId}.hashio.io/api`;

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

async function getBond(contractAddress: string, bondId: number) {
    const provider = new ethers.JsonRpcProvider(hashioRpc);
    const abi = [
        "function getBond(uint256 bondId) view returns ((string name, address loanToken, uint256 loanAmount, uint256 volumeBond, uint256 bondDuration, uint256 borrowerInterestRate, uint256 lenderInterestRate, address collateralToken, uint256 collateralAmount, uint256 issuanceDate, uint256 maturityDate, address borrower, (address lender, uint256 amountLend, uint256 amountBond)[] lenders, uint256 totalLend, uint256 totalBond, uint256 liquidationLoanTokenAmount, bool isActive, bool readyToRepay, bool isBorrowerClaimed))",
    ];

    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        const bond = await contract.getBond(bondId);
        const bondJson = {
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
            lenders: bond.lenders, // Additional decoding may be needed here if complex
            totalLend: bond.totalLend.toString(),
            totalBond: bond.totalBond.toString(),
            liquidationLoanTokenAmount: bond.liquidationLoanTokenAmount.toString(),
            isActive: bond.isActive,
            readyToRepay: bond.readyToRepay,
            isBorrowerClaimed: bond.isBorrowerClaimed,
        };
        return bondJson;
    } catch (error) {
        throw error;
    }
}

async function isBondLiquidatable(contractAddress: string, bondId: number) {
    const provider = new ethers.JsonRpcProvider(hashioRpc);
    const abi = ["function isBondLiquidatable(uint256 bondId) view returns (uint256, bool)"];
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        const isBondLiquidatable = await contract.isBondLiquidatable(bondId);
        return {
            currentCollateralValue: isBondLiquidatable[0],
            isBondLiquidatable: isBondLiquidatable[1],
        };
    } catch (error) {
        throw error;
    }
}

const fetchBondOffChains = async (): Promise<Bond[]> => {
    try {
        const response = await axios.get<Bond[]>("https://conquer2earn.dev.api.var-meta.com/api/internal/bonds");
        return (response.data as any).data;
    } catch (error) {
        throw error;
    }
};

export async function schedulePriceUpdate(
    client: Client,
    contractId: ContractId,
    tokenA: string,
    tokenB: string,
    newPrice: number,
    adminKey: PrivateKey,
): Promise<void> {
    const functionParams = new ContractFunctionParameters().addAddress(tokenA).addAddress(tokenB).addUint256(newPrice);

    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("setPrice", functionParams)
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);
    console.log(`Scheduled transaction with Schedule ID: ${receipt}`);
}

async function rateA_B(tokenA: string, tokenB: string) {
    const routerEvmAddress = "0x0000000000000000000000000000000000004b40"; // swap

    const provider = new ethers.JsonRpcProvider(hashioRpc, "", {
        batchMaxCount: 1,
    });
    const abi = [
        "function getAmountsOut(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)",
    ];

    const abiInterfaces = new ethers.Interface(abi);

    const route = [tokenA, tokenB];

    const routerContract = new ethers.Contract(routerEvmAddress, abiInterfaces.fragments, provider);
    const results = await routerContract.getAmountsOut(1 * 10 ** 8, route);
    const amounts = results;
    const finalInputAmount = amounts[1];
    return +finalInputAmount.toString();
}
async function priceUpdate() {
    const contractIdString = "0.0.4679277";
    const contractId: ContractId = ContractId.fromString(contractIdString);
    const client = Client.forTestnet();

    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    const pairTokens = [
        {
            tokenA: "0x0000000000000000000000000000000000474Df2", // collateralTokenInfo
            tokenB: "0x0000000000000000000000000000000000474df3", // loanTokenInfo
        },
    ];
    for (const pairToken of pairTokens) {
        const { tokenA, tokenB } = pairToken;
        const key = `${tokenA}_${tokenB}`;

        const rate = await rateA_B(tokenA, tokenB);
        console.log(`Fetch price ${tokenA}-${tokenB} : ${rate}`);

        if (rate !== lastRate[key]) {
            await schedulePriceUpdate(client, contractId, tokenA, tokenB, rate, operatorKey);
            lastRate[key] = rate;
        }
    }
}

export async function borrowerClaim(
    client: Client,
    contractId: ContractId,
    bondId: number,
    adminKey: PrivateKey,
): Promise<void> {
    const functionParams = new ContractFunctionParameters().addUint256(bondId);

    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("borrowerClaim", functionParams)
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);
    console.log(`borrowerClaim receipt: ${receipt}`);
}
export async function borrowerRefund(
    client: Client,
    contractId: ContractId,
    bondId: number,
    adminKey: PrivateKey,
): Promise<void> {
    const functionParams = new ContractFunctionParameters().addUint256(bondId);

    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("borrowerRefund", functionParams)
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);
    console.log(`borrowerRefund receipt: ${receipt}`);
}

export async function liquidateBond(
    client: Client,
    contractId: ContractId,
    bondId: number,
    adminKey: PrivateKey,
): Promise<void> {
    const functionParams = new ContractFunctionParameters().addUint256(bondId);

    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("liquidateBond", functionParams)
        .freezeWith(client);

    const signTx = await transaction.sign(adminKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);
    console.log(`liquidateBond receipt: ${receipt}`);
}

async function bondIssuance() {
    const bondIssuanceEvmAddress = "0x4b55ebbea60bcb79ad57272c5ec24878fdda11f6";
    const bondIssuanceContractIdString = "0.0.4684830";
    const bondIssuanceContractId: ContractId = ContractId.fromString(bondIssuanceContractIdString);
    const client = Client.forTestnet();

    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    const bondOffChains = await fetchBondOffChains();
    for (const bondOffChain of bondOffChains) {
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
            bond.totalLend === 0 &&
            !bond.isBorrowerClaimed
        ) {
            await borrowerRefund(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
        } else if (bond.isActive && timestampSecondNow > Number(bond.maturityDate) && !bond.readyToRepay) {
            await liquidateBond(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
        } else if (bond.isActive && timestampSecondNow < Number(bond.maturityDate) && !bond.readyToRepay) {
            const isBondLiquidatableInfo = await isBondLiquidatable(bondIssuanceEvmAddress, 13);
            if (isBondLiquidatableInfo.isBondLiquidatable) {
                await liquidateBond(client, bondIssuanceContractId, bondOffChain.bondId, operatorKey);
            }
        }
    }
}
let lastRate: Record<string, number> = {};

async function main() {
    do {
        try {
            await priceUpdate();
            await bondIssuance();
            await sleep(5 * 60 * 1000);
        } catch (error) {
            console.log(error);
        }
    } while (true);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
