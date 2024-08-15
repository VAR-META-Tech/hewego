import {
    AccountId,
    AccountUpdateTransaction,
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar,
    PrivateKey,
    TokenId,
} from "@hashgraph/sdk";
import { approveTokenAllowance } from "./token";

async function executeContract() {
    const collateralTokenInfo = {
        address: "0x0000000000000000000000000000000000474Df2",
        accountId: "0.0.4673010",
    };

    const loanTokenInfo = {
        address: "0x0000000000000000000000000000000000474df3",
        accountId: "0.0.4673011",
    };

    const evmAddressAdmin = "0x42c575262c603d341ef5b7112fc1eb78d909f622";
    const collateralAmount = 10 * 10 ** 8;
    const loanAmount = collateralAmount * 100; // Loan amount based on the 1:100 ratio

    const routerContractId = "0.0.19264";
    const poolCreationFeeHbar = 100;

    const client = Client.forTestnet();
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    await approveTokenAllowance(
        client,
        TokenId.fromString(loanTokenInfo.accountId),
        operatorId,
        AccountId.fromString(routerContractId),
        10 ** 20,
        operatorKey,
    );

    await approveTokenAllowance(
        client,
        TokenId.fromString(collateralTokenInfo.accountId),
        operatorId,
        AccountId.fromString(routerContractId),
        10 ** 20,
        operatorKey,
    );

    const accountUpdateTx = new AccountUpdateTransaction()
        .setAccountId(operatorId)
        .setKey(operatorKey)
        .setMaxAutomaticTokenAssociations(10);

    const updateTxId = await accountUpdateTx.execute(client);
    const updateReceipt = await updateTxId.getReceipt(client);
    console.log("Account update transaction status:", updateReceipt.status.toString());

    const params = new ContractFunctionParameters();
    params.addAddress(collateralTokenInfo.address);
    params.addAddress(loanTokenInfo.address);
    params.addUint256(collateralAmount);
    params.addUint256(loanAmount);
    params.addUint256(collateralAmount);
    params.addUint256(loanAmount);
    params.addAddress(evmAddressAdmin);
    params.addUint256(Date.now() + 60000);

    const transaction = new ContractExecuteTransaction()
        .setPayableAmount(poolCreationFeeHbar)
        .setContractId(routerContractId)
        .setFunction("addLiquidity", params)
        .setGas(5000000) // Gas limit
        .setMaxTransactionFee(new Hbar("20"))
        .freezeWith(client);
    const signedTransaction = await transaction.sign(operatorKey);

    const response = await signedTransaction.execute(client);

    const record = await response.getRecord(client);
    const result = record.contractFunctionResult!;
    const values = result.getResult(["uint", "uint", "uint"]);
    const amountCollateral = values[0]; // uint amountCollateral used
    const amountLoan = values[1]; // uint amountLoan minted
    const liquidity = values[2]; // uint liquidity received

    console.log("Amount of Collateral Used:", amountCollateral.toString());
    console.log("Amount of Loan Minted:", amountLoan.toString());
    console.log("Liquidity:", liquidity.toString());
}

//https://hashscan.io/testnet/transaction/1722305086.463668278
executeContract().catch(console.error);
