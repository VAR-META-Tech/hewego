import {
    AccountAllowanceApproveTransaction,
    AccountBalanceQuery,
    AccountId,
    AccountInfoQuery,
    Client,
    ContractCreateTransaction,
    ContractFunctionParameters,
    FileAppendTransaction,
    FileCreateTransaction,
    Hbar,
    PrivateKey,
    TokenAssociateTransaction,
    TokenCreateTransaction,
    TokenId,
    TokenMintTransaction,
    TransactionReceipt,
    TransferTransaction,
} from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export async function createToken(
    client: Client,
    tokenName: string,
    tokenSymbol: string,
    treasuryAccountId: AccountId,
    adminKey: PrivateKey,
    supplyKey: PrivateKey,
    initialSupply: number,
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

export async function mintToken(client: Client, tokenId: TokenId, amount: any, supplyKey: PrivateKey): Promise<void> {
    const transaction = await new TokenMintTransaction().setTokenId(tokenId).setAmount(amount).freezeWith(client);

    const signTx = await transaction.sign(supplyKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);
    console.log(receipt);
    console.log(`Minted ${amount} tokens of ID: ${tokenId}`);
}

export async function checkBalance(client: Client, accountId: AccountId): Promise<void> {
    const balance = await new AccountBalanceQuery().setAccountId(accountId).execute(client);

    console.log(`Balance for account ${accountId}: ${balance.tokens}`);
}

export async function associateToken(
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
export async function deployContractWithAdminKey(
    client: Client,
    adminKey: PrivateKey,
    bytecode: Uint8Array,
    constructorParams: any[],
    maxRetries = 10,
    delay = 2000, // Initial delay in milliseconds
) {
    try {
        console.log("Uploading contract bytecode...");
        const fileCreateTx = await new FileCreateTransaction().setKeys([adminKey]).execute(client);
        const fileCreateRx = await fileCreateTx.getReceipt(client);
        const bytecodeFileId: any = fileCreateRx.fileId;
        console.log(`- The smart contract bytecode file ID is: ${bytecodeFileId}`);

        const fileAppendTx = await new FileAppendTransaction()
            .setFileId(bytecodeFileId)
            .setContents(bytecode)
            .setMaxTransactionFee(new Hbar(10))
            .execute(client);
        await fileAppendTx.getReceipt(client);
        console.log(`- Content added to file ID: ${bytecodeFileId}`);

        const constructorParamsEncoded = new ContractFunctionParameters();
        constructorParams.forEach((param: any) => {
            if (typeof param === "string") {
                constructorParamsEncoded.addAddress(param);
            } else if (typeof param === "number") {
                constructorParamsEncoded.addUint256(param);
            }
        });

        // Retry logic with exponential backoff
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const contractTransaction = await new ContractCreateTransaction()
                    .setBytecodeFileId(bytecodeFileId)
                    .setConstructorParameters(constructorParamsEncoded)
                    .setAdminKey(adminKey.publicKey)
                    .setGas(30000000)
                    .setMaxTransactionFee(new Hbar(10))
                    .setInitialBalance(new Hbar(1))
                    .freezeWith(client)
                    .sign(adminKey);

                const contractResponse = await contractTransaction.execute(client);
                const contractReceipt = await contractResponse.getReceipt(client);
                const contractId = contractReceipt.contractId;
                const contractAddress = contractId?.toSolidityAddress();

                console.log(`Contract deployed with ID: ${contractId}`);
                console.log(`Admin Key: ${adminKey.toString()}`);

                return { contractId, adminKey, contractAddress };
            } catch (error) {
                if (`${error}`.includes("BUSY")) {
                    console.log(`Attempt ${attempt} failed with BUSY status. Retrying in ${delay}ms...`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    throw error;
                }
            }
        }

        throw new Error(`Failed to deploy contract after ${maxRetries} attempts due to BUSY status.`);
    } catch (error) {
        console.error("Error during contract deployment:", error);
        throw error;
    }
}
export async function approveTokenAllowance(
    client: Client,
    tokenId: TokenId,
    ownerAccountId: AccountId,
    spenderAccountId: AccountId,
    amount: number,
    ownerKey: PrivateKey,
): Promise<void> {
    console.log("approveTokenAllowance: ", ownerAccountId.toString(), spenderAccountId.toString(), amount);
    const transaction = new AccountAllowanceApproveTransaction()
        .approveTokenAllowance(tokenId, ownerAccountId, spenderAccountId, amount)
        .freezeWith(client);

    const signTx = await transaction.sign(ownerKey);
    const txResponse = await signTx.execute(client);
    const receipt: TransactionReceipt = await txResponse.getReceipt(client);

    console.log(`Approved ${amount} tokens of ID: ${tokenId} for spender: ${spenderAccountId}`);
}
export async function transferTokens(
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

export async function addressToAccountId(client: Client, address: string): Promise<AccountId> {
    const accountInfo = await new AccountInfoQuery()
        .setAccountId(AccountId.fromEvmAddress(0, 0, address))
        .execute(client);

    const accountId = accountInfo.accountId;
    return accountId;
}

async function main() {
    // Hedera Client Setup
    const client = Client.forTestnet();
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
    client.setOperator(operatorId, operatorKey);

    // // Treasury account is the same as operator in this example
    // const treasuryAccountId = operatorId;
    // const adminKey = operatorKey;
    // const supplyKey = operatorKey; // Using the same key for simplicity; ideally, use a different key for supply management
    // const nonce = 2;
    // // Create Tokens on Hedera
    // const tokenId = await createToken(
    //     client,
    //     "Sample Token " + nonce,
    //     "STK " + nonce,
    //     treasuryAccountId,
    //     adminKey,
    //     supplyKey,
    //     0,
    // );

    // // Mint additional tokens
    // await mintToken(client, tokenId, +ethers.parseUnits("1", 16).toString(), supplyKey);

    // // Check balance
    // await checkBalance(client, operatorId);

    // // // Associate token with operator account
    // // await associateToken(client, tokenId, AccountId.fromString("0.0.4422837"), adminKey);

    // // Transfer tokens (assuming operator account is associated with the token)
    // await transferTokens(client, tokenId, operatorId, operatorId, 500, adminKey);

    // console.log(`Token created and additional tokens minted with ID: ${tokenId}`);

    // const accountId = await addressToAccountId(client, "0x2fd2a5ef3fe1fa5d2a158971a7e4579f303c05f1");
    // console.log(accountId);
}

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });
