// Sources flattened with hardhat v2.22.7 https://hardhat.org

// SPDX-License-Identifier: Apache-2.0 AND MIT

pragma experimental ABIEncoderV2;

// File contracts/hedera/system/HederaResponseCodes.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;

library HederaResponseCodes {
    // response codes
    int32 internal constant OK = 0; // The transaction passed the precheck validations.
    int32 internal constant INVALID_TRANSACTION = 1; // For any error not handled by specific error codes listed below.
    int32 internal constant PAYER_ACCOUNT_NOT_FOUND = 2; //Payer account does not exist.
    int32 internal constant INVALID_NODE_ACCOUNT = 3; //Node Account provided does not match the node account of the node the transaction was submitted to.
    int32 internal constant TRANSACTION_EXPIRED = 4; // Pre-Check error when TransactionValidStart + transactionValidDuration is less than current consensus time.
    int32 internal constant INVALID_TRANSACTION_START = 5; // Transaction start time is greater than current consensus time
    int32 internal constant INVALID_TRANSACTION_DURATION = 6; //valid transaction duration is a positive non zero number that does not exceed 120 seconds
    int32 internal constant INVALID_SIGNATURE = 7; // The transaction signature is not valid
    int32 internal constant MEMO_TOO_LONG = 8; //Transaction memo size exceeded 100 bytes
    int32 internal constant INSUFFICIENT_TX_FEE = 9; // The fee provided in the transaction is insufficient for this type of transaction
    int32 internal constant INSUFFICIENT_PAYER_BALANCE = 10; // The payer account has insufficient cryptocurrency to pay the transaction fee
    int32 internal constant DUPLICATE_TRANSACTION = 11; // This transaction ID is a duplicate of one that was submitted to this node or reached consensus in the last 180 seconds (receipt period)
    int32 internal constant BUSY = 12; //If API is throttled out
    int32 internal constant NOT_SUPPORTED = 13; //The API is not currently supported

    int32 internal constant INVALID_FILE_ID = 14; //The file id is invalid or does not exist
    int32 internal constant INVALID_ACCOUNT_ID = 15; //The account id is invalid or does not exist
    int32 internal constant INVALID_CONTRACT_ID = 16; //The contract id is invalid or does not exist
    int32 internal constant INVALID_TRANSACTION_ID = 17; //Transaction id is not valid
    int32 internal constant RECEIPT_NOT_FOUND = 18; //Receipt for given transaction id does not exist
    int32 internal constant RECORD_NOT_FOUND = 19; //Record for given transaction id does not exist
    int32 internal constant INVALID_SOLIDITY_ID = 20; //The solidity id is invalid or entity with this solidity id does not exist

    int32 internal constant UNKNOWN = 21; // The responding node has submitted the transaction to the network. Its final status is still unknown.
    int32 internal constant SUCCESS = 22; // The transaction succeeded
    int32 internal constant FAIL_INVALID = 23; // There was a system error and the transaction failed because of invalid request parameters.
    int32 internal constant FAIL_FEE = 24; // There was a system error while performing fee calculation, reserved for future.
    int32 internal constant FAIL_BALANCE = 25; // There was a system error while performing balance checks, reserved for future.

    int32 internal constant KEY_REQUIRED = 26; //Key not provided in the transaction body
    int32 internal constant BAD_ENCODING = 27; //Unsupported algorithm/encoding used for keys in the transaction
    int32 internal constant INSUFFICIENT_ACCOUNT_BALANCE = 28; //When the account balance is not sufficient for the transfer
    int32 internal constant INVALID_SOLIDITY_ADDRESS = 29; //During an update transaction when the system is not able to find the Users Solidity address

    int32 internal constant INSUFFICIENT_GAS = 30; //Not enough gas was supplied to execute transaction
    int32 internal constant CONTRACT_SIZE_LIMIT_EXCEEDED = 31; //contract byte code size is over the limit
    int32 internal constant LOCAL_CALL_MODIFICATION_EXCEPTION = 32; //local execution (query) is requested for a function which changes state
    int32 internal constant CONTRACT_REVERT_EXECUTED = 33; //Contract REVERT OPCODE executed
    int32 internal constant CONTRACT_EXECUTION_EXCEPTION = 34; //For any contract execution related error not handled by specific error codes listed above.
    int32 internal constant INVALID_RECEIVING_NODE_ACCOUNT = 35; //In Query validation, account with +ve(amount) value should be Receiving node account, the receiver account should be only one account in the list
    int32 internal constant MISSING_QUERY_HEADER = 36; // Header is missing in Query request

    int32 internal constant ACCOUNT_UPDATE_FAILED = 37; // The update of the account failed
    int32 internal constant INVALID_KEY_ENCODING = 38; // Provided key encoding was not supported by the system
    int32 internal constant NULL_SOLIDITY_ADDRESS = 39; // null solidity address

    int32 internal constant CONTRACT_UPDATE_FAILED = 40; // update of the contract failed
    int32 internal constant INVALID_QUERY_HEADER = 41; // the query header is invalid

    int32 internal constant INVALID_FEE_SUBMITTED = 42; // Invalid fee submitted
    int32 internal constant INVALID_PAYER_SIGNATURE = 43; // Payer signature is invalid

    int32 internal constant KEY_NOT_PROVIDED = 44; // The keys were not provided in the request.
    int32 internal constant INVALID_EXPIRATION_TIME = 45; // Expiration time provided in the transaction was invalid.
    int32 internal constant NO_WACL_KEY = 46; //WriteAccess Control Keys are not provided for the file
    int32 internal constant FILE_CONTENT_EMPTY = 47; //The contents of file are provided as empty.
    int32 internal constant INVALID_ACCOUNT_AMOUNTS = 48; // The crypto transfer credit and debit do not sum equal to 0
    int32 internal constant EMPTY_TRANSACTION_BODY = 49; // Transaction body provided is empty
    int32 internal constant INVALID_TRANSACTION_BODY = 50; // Invalid transaction body provided

    int32 internal constant INVALID_SIGNATURE_TYPE_MISMATCHING_KEY = 51; // the type of key (base ed25519 key, KeyList, or ThresholdKey) does not match the type of signature (base ed25519 signature, SignatureList, or ThresholdKeySignature)
    int32 internal constant INVALID_SIGNATURE_COUNT_MISMATCHING_KEY = 52; // the number of key (KeyList, or ThresholdKey) does not match that of signature (SignatureList, or ThresholdKeySignature). e.g. if a keyList has 3 base keys, then the corresponding signatureList should also have 3 base signatures.

    int32 internal constant EMPTY_LIVE_HASH_BODY = 53; // the livehash body is empty
    int32 internal constant EMPTY_LIVE_HASH = 54; // the livehash data is missing
    int32 internal constant EMPTY_LIVE_HASH_KEYS = 55; // the keys for a livehash are missing
    int32 internal constant INVALID_LIVE_HASH_SIZE = 56; // the livehash data is not the output of a SHA-384 digest

    int32 internal constant EMPTY_QUERY_BODY = 57; // the query body is empty
    int32 internal constant EMPTY_LIVE_HASH_QUERY = 58; // the crypto livehash query is empty
    int32 internal constant LIVE_HASH_NOT_FOUND = 59; // the livehash is not present
    int32 internal constant ACCOUNT_ID_DOES_NOT_EXIST = 60; // the account id passed has not yet been created.
    int32 internal constant LIVE_HASH_ALREADY_EXISTS = 61; // the livehash already exists for a given account

    int32 internal constant INVALID_FILE_WACL = 62; // File WACL keys are invalid
    int32 internal constant SERIALIZATION_FAILED = 63; // Serialization failure
    int32 internal constant TRANSACTION_OVERSIZE = 64; // The size of the Transaction is greater than transactionMaxBytes
    int32 internal constant TRANSACTION_TOO_MANY_LAYERS = 65; // The Transaction has more than 50 levels
    int32 internal constant CONTRACT_DELETED = 66; //Contract is marked as deleted

    int32 internal constant PLATFORM_NOT_ACTIVE = 67; // the platform node is either disconnected or lagging behind.
    int32 internal constant KEY_PREFIX_MISMATCH = 68; // one internal key matches more than one prefixes on the signature map
    int32 internal constant PLATFORM_TRANSACTION_NOT_CREATED = 69; // transaction not created by platform due to large backlog
    int32 internal constant INVALID_RENEWAL_PERIOD = 70; // auto renewal period is not a positive number of seconds
    int32 internal constant INVALID_PAYER_ACCOUNT_ID = 71; // the response code when a smart contract id is passed for a crypto API request
    int32 internal constant ACCOUNT_DELETED = 72; // the account has been marked as deleted
    int32 internal constant FILE_DELETED = 73; // the file has been marked as deleted
    int32 internal constant ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS = 74; // same accounts repeated in the transfer account list
    int32 internal constant SETTING_NEGATIVE_ACCOUNT_BALANCE = 75; // attempting to set negative balance value for crypto account
    int32 internal constant OBTAINER_REQUIRED = 76; // when deleting smart contract that has crypto balance either transfer account or transfer smart contract is required
    int32 internal constant OBTAINER_SAME_CONTRACT_ID = 77; //when deleting smart contract that has crypto balance you can not use the same contract id as transferContractId as the one being deleted
    int32 internal constant OBTAINER_DOES_NOT_EXIST = 78; //transferAccountId or transferContractId specified for contract delete does not exist
    int32 internal constant MODIFYING_IMMUTABLE_CONTRACT = 79; //attempting to modify (update or delete a immutable smart contract, i.e. one created without a admin key)
    int32 internal constant FILE_SYSTEM_EXCEPTION = 80; //Unexpected exception thrown by file system functions
    int32 internal constant AUTORENEW_DURATION_NOT_IN_RANGE = 81; // the duration is not a subset of [MINIMUM_AUTORENEW_DURATION,MAXIMUM_AUTORENEW_DURATION]
    int32 internal constant ERROR_DECODING_BYTESTRING = 82; // Decoding the smart contract binary to a byte array failed. Check that the input is a valid hex string.
    int32 internal constant CONTRACT_FILE_EMPTY = 83; // File to create a smart contract was of length zero
    int32 internal constant CONTRACT_BYTECODE_EMPTY = 84; // Bytecode for smart contract is of length zero
    int32 internal constant INVALID_INITIAL_BALANCE = 85; // Attempt to set negative initial balance
    int32 internal constant INVALID_RECEIVE_RECORD_THRESHOLD = 86; // [Deprecated]. attempt to set negative receive record threshold
    int32 internal constant INVALID_SEND_RECORD_THRESHOLD = 87; // [Deprecated]. attempt to set negative send record threshold
    int32 internal constant ACCOUNT_IS_NOT_GENESIS_ACCOUNT = 88; // Special Account Operations should be performed by only Genesis account, return this code if it is not Genesis Account
    int32 internal constant PAYER_ACCOUNT_UNAUTHORIZED = 89; // The fee payer account doesn't have permission to submit such Transaction
    int32 internal constant INVALID_FREEZE_TRANSACTION_BODY = 90; // FreezeTransactionBody is invalid
    int32 internal constant FREEZE_TRANSACTION_BODY_NOT_FOUND = 91; // FreezeTransactionBody does not exist
    int32 internal constant TRANSFER_LIST_SIZE_LIMIT_EXCEEDED = 92; //Exceeded the number of accounts (both from and to) allowed for crypto transfer list
    int32 internal constant RESULT_SIZE_LIMIT_EXCEEDED = 93; // Smart contract result size greater than specified maxResultSize
    int32 internal constant NOT_SPECIAL_ACCOUNT = 94; //The payer account is not a special account(account 0.0.55)
    int32 internal constant CONTRACT_NEGATIVE_GAS = 95; // Negative gas was offered in smart contract call
    int32 internal constant CONTRACT_NEGATIVE_VALUE = 96; // Negative value / initial balance was specified in a smart contract call / create
    int32 internal constant INVALID_FEE_FILE = 97; // Failed to update fee file
    int32 internal constant INVALID_EXCHANGE_RATE_FILE = 98; // Failed to update exchange rate file
    int32 internal constant INSUFFICIENT_LOCAL_CALL_GAS = 99; // Payment tendered for contract local call cannot cover both the fee and the gas
    int32 internal constant ENTITY_NOT_ALLOWED_TO_DELETE = 100; // Entities with Entity ID below 1000 are not allowed to be deleted
    int32 internal constant AUTHORIZATION_FAILED = 101; // Violating one of these rules: 1) treasury account can update all entities below 0.0.1000, 2) account 0.0.50 can update all entities from 0.0.51 - 0.0.80, 3) Network Function Master Account A/c 0.0.50 - Update all Network Function accounts & perform all the Network Functions listed below, 4) Network Function Accounts: i) A/c 0.0.55 - Update Address Book files (0.0.101/102), ii) A/c 0.0.56 - Update Fee schedule (0.0.111), iii) A/c 0.0.57 - Update Exchange Rate (0.0.112).
    int32 internal constant FILE_UPLOADED_PROTO_INVALID = 102; // Fee Schedule Proto uploaded but not valid (append or update is required)
    int32 internal constant FILE_UPLOADED_PROTO_NOT_SAVED_TO_DISK = 103; // Fee Schedule Proto uploaded but not valid (append or update is required)
    int32 internal constant FEE_SCHEDULE_FILE_PART_UPLOADED = 104; // Fee Schedule Proto File Part uploaded
    int32 internal constant EXCHANGE_RATE_CHANGE_LIMIT_EXCEEDED = 105; // The change on Exchange Rate exceeds Exchange_Rate_Allowed_Percentage
    int32 internal constant MAX_CONTRACT_STORAGE_EXCEEDED = 106; // Contract permanent storage exceeded the currently allowable limit
    int32 internal constant TRANSFER_ACCOUNT_SAME_AS_DELETE_ACCOUNT = 107; // Transfer Account should not be same as Account to be deleted
    int32 internal constant TOTAL_LEDGER_BALANCE_INVALID = 108;
    int32 internal constant EXPIRATION_REDUCTION_NOT_ALLOWED = 110; // The expiration date/time on a smart contract may not be reduced
    int32 internal constant MAX_GAS_LIMIT_EXCEEDED = 111; //Gas exceeded currently allowable gas limit per transaction
    int32 internal constant MAX_FILE_SIZE_EXCEEDED = 112; // File size exceeded the currently allowable limit

    int32 internal constant INVALID_TOPIC_ID = 150; // The Topic ID specified is not in the system.
    int32 internal constant INVALID_ADMIN_KEY = 155; // A provided admin key was invalid.
    int32 internal constant INVALID_SUBMIT_KEY = 156; // A provided submit key was invalid.
    int32 internal constant UNAUTHORIZED = 157; // An attempted operation was not authorized (ie - a deleteTopic for a topic with no adminKey).
    int32 internal constant INVALID_TOPIC_MESSAGE = 158; // A ConsensusService message is empty.
    int32 internal constant INVALID_AUTORENEW_ACCOUNT = 159; // The autoRenewAccount specified is not a valid, active account.
    int32 internal constant AUTORENEW_ACCOUNT_NOT_ALLOWED = 160; // An adminKey was not specified on the topic, so there must not be an autoRenewAccount.
    // The topic has expired, was not automatically renewed, and is in a 7 day grace period before the topic will be
    // deleted unrecoverably. This error response code will not be returned until autoRenew functionality is supported
    // by HAPI.
    int32 internal constant TOPIC_EXPIRED = 162;
    int32 internal constant INVALID_CHUNK_NUMBER = 163; // chunk number must be from 1 to total (chunks) inclusive.
    int32 internal constant INVALID_CHUNK_TRANSACTION_ID = 164; // For every chunk, the payer account that is part of initialTransactionID must match the Payer Account of this transaction. The entire initialTransactionID should match the transactionID of the first chunk, but this is not checked or enforced by Hedera except when the chunk number is 1.
    int32 internal constant ACCOUNT_FROZEN_FOR_TOKEN = 165; // Account is frozen and cannot transact with the token
    int32 internal constant TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED = 166; // An involved account already has more than <tt>tokens.maxPerAccount</tt> associations with non-deleted tokens.
    int32 internal constant INVALID_TOKEN_ID = 167; // The token is invalid or does not exist
    int32 internal constant INVALID_TOKEN_DECIMALS = 168; // Invalid token decimals
    int32 internal constant INVALID_TOKEN_INITIAL_SUPPLY = 169; // Invalid token initial supply
    int32 internal constant INVALID_TREASURY_ACCOUNT_FOR_TOKEN = 170; // Treasury Account does not exist or is deleted
    int32 internal constant INVALID_TOKEN_SYMBOL = 171; // Token Symbol is not UTF-8 capitalized alphabetical string
    int32 internal constant TOKEN_HAS_NO_FREEZE_KEY = 172; // Freeze key is not set on token
    int32 internal constant TRANSFERS_NOT_ZERO_SUM_FOR_TOKEN = 173; // Amounts in transfer list are not net zero
    int32 internal constant MISSING_TOKEN_SYMBOL = 174; // A token symbol was not provided
    int32 internal constant TOKEN_SYMBOL_TOO_LONG = 175; // The provided token symbol was too long
    int32 internal constant ACCOUNT_KYC_NOT_GRANTED_FOR_TOKEN = 176; // KYC must be granted and account does not have KYC granted
    int32 internal constant TOKEN_HAS_NO_KYC_KEY = 177; // KYC key is not set on token
    int32 internal constant INSUFFICIENT_TOKEN_BALANCE = 178; // Token balance is not sufficient for the transaction
    int32 internal constant TOKEN_WAS_DELETED = 179; // Token transactions cannot be executed on deleted token
    int32 internal constant TOKEN_HAS_NO_SUPPLY_KEY = 180; // Supply key is not set on token
    int32 internal constant TOKEN_HAS_NO_WIPE_KEY = 181; // Wipe key is not set on token
    int32 internal constant INVALID_TOKEN_MINT_AMOUNT = 182; // The requested token mint amount would cause an invalid total supply
    int32 internal constant INVALID_TOKEN_BURN_AMOUNT = 183; // The requested token burn amount would cause an invalid total supply
    int32 internal constant TOKEN_NOT_ASSOCIATED_TO_ACCOUNT = 184; // A required token-account relationship is missing
    int32 internal constant CANNOT_WIPE_TOKEN_TREASURY_ACCOUNT = 185; // The target of a wipe operation was the token treasury account
    int32 internal constant INVALID_KYC_KEY = 186; // The provided KYC key was invalid.
    int32 internal constant INVALID_WIPE_KEY = 187; // The provided wipe key was invalid.
    int32 internal constant INVALID_FREEZE_KEY = 188; // The provided freeze key was invalid.
    int32 internal constant INVALID_SUPPLY_KEY = 189; // The provided supply key was invalid.
    int32 internal constant MISSING_TOKEN_NAME = 190; // Token Name is not provided
    int32 internal constant TOKEN_NAME_TOO_LONG = 191; // Token Name is too long
    int32 internal constant INVALID_WIPING_AMOUNT = 192; // The provided wipe amount must not be negative, zero or bigger than the token holder balance
    int32 internal constant TOKEN_IS_IMMUTABLE = 193; // Token does not have Admin key set, thus update/delete transactions cannot be performed
    int32 internal constant TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT = 194; // An <tt>associateToken</tt> operation specified a token already associated to the account
    int32 internal constant TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES = 195; // An attempted operation is invalid until all token balances for the target account are zero
    int32 internal constant ACCOUNT_IS_TREASURY = 196; // An attempted operation is invalid because the account is a treasury
    int32 internal constant TOKEN_ID_REPEATED_IN_TOKEN_LIST = 197; // Same TokenIDs present in the token list
    int32 internal constant TOKEN_TRANSFER_LIST_SIZE_LIMIT_EXCEEDED = 198; // Exceeded the number of token transfers (both from and to) allowed for token transfer list
    int32 internal constant EMPTY_TOKEN_TRANSFER_BODY = 199; // TokenTransfersTransactionBody has no TokenTransferList
    int32 internal constant EMPTY_TOKEN_TRANSFER_ACCOUNT_AMOUNTS = 200; // TokenTransfersTransactionBody has a TokenTransferList with no AccountAmounts
    int32 internal constant INVALID_SCHEDULE_ID = 201; // The Scheduled entity does not exist; or has now expired, been deleted, or been executed
    int32 internal constant SCHEDULE_IS_IMMUTABLE = 202; // The Scheduled entity cannot be modified. Admin key not set
    int32 internal constant INVALID_SCHEDULE_PAYER_ID = 203; // The provided Scheduled Payer does not exist
    int32 internal constant INVALID_SCHEDULE_ACCOUNT_ID = 204; // The Schedule Create Transaction TransactionID account does not exist
    int32 internal constant NO_NEW_VALID_SIGNATURES = 205; // The provided sig map did not contain any new valid signatures from required signers of the scheduled transaction
    int32 internal constant UNRESOLVABLE_REQUIRED_SIGNERS = 206; // The required signers for a scheduled transaction cannot be resolved, for example because they do not exist or have been deleted
    int32 internal constant SCHEDULED_TRANSACTION_NOT_IN_WHITELIST = 207; // Only whitelisted transaction types may be scheduled
    int32 internal constant SOME_SIGNATURES_WERE_INVALID = 208; // At least one of the signatures in the provided sig map did not represent a valid signature for any required signer
    int32 internal constant TRANSACTION_ID_FIELD_NOT_ALLOWED = 209; // The scheduled field in the TransactionID may not be set to true
    int32 internal constant IDENTICAL_SCHEDULE_ALREADY_CREATED = 210; // A schedule already exists with the same identifying fields of an attempted ScheduleCreate (that is, all fields other than scheduledPayerAccountID)
    int32 internal constant INVALID_ZERO_BYTE_IN_STRING = 211; // A string field in the transaction has a UTF-8 encoding with the prohibited zero byte
    int32 internal constant SCHEDULE_ALREADY_DELETED = 212; // A schedule being signed or deleted has already been deleted
    int32 internal constant SCHEDULE_ALREADY_EXECUTED = 213; // A schedule being signed or deleted has already been executed
    int32 internal constant MESSAGE_SIZE_TOO_LARGE = 214; // ConsensusSubmitMessage request's message size is larger than allowed.
    int32 internal constant OPERATION_REPEATED_IN_BUCKET_GROUPS = 215; // An operation was assigned to more than one throttle group in a given bucket
    int32 internal constant BUCKET_CAPACITY_OVERFLOW = 216; // The capacity needed to satisfy all opsPerSec groups in a bucket overflowed a signed 8-byte integral type
    int32 internal constant NODE_CAPACITY_NOT_SUFFICIENT_FOR_OPERATION = 217; // Given the network size in the address book, the node-level capacity for an operation would never be enough to accept a single request; usually means a bucket burstPeriod should be increased
    int32 internal constant BUCKET_HAS_NO_THROTTLE_GROUPS = 218; // A bucket was defined without any throttle groups
    int32 internal constant THROTTLE_GROUP_HAS_ZERO_OPS_PER_SEC = 219; // A throttle group was granted zero opsPerSec
    int32 internal constant SUCCESS_BUT_MISSING_EXPECTED_OPERATION = 220; // The throttle definitions file was updated, but some supported operations were not assigned a bucket
    int32 internal constant UNPARSEABLE_THROTTLE_DEFINITIONS = 221; // The new contents for the throttle definitions system file were not valid protobuf
    int32 internal constant INVALID_THROTTLE_DEFINITIONS = 222; // The new throttle definitions system file were invalid, and no more specific error could be divined
    int32 internal constant ACCOUNT_EXPIRED_AND_PENDING_REMOVAL = 223; // The transaction references an account which has passed its expiration without renewal funds available, and currently remains in the ledger only because of the grace period given to expired entities
    int32 internal constant INVALID_TOKEN_MAX_SUPPLY = 224; // Invalid token max supply
    int32 internal constant INVALID_TOKEN_NFT_SERIAL_NUMBER = 225; // Invalid token nft serial number
    int32 internal constant INVALID_NFT_ID = 226; // Invalid nft id
    int32 internal constant METADATA_TOO_LONG = 227; // Nft metadata is too long
    int32 internal constant BATCH_SIZE_LIMIT_EXCEEDED = 228; // Repeated operations count exceeds the limit
    int32 internal constant INVALID_QUERY_RANGE = 229; // The range of data to be gathered is out of the set boundaries
    int32 internal constant FRACTION_DIVIDES_BY_ZERO = 230; // A custom fractional fee set a denominator of zero
    int32 internal constant INSUFFICIENT_PAYER_BALANCE_FOR_CUSTOM_FEE = 231; // The transaction payer could not afford a custom fee
    int32 internal constant CUSTOM_FEES_LIST_TOO_LONG = 232; // More than 10 custom fees were specified
    int32 internal constant INVALID_CUSTOM_FEE_COLLECTOR = 233; // Any of the feeCollector accounts for customFees is invalid
    int32 internal constant INVALID_TOKEN_ID_IN_CUSTOM_FEES = 234; // Any of the token Ids in customFees is invalid
    int32 internal constant TOKEN_NOT_ASSOCIATED_TO_FEE_COLLECTOR = 235; // Any of the token Ids in customFees are not associated to feeCollector
    int32 internal constant TOKEN_MAX_SUPPLY_REACHED = 236; // A token cannot have more units minted due to its configured supply ceiling
    int32 internal constant SENDER_DOES_NOT_OWN_NFT_SERIAL_NO = 237; // The transaction attempted to move an NFT serial number from an account other than its owner
    int32 internal constant CUSTOM_FEE_NOT_FULLY_SPECIFIED = 238; // A custom fee schedule entry did not specify either a fixed or fractional fee
    int32 internal constant CUSTOM_FEE_MUST_BE_POSITIVE = 239; // Only positive fees may be assessed at this time
    int32 internal constant TOKEN_HAS_NO_FEE_SCHEDULE_KEY = 240; // Fee schedule key is not set on token
    int32 internal constant CUSTOM_FEE_OUTSIDE_NUMERIC_RANGE = 241; // A fractional custom fee exceeded the range of a 64-bit signed integer
    int32 internal constant ROYALTY_FRACTION_CANNOT_EXCEED_ONE = 242; // A royalty cannot exceed the total fungible value exchanged for an NFT
    int32 internal constant FRACTIONAL_FEE_MAX_AMOUNT_LESS_THAN_MIN_AMOUNT = 243; // Each fractional custom fee must have its maximum_amount, if specified, at least its minimum_amount
    int32 internal constant CUSTOM_SCHEDULE_ALREADY_HAS_NO_FEES = 244; // A fee schedule update tried to clear the custom fees from a token whose fee schedule was already empty
    int32 internal constant CUSTOM_FEE_DENOMINATION_MUST_BE_FUNGIBLE_COMMON = 245; // Only tokens of type FUNGIBLE_COMMON can be used to as fee schedule denominations
    int32 internal constant CUSTOM_FRACTIONAL_FEE_ONLY_ALLOWED_FOR_FUNGIBLE_COMMON = 246; // Only tokens of type FUNGIBLE_COMMON can have fractional fees
    int32 internal constant INVALID_CUSTOM_FEE_SCHEDULE_KEY = 247; // The provided custom fee schedule key was invalid
    int32 internal constant INVALID_TOKEN_MINT_METADATA = 248; // The requested token mint metadata was invalid
    int32 internal constant INVALID_TOKEN_BURN_METADATA = 249; // The requested token burn metadata was invalid
    int32 internal constant CURRENT_TREASURY_STILL_OWNS_NFTS = 250; // The treasury for a unique token cannot be changed until it owns no NFTs
    int32 internal constant ACCOUNT_STILL_OWNS_NFTS = 251; // An account cannot be dissociated from a unique token if it owns NFTs for the token
    int32 internal constant TREASURY_MUST_OWN_BURNED_NFT = 252; // A NFT can only be burned when owned by the unique token's treasury
    int32 internal constant ACCOUNT_DOES_NOT_OWN_WIPED_NFT = 253; // An account did not own the NFT to be wiped
    int32 internal constant ACCOUNT_AMOUNT_TRANSFERS_ONLY_ALLOWED_FOR_FUNGIBLE_COMMON = 254; // An AccountAmount token transfers list referenced a token type other than FUNGIBLE_COMMON
    int32 internal constant MAX_NFTS_IN_PRICE_REGIME_HAVE_BEEN_MINTED = 255; // All the NFTs allowed in the current price regime have already been minted
    int32 internal constant PAYER_ACCOUNT_DELETED = 256; // The payer account has been marked as deleted
    int32 internal constant CUSTOM_FEE_CHARGING_EXCEEDED_MAX_RECURSION_DEPTH = 257; // The reference chain of custom fees for a transferred token exceeded the maximum length of 2
    int32 internal constant CUSTOM_FEE_CHARGING_EXCEEDED_MAX_ACCOUNT_AMOUNTS = 258; // More than 20 balance adjustments were to satisfy a CryptoTransfer and its implied custom fee payments
    int32 internal constant INSUFFICIENT_SENDER_ACCOUNT_BALANCE_FOR_CUSTOM_FEE = 259; // The sender account in the token transfer transaction could not afford a custom fee
    int32 internal constant SERIAL_NUMBER_LIMIT_REACHED = 260; // Currently no more than 4,294,967,295 NFTs may be minted for a given unique token type
    int32 internal constant CUSTOM_ROYALTY_FEE_ONLY_ALLOWED_FOR_NON_FUNGIBLE_UNIQUE = 261; // Only tokens of type NON_FUNGIBLE_UNIQUE can have royalty fees
    int32 internal constant NO_REMAINING_AUTOMATIC_ASSOCIATIONS = 262; // The account has reached the limit on the automatic associations count.
    int32 internal constant EXISTING_AUTOMATIC_ASSOCIATIONS_EXCEED_GIVEN_LIMIT = 263; // Already existing automatic associations are more than the new maximum automatic associations.
    int32 internal constant REQUESTED_NUM_AUTOMATIC_ASSOCIATIONS_EXCEEDS_ASSOCIATION_LIMIT = 264; // Cannot set the number of automatic associations for an account more than the maximum allowed tokens.maxPerAccount.
    int32 internal constant TOKEN_IS_PAUSED = 265; // Token is paused. This Token cannot be a part of any kind of Transaction until unpaused.
    int32 internal constant TOKEN_HAS_NO_PAUSE_KEY = 266; // Pause key is not set on token
    int32 internal constant INVALID_PAUSE_KEY = 267; // The provided pause key was invalid
    int32 internal constant FREEZE_UPDATE_FILE_DOES_NOT_EXIST = 268; // The update file in a freeze transaction body must exist.
    int32 internal constant FREEZE_UPDATE_FILE_HASH_DOES_NOT_MATCH = 269; // The hash of the update file in a freeze transaction body must match the in-memory hash.
    int32 internal constant NO_UPGRADE_HAS_BEEN_PREPARED = 270; // A FREEZE_UPGRADE transaction was handled with no previous update prepared.
    int32 internal constant NO_FREEZE_IS_SCHEDULED = 271; // A FREEZE_ABORT transaction was handled with no scheduled freeze.
    int32 internal constant UPDATE_FILE_HASH_CHANGED_SINCE_PREPARE_UPGRADE = 272; // The update file hash when handling a FREEZE_UPGRADE transaction differs from the file hash at the time of handling the PREPARE_UPGRADE transaction.
    int32 internal constant FREEZE_START_TIME_MUST_BE_FUTURE = 273; // The given freeze start time was in the (consensus) past.
    int32 internal constant PREPARED_UPDATE_FILE_IS_IMMUTABLE = 274; // The prepared update file cannot be updated or appended until either the upgrade has been completed, or a FREEZE_ABORT has been handled.
    int32 internal constant FREEZE_ALREADY_SCHEDULED = 275; // Once a freeze is scheduled, it must be aborted before any other type of freeze can be performed.
    int32 internal constant FREEZE_UPGRADE_IN_PROGRESS = 276; // If an NMT upgrade has been prepared, the following operation must be a FREEZE_UPGRADE (To issue a FREEZE_ONLY, submit a FREEZE_ABORT first.)
    int32 internal constant UPDATE_FILE_ID_DOES_NOT_MATCH_PREPARED = 277; // If an NMT upgrade has been prepared, the subsequent FREEZE_UPGRADE transaction must confirm the id of the file to be used in the upgrade.
    int32 internal constant UPDATE_FILE_HASH_DOES_NOT_MATCH_PREPARED = 278; // If an NMT upgrade has been prepared, the subsequent FREEZE_UPGRADE transaction must confirm the hash of the file to be used in the upgrade.
    int32 internal constant CONSENSUS_GAS_EXHAUSTED = 279; // Consensus throttle did not allow execution of this transaction. System is throttled at consensus level.
    int32 internal constant REVERTED_SUCCESS = 280; // A precompiled contract succeeded, but was later reverted.
    int32 internal constant MAX_STORAGE_IN_PRICE_REGIME_HAS_BEEN_USED = 281; // All contract storage allocated to the current price regime has been consumed.
    int32 internal constant INVALID_ALIAS_KEY = 282; // An alias used in a CryptoTransfer transaction is not the serialization of a primitive Key message -- that is, a Key with a single Ed25519 or ECDSA(secp256k1) public key and no unknown protobuf fields.
    int32 internal constant UNEXPECTED_TOKEN_DECIMALS = 283; // A fungible token transfer expected a different number of decimals than the involved type actually has.
    int32 internal constant INVALID_PROXY_ACCOUNT_ID = 284; // [Deprecated] The proxy account id is invalid or does not exist.
    int32 internal constant INVALID_TRANSFER_ACCOUNT_ID = 285; // The transfer account id in CryptoDelete transaction is invalid or does not exist.
    int32 internal constant INVALID_FEE_COLLECTOR_ACCOUNT_ID = 286; // The fee collector account id in TokenFeeScheduleUpdate is invalid or does not exist.
    int32 internal constant ALIAS_IS_IMMUTABLE = 287; // The alias already set on an account cannot be updated using CryptoUpdate transaction.
    int32 internal constant SPENDER_ACCOUNT_SAME_AS_OWNER = 288; // An approved allowance specifies a spender account that is the same as the hbar/token owner account.
    int32 internal constant AMOUNT_EXCEEDS_TOKEN_MAX_SUPPLY = 289; // The establishment or adjustment of an approved allowance cause the token allowance to exceed the token maximum supply.
    int32 internal constant NEGATIVE_ALLOWANCE_AMOUNT = 290; // The specified amount for an approved allowance cannot be negative.
    int32 internal constant CANNOT_APPROVE_FOR_ALL_FUNGIBLE_COMMON = 291; // [Deprecated] The approveForAll flag cannot be set for a fungible token.
    int32 internal constant SPENDER_DOES_NOT_HAVE_ALLOWANCE = 292; // The spender does not have an existing approved allowance with the hbar/token owner.
    int32 internal constant AMOUNT_EXCEEDS_ALLOWANCE = 293; // The transfer amount exceeds the current approved allowance for the spender account.
    int32 internal constant MAX_ALLOWANCES_EXCEEDED = 294; // The payer account of an approveAllowances or adjustAllowance transaction is attempting to go beyond the maximum allowed number of allowances.
    int32 internal constant EMPTY_ALLOWANCES = 295; // No allowances have been specified in the approval transaction.
    int32 internal constant SPENDER_ACCOUNT_REPEATED_IN_ALLOWANCES = 296; // [Deprecated] Spender is repeated more than once in Crypto or Token or NFT allowance lists in a single CryptoApproveAllowance transaction.
    int32 internal constant REPEATED_SERIAL_NUMS_IN_NFT_ALLOWANCES = 297; // [Deprecated] Serial numbers are repeated in nft allowance for a single spender account
    int32 internal constant FUNGIBLE_TOKEN_IN_NFT_ALLOWANCES = 298; // Fungible common token used in NFT allowances
    int32 internal constant NFT_IN_FUNGIBLE_TOKEN_ALLOWANCES = 299; // Non fungible token used in fungible token allowances
    int32 internal constant INVALID_ALLOWANCE_OWNER_ID = 300; // The account id specified as the owner is invalid or does not exist.
    int32 internal constant INVALID_ALLOWANCE_SPENDER_ID = 301; // The account id specified as the spender is invalid or does not exist.
    int32 internal constant REPEATED_ALLOWANCES_TO_DELETE = 302; // [Deprecated] If the CryptoDeleteAllowance transaction has repeated crypto or token or Nft allowances to delete.
    int32 internal constant INVALID_DELEGATING_SPENDER = 303; // If the account Id specified as the delegating spender is invalid or does not exist.
    int32 internal constant DELEGATING_SPENDER_CANNOT_GRANT_APPROVE_FOR_ALL = 304; // The delegating Spender cannot grant approveForAll allowance on a NFT token type for another spender.
    int32 internal constant DELEGATING_SPENDER_DOES_NOT_HAVE_APPROVE_FOR_ALL = 305; // The delegating Spender cannot grant allowance on a NFT serial for another spender as it doesnt not have approveForAll granted on token-owner.
    int32 internal constant SCHEDULE_EXPIRATION_TIME_TOO_FAR_IN_FUTURE = 306; // The scheduled transaction could not be created because it's expiration_time was too far in the future.
    int32 internal constant SCHEDULE_EXPIRATION_TIME_MUST_BE_HIGHER_THAN_CONSENSUS_TIME = 307; // The scheduled transaction could not be created because it's expiration_time was less than or equal to the consensus time.
    int32 internal constant SCHEDULE_FUTURE_THROTTLE_EXCEEDED = 308; // The scheduled transaction could not be created because it would cause throttles to be violated on the specified expiration_time.
    int32 internal constant SCHEDULE_FUTURE_GAS_LIMIT_EXCEEDED = 309; // The scheduled transaction could not be created because it would cause the gas limit to be violated on the specified expiration_time.
    int32 internal constant INVALID_ETHEREUM_TRANSACTION = 310; // The ethereum transaction either failed parsing or failed signature validation, or some other EthereumTransaction error not covered by another response code.
    int32 internal constant WRONG_CHAIN_ID = 311; // EthereumTransaction was signed against a chainId that this network does not support.
    int32 internal constant WRONG_NONCE = 312; // This transaction specified an ethereumNonce that is not the current ethereumNonce of the account.
    int32 internal constant ACCESS_LIST_UNSUPPORTED = 313; // The ethereum transaction specified an access list, which the network does not support.
    int32 internal constant SCHEDULE_PENDING_EXPIRATION = 314; // A schedule being signed or deleted has passed it's expiration date and is pending execution if needed and then expiration.
    int32 internal constant CONTRACT_IS_TOKEN_TREASURY = 315; // A selfdestruct or ContractDelete targeted a contract that is a token treasury.
    int32 internal constant CONTRACT_HAS_NON_ZERO_TOKEN_BALANCES = 316; // A selfdestruct or ContractDelete targeted a contract with non-zero token balances.
    int32 internal constant CONTRACT_EXPIRED_AND_PENDING_REMOVAL = 317; // A contract referenced by a transaction is "detached"; that is, expired and lacking any hbar funds for auto-renewal payment---but still within its post-expiry grace period.
    int32 internal constant CONTRACT_HAS_NO_AUTO_RENEW_ACCOUNT = 318; // A ContractUpdate requested removal of a contract's auto-renew account, but that contract has no auto-renew account.
    int32 internal constant PERMANENT_REMOVAL_REQUIRES_SYSTEM_INITIATION = 319; // A delete transaction submitted via HAPI set permanent_removal=true
    int32 internal constant PROXY_ACCOUNT_ID_FIELD_IS_DEPRECATED = 320; // A CryptoCreate or ContractCreate used the deprecated proxyAccountID field.
    int32 internal constant SELF_STAKING_IS_NOT_ALLOWED = 321; // An account set the staked_account_id to itself in CryptoUpdate or ContractUpdate transactions.
    int32 internal constant INVALID_STAKING_ID = 322; // The staking account id or staking node id given is invalid or does not exist.
    int32 internal constant STAKING_NOT_ENABLED = 323; // Native staking, while implemented, has not yet enabled by the council.
    int32 internal constant INVALID_PRNG_RANGE = 324; // The range provided in UtilPrng transaction is negative.
    int32 internal constant MAX_ENTITIES_IN_PRICE_REGIME_HAVE_BEEN_CREATED = 325; // The maximum number of entities allowed in the current price regime have been created.
    int32 internal constant INVALID_FULL_PREFIX_SIGNATURE_FOR_PRECOMPILE = 326; // The full prefix signature for precompile is not valid
    int32 internal constant INSUFFICIENT_BALANCES_FOR_STORAGE_RENT = 327; // The combined balances of a contract and its auto-renew account (if any) did not cover the rent charged for net new storage used in a transaction.
    int32 internal constant MAX_CHILD_RECORDS_EXCEEDED = 328; // A contract transaction tried to use more than the allowed number of child records, via either system contract records or internal contract creations.
    int32 internal constant INSUFFICIENT_BALANCES_FOR_RENEWAL_FEES = 329; // The combined balances of a contract and its auto-renew account (if any) or balance of an account did not cover the auto-renewal fees in a transaction.
}


// File contracts/hedera/system/IHederaTokenService.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2

interface IHederaTokenService {
    /// Transfers cryptocurrency among two or more accounts by making the desired adjustments to their
    /// balances. Each transfer list can specify up to 10 adjustments. Each negative amount is withdrawn
    /// from the corresponding account (a sender), and each positive one is added to the corresponding
    /// account (a receiver). The amounts list must sum to zero. Each amount is a number of tinybars
    /// (there are 100,000,000 tinybars in one hbar).  If any sender account fails to have sufficient
    /// hbars, then the entire transaction fails, and none of those transfers occur, though the
    /// transaction fee is still charged. This transaction must be signed by the keys for all the sending
    /// accounts, and for any receiving accounts that have receiverSigRequired == true. The signatures
    /// are in the same order as the accounts, skipping those accounts that don't need a signature.
    /// @custom:version 0.3.0 previous version did not include isApproval
    struct AccountAmount {
        // The Account ID, as a solidity address, that sends/receives cryptocurrency or tokens
        address accountID;
        // The amount of  the lowest denomination of the given token that
        // the account sends(negative) or receives(positive)
        int64 amount;
        // If true then the transfer is expected to be an approved allowance and the
        // accountID is expected to be the owner. The default is false (omitted).
        bool isApproval;
    }

    /// A sender account, a receiver account, and the serial number of an NFT of a Token with
    /// NON_FUNGIBLE_UNIQUE type. When minting NFTs the sender will be the default AccountID instance
    /// (0.0.0 aka 0x0) and when burning NFTs, the receiver will be the default AccountID instance.
    /// @custom:version 0.3.0 previous version did not include isApproval
    struct NftTransfer {
        // The solidity address of the sender
        address senderAccountID;
        // The solidity address of the receiver
        address receiverAccountID;
        // The serial number of the NFT
        int64 serialNumber;
        // If true then the transfer is expected to be an approved allowance and the
        // accountID is expected to be the owner. The default is false (omitted).
        bool isApproval;
    }

    struct TokenTransferList {
        // The ID of the token as a solidity address
        address token;
        // Applicable to tokens of type FUNGIBLE_COMMON. Multiple list of AccountAmounts, each of which
        // has an account and amount.
        AccountAmount[] transfers;
        // Applicable to tokens of type NON_FUNGIBLE_UNIQUE. Multiple list of NftTransfers, each of
        // which has a sender and receiver account, including the serial number of the NFT
        NftTransfer[] nftTransfers;
    }

    struct TransferList {
        // Multiple list of AccountAmounts, each of which has an account and amount.
        // Used to transfer hbars between the accounts in the list.
        AccountAmount[] transfers;
    }

    /// Expiry properties of a Hedera token - second, autoRenewAccount, autoRenewPeriod
    struct Expiry {
        // The epoch second at which the token should expire; if an auto-renew account and period are
        // specified, this is coerced to the current epoch second plus the autoRenewPeriod
        int64 second;
        // ID of an account which will be automatically charged to renew the token's expiration, at
        // autoRenewPeriod interval, expressed as a solidity address
        address autoRenewAccount;
        // The interval at which the auto-renew account will be charged to extend the token's expiry
        int64 autoRenewPeriod;
    }

    /// A Key can be a public key from either the Ed25519 or ECDSA(secp256k1) signature schemes, where
    /// in the ECDSA(secp256k1) case we require the 33-byte compressed form of the public key. We call
    /// these public keys <b>primitive keys</b>.
    /// A Key can also be the ID of a smart contract instance, which is then authorized to perform any
    /// precompiled contract action that requires this key to sign.
    /// Note that when a Key is a smart contract ID, it <i>doesn't</i> mean the contract with that ID
    /// will actually create a cryptographic signature. It only means that when the contract calls a
    /// precompiled contract, the resulting "child transaction" will be authorized to perform any action
    /// controlled by the Key.
    /// Exactly one of the possible values should be populated in order for the Key to be valid.
    struct KeyValue {
        // if set to true, the key of the calling Hedera account will be inherited as the token key
        bool inheritAccountKey;
        // smart contract instance that is authorized as if it had signed with a key
        address contractId;
        // Ed25519 public key bytes
        bytes ed25519;
        // Compressed ECDSA(secp256k1) public key bytes
        bytes ECDSA_secp256k1;
        // A smart contract that, if the recipient of the active message frame, should be treated
        // as having signed. (Note this does not mean the <i>code being executed in the frame</i>
        // will belong to the given contract, since it could be running another contract's code via
        // <tt>delegatecall</tt>. So setting this key is a more permissive version of setting the
        // contractID key, which also requires the code in the active message frame belong to the
        // the contract with the given id.)
        address delegatableContractId;
    }

    /// A list of token key types the key should be applied to and the value of the key
    struct TokenKey {
        // bit field representing the key type. Keys of all types that have corresponding bits set to 1
        // will be created for the token.
        // 0th bit: adminKey
        // 1st bit: kycKey
        // 2nd bit: freezeKey
        // 3rd bit: wipeKey
        // 4th bit: supplyKey
        // 5th bit: feeScheduleKey
        // 6th bit: pauseKey
        // 7th bit: ignored
        uint keyType;
        // the value that will be set to the key type
        KeyValue key;
    }

    /// Basic properties of a Hedera Token - name, symbol, memo, tokenSupplyType, maxSupply,
    /// treasury, freezeDefault. These properties are related both to Fungible and NFT token types.
    struct HederaToken {
        // The publicly visible name of the token. The token name is specified as a Unicode string.
        // Its UTF-8 encoding cannot exceed 100 bytes, and cannot contain the 0 byte (NUL).
        string name;
        // The publicly visible token symbol. The token symbol is specified as a Unicode string.
        // Its UTF-8 encoding cannot exceed 100 bytes, and cannot contain the 0 byte (NUL).
        string symbol;
        // The ID of the account which will act as a treasury for the token as a solidity address.
        // This account will receive the specified initial supply or the newly minted NFTs in
        // the case for NON_FUNGIBLE_UNIQUE Type
        address treasury;
        // The memo associated with the token (UTF-8 encoding max 100 bytes)
        string memo;
        // IWA compatibility. Specified the token supply type. Defaults to INFINITE
        bool tokenSupplyType;
        // IWA Compatibility. Depends on TokenSupplyType. For tokens of type FUNGIBLE_COMMON - the
        // maximum number of tokens that can be in circulation. For tokens of type NON_FUNGIBLE_UNIQUE -
        // the maximum number of NFTs (serial numbers) that can be minted. This field can never be changed!
        int64 maxSupply;
        // The default Freeze status (frozen or unfrozen) of Hedera accounts relative to this token. If
        // true, an account must be unfrozen before it can receive the token
        bool freezeDefault;
        // list of keys to set to the token
        TokenKey[] tokenKeys;
        // expiry properties of a Hedera token - second, autoRenewAccount, autoRenewPeriod
        Expiry expiry;
    }

    /// Additional post creation fungible and non fungible properties of a Hedera Token.
    struct TokenInfo {
        /// Basic properties of a Hedera Token
        HederaToken token;
        /// The number of tokens (fungible) or serials (non-fungible) of the token
        int64 totalSupply;
        /// Specifies whether the token is deleted or not
        bool deleted;
        /// Specifies whether the token kyc was defaulted with KycNotApplicable (true) or Revoked (false)
        bool defaultKycStatus;
        /// Specifies whether the token is currently paused or not
        bool pauseStatus;
        /// The fixed fees collected when transferring the token
        FixedFee[] fixedFees;
        /// The fractional fees collected when transferring the token
        FractionalFee[] fractionalFees;
        /// The royalty fees collected when transferring the token
        RoyaltyFee[] royaltyFees;
        /// The ID of the network ledger
        string ledgerId;
    }

    /// Additional fungible properties of a Hedera Token.
    struct FungibleTokenInfo {
        /// The shared hedera token info
        TokenInfo tokenInfo;
        /// The number of decimal places a token is divisible by
        int32 decimals;
    }

    /// Additional non fungible properties of a Hedera Token.
    struct NonFungibleTokenInfo {
        /// The shared hedera token info
        TokenInfo tokenInfo;
        /// The serial number of the nft
        int64 serialNumber;
        /// The account id specifying the owner of the non fungible token
        address ownerId;
        /// The epoch second at which the token was created.
        int64 creationTime;
        /// The unique metadata of the NFT
        bytes metadata;
        /// The account id specifying an account that has been granted spending permissions on this nft
        address spenderId;
    }

    /// A fixed number of units (hbar or token) to assess as a fee during a transfer of
    /// units of the token to which this fixed fee is attached. The denomination of
    /// the fee depends on the values of tokenId, useHbarsForPayment and
    /// useCurrentTokenForPayment. Exactly one of the values should be set.
    struct FixedFee {
        int64 amount;
        // Specifies ID of token that should be used for fixed fee denomination
        address tokenId;
        // Specifies this fixed fee should be denominated in Hbar
        bool useHbarsForPayment;
        // Specifies this fixed fee should be denominated in the Token currently being created
        bool useCurrentTokenForPayment;
        // The ID of the account to receive the custom fee, expressed as a solidity address
        address feeCollector;
    }

    /// A fraction of the transferred units of a token to assess as a fee. The amount assessed will never
    /// be less than the given minimumAmount, and never greater than the given maximumAmount.  The
    /// denomination is always units of the token to which this fractional fee is attached.
    struct FractionalFee {
        // A rational number's numerator, used to set the amount of a value transfer to collect as a custom fee
        int64 numerator;
        // A rational number's denominator, used to set the amount of a value transfer to collect as a custom fee
        int64 denominator;
        // The minimum amount to assess
        int64 minimumAmount;
        // The maximum amount to assess (zero implies no maximum)
        int64 maximumAmount;
        bool netOfTransfers;
        // The ID of the account to receive the custom fee, expressed as a solidity address
        address feeCollector;
    }

    /// A fee to assess during a transfer that changes ownership of an NFT. Defines the fraction of
    /// the fungible value exchanged for an NFT that the ledger should collect as a royalty. ("Fungible
    /// value" includes both ℏ and units of fungible HTS tokens.) When the NFT sender does not receive
    /// any fungible value, the ledger will assess the fallback fee, if present, to the new NFT owner.
    /// Royalty fees can only be added to tokens of type type NON_FUNGIBLE_UNIQUE.
    struct RoyaltyFee {
        // A fraction's numerator of fungible value exchanged for an NFT to collect as royalty
        int64 numerator;
        // A fraction's denominator of fungible value exchanged for an NFT to collect as royalty
        int64 denominator;
        // If present, the fee to assess to the NFT receiver when no fungible value
        // is exchanged with the sender. Consists of:
        // amount: the amount to charge for the fee
        // tokenId: Specifies ID of token that should be used for fixed fee denomination
        // useHbarsForPayment: Specifies this fee should be denominated in Hbar
        int64 amount;
        address tokenId;
        bool useHbarsForPayment;
        // The ID of the account to receive the custom fee, expressed as a solidity address
        address feeCollector;
    }

    /**********************
     * Direct HTS Calls   *
     **********************/

    /// Performs transfers among combinations of tokens and hbars
    /// @param transferList the list of hbar transfers to do
    /// @param tokenTransfers the list of token transfers to do
    /// @custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)
    function cryptoTransfer(
        TransferList memory transferList,
        TokenTransferList[] memory tokenTransfers
    ) external returns (int64 responseCode);

    /// Mints an amount of the token to the defined treasury account
    /// @param token The token for which to mint tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount Applicable to tokens of type FUNGIBLE_COMMON. The amount to mint to the Treasury Account.
    ///               Amount must be a positive non-zero number represented in the lowest denomination of the
    ///               token. The new supply must be lower than 2^63.
    /// @param metadata Applicable to tokens of type NON_FUNGIBLE_UNIQUE. A list of metadata that are being created.
    ///                 Maximum allowed size of each metadata is 100 bytes
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    /// @return serialNumbers If the token is an NFT the newly generate serial numbers, othersise empty.
    function mintToken(
        address token,
        int64 amount,
        bytes[] memory metadata
    ) external returns (int64 responseCode, int64 newTotalSupply, int64[] memory serialNumbers);

    /// Burns an amount of the token from the defined treasury account
    /// @param token The token for which to burn tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount  Applicable to tokens of type FUNGIBLE_COMMON. The amount to burn from the Treasury Account.
    ///                Amount must be a positive non-zero number, not bigger than the token balance of the treasury
    ///                account (0; balance], represented in the lowest denomination.
    /// @param serialNumbers Applicable to tokens of type NON_FUNGIBLE_UNIQUE. The list of serial numbers to be burned.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    function burnToken(
        address token,
        int64 amount,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode, int64 newTotalSupply);

    ///  Associates the provided account with the provided tokens. Must be signed by the provided
    ///  Account's key or called from the accounts contract key
    ///  If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    ///  If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    ///  If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    ///  If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    ///  If an association between the provided account and any of the tokens already exists, the
    ///  transaction will resolve to TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT.
    ///  If the provided account's associations count exceed the constraint of maximum token associations
    ///    per account, the transaction will resolve to TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED.
    ///  On success, associations between the provided account and tokens are made and the account is
    ///    ready to interact with the tokens.
    /// @param account The account to be associated with the provided tokens
    /// @param tokens The tokens to be associated with the provided account. In the case of NON_FUNGIBLE_UNIQUE
    ///               Type, once an account is associated, it can hold any number of NFTs (serial numbers) of that
    ///               token type
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function associateTokens(address account, address[] memory tokens) external returns (int64 responseCode);

    /// Single-token variant of associateTokens. Will be mapped to a single entry array call of associateTokens
    /// @param account The account to be associated with the provided token
    /// @param token The token to be associated with the provided account
    function associateToken(address account, address token) external returns (int64 responseCode);

    /// Dissociates the provided account with the provided tokens. Must be signed by the provided
    /// Account's key.
    /// If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    /// If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    /// If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    /// If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    /// If an association between the provided account and any of the tokens does not exist, the
    /// transaction will resolve to TOKEN_NOT_ASSOCIATED_TO_ACCOUNT.
    /// If a token has not been deleted and has not expired, and the user has a nonzero balance, the
    /// transaction will resolve to TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES.
    /// If a <b>fungible token</b> has expired, the user can disassociate even if their token balance is
    /// not zero.
    /// If a <b>non fungible token</b> has expired, the user can <b>not</b> disassociate if their token
    /// balance is not zero. The transaction will resolve to TRANSACTION_REQUIRED_ZERO_TOKEN_BALANCES.
    /// On success, associations between the provided account and tokens are removed.
    /// @param account The account to be dissociated from the provided tokens
    /// @param tokens The tokens to be dissociated from the provided account.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function dissociateTokens(address account, address[] memory tokens) external returns (int64 responseCode);

    /// Single-token variant of dissociateTokens. Will be mapped to a single entry array call of dissociateTokens
    /// @param account The account to be associated with the provided token
    /// @param token The token to be associated with the provided account
    function dissociateToken(address account, address token) external returns (int64 responseCode);

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleToken(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals
    ) external payable returns (int64 responseCode, address tokenAddress);

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by.
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param fractionalFees list of fractional fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleTokenWithCustomFees(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals,
        FixedFee[] memory fixedFees,
        FractionalFee[] memory fractionalFees
    ) external payable returns (int64 responseCode, address tokenAddress);

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleToken(
        HederaToken memory token
    ) external payable returns (int64 responseCode, address tokenAddress);

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param royaltyFees list of royalty fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleTokenWithCustomFees(
        HederaToken memory token,
        FixedFee[] memory fixedFees,
        RoyaltyFee[] memory royaltyFees
    ) external payable returns (int64 responseCode, address tokenAddress);

    /**********************
     * ABIV1 calls        *
     **********************/

    /// Initiates a Fungible Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param accountId account to do a transfer to/from
    /// @param amount The amount from the accountId at the same index
    function transferTokens(
        address token,
        address[] memory accountId,
        int64[] memory amount
    ) external returns (int64 responseCode);

    /// Initiates a Non-Fungable Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param sender the sender of an nft
    /// @param receiver the receiver of the nft sent by the same index at sender
    /// @param serialNumber the serial number of the nft sent by the same index at sender
    function transferNFTs(
        address token,
        address[] memory sender,
        address[] memory receiver,
        int64[] memory serialNumber
    ) external returns (int64 responseCode);

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param recipient The receiver of the transaction
    /// @param amount Non-negative value to send. a negative value will result in a failure.
    function transferToken(
        address token,
        address sender,
        address recipient,
        int64 amount
    ) external returns (int64 responseCode);

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param recipient The receiver of the transaction
    /// @param serialNumber The serial number of the NFT to transfer.
    function transferNFT(
        address token,
        address sender,
        address recipient,
        int64 serialNumber
    ) external returns (int64 responseCode);

    /// Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
    /// again it overwrites the current allowance with value.
    /// Only Applicable to Fungible Tokens
    /// @param token The hedera token address to approve
    /// @param spender the account address authorized to spend
    /// @param amount the amount of tokens authorized to spend.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approve(address token, address spender, uint256 amount) external returns (int64 responseCode);

    /// Transfers `amount` tokens from `from` to `to` using the
    //  allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// Only applicable to fungible tokens
    /// @param token The address of the fungible Hedera token to transfer
    /// @param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
    /// @param to The account address of the receiver of the `amount` tokens
    /// @param amount The amount of tokens to transfer from `from` to `to`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) external returns (int64 responseCode);

    /// Returns the amount which spender is still allowed to withdraw from owner.
    /// Only Applicable to Fungible Tokens
    /// @param token The Hedera token address to check the allowance of
    /// @param owner the owner of the tokens to be spent
    /// @param spender the spender of the tokens
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return allowance The amount which spender is still allowed to withdraw from owner.
    function allowance(
        address token,
        address owner,
        address spender
    ) external returns (int64 responseCode, uint256 allowance);

    /// Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
    /// @param serialNumber The NFT serial number  to approve
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approveNFT(address token, address approved, uint256 serialNumber) external returns (int64 responseCode);

    /// Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
    /// Only applicable to NFT tokens
    /// @param token The address of the non-fungible Hedera token to transfer
    /// @param from The account address of the owner of `serialNumber` of `token`
    /// @param to The account address of the receiver of `serialNumber`
    /// @param serialNumber The NFT serial number to transfer
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFromNFT(
        address token,
        address from,
        address to,
        uint256 serialNumber
    ) external returns (int64 responseCode);

    /// Get the approved address for a single NFT
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to check approval
    /// @param serialNumber The NFT to find the approved address for
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved The approved address for this NFT, or the zero address if there is none
    function getApproved(address token, uint256 serialNumber) external returns (int64 responseCode, address approved);

    /// Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @param token The Hedera NFT token address to approve
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function setApprovalForAll(address token, address operator, bool approved) external returns (int64 responseCode);

    /// Query if an address is an authorized operator for another address
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param owner The address that owns the NFTs
    /// @param operator The address that acts on behalf of the owner
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved True if `operator` is an approved operator for `owner`, false otherwise
    function isApprovedForAll(
        address token,
        address owner,
        address operator
    ) external returns (int64 responseCode, bool approved);

    /// Query if token account is frozen
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return frozen True if `account` is frozen for `token`
    function isFrozen(address token, address account) external returns (int64 responseCode, bool frozen);

    /// Query if token account has kyc granted
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return kycGranted True if `account` has kyc granted for `token`
    function isKyc(address token, address account) external returns (int64 responseCode, bool kycGranted);

    /// Operation to delete token
    /// @param token The token address to be deleted
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function deleteToken(address token) external returns (int64 responseCode);

    /// Query token custom fees
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fixedFees Set of fixed fees for `token`
    /// @return fractionalFees Set of fractional fees for `token`
    /// @return royaltyFees Set of royalty fees for `token`
    function getTokenCustomFees(
        address token
    )
        external
        returns (
            int64 responseCode,
            FixedFee[] memory fixedFees,
            FractionalFee[] memory fractionalFees,
            RoyaltyFee[] memory royaltyFees
        );

    /// Query token default freeze status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultFreezeStatus True if `token` default freeze status is frozen.
    function getTokenDefaultFreezeStatus(address token) external returns (int64 responseCode, bool defaultFreezeStatus);

    /// Query token default kyc status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultKycStatus True if `token` default kyc status is KycNotApplicable and false if Revoked.
    function getTokenDefaultKycStatus(address token) external returns (int64 responseCode, bool defaultKycStatus);

    /// Query token expiry info
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return expiry Expiry info for `token`
    function getTokenExpiryInfo(address token) external returns (int64 responseCode, Expiry memory expiry);

    /// Query fungible token info
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fungibleTokenInfo FungibleTokenInfo info for `token`
    function getFungibleTokenInfo(
        address token
    ) external returns (int64 responseCode, FungibleTokenInfo memory fungibleTokenInfo);

    /// Query token info
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenInfo TokenInfo info for `token`
    function getTokenInfo(address token) external returns (int64 responseCode, TokenInfo memory tokenInfo);

    /// Query token KeyValue
    /// @param token The token address to check
    /// @param keyType The keyType of the desired KeyValue
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return key KeyValue info for key of type `keyType`
    function getTokenKey(address token, uint keyType) external returns (int64 responseCode, KeyValue memory key);

    /// Query non fungible token info
    /// @param token The token address to check
    /// @param serialNumber The NFT serialNumber to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return nonFungibleTokenInfo NonFungibleTokenInfo info for `token` `serialNumber`
    function getNonFungibleTokenInfo(
        address token,
        int64 serialNumber
    ) external returns (int64 responseCode, NonFungibleTokenInfo memory nonFungibleTokenInfo);

    /// Operation to freeze token account
    /// @param token The token address
    /// @param account The account address to be frozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function freezeToken(address token, address account) external returns (int64 responseCode);

    /// Operation to unfreeze token account
    /// @param token The token address
    /// @param account The account address to be unfrozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unfreezeToken(address token, address account) external returns (int64 responseCode);

    /// Operation to grant kyc to token account
    /// @param token The token address
    /// @param account The account address to grant kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function grantTokenKyc(address token, address account) external returns (int64 responseCode);

    /// Operation to revoke kyc to token account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function revokeTokenKyc(address token, address account) external returns (int64 responseCode);

    /// Operation to pause token
    /// @param token The token address to be paused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function pauseToken(address token) external returns (int64 responseCode);

    /// Operation to unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unpauseToken(address token) external returns (int64 responseCode);

    /// Operation to wipe fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param amount The number of tokens to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccount(address token, address account, int64 amount) external returns (int64 responseCode);

    /// Operation to wipe non fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param  serialNumbers The serial numbers of token to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccountNFT(
        address token,
        address account,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode);

    /// Operation to update token info
    /// @param token The token address
    /// @param tokenInfo The hedera token info to update token with
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenInfo(address token, HederaToken memory tokenInfo) external returns (int64 responseCode);

    /// Operation to update token expiry info
    /// @param token The token address
    /// @param expiryInfo The hedera token expiry info
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenExpiryInfo(address token, Expiry memory expiryInfo) external returns (int64 responseCode);

    /// Operation to update token expiry info
    /// @param token The token address
    /// @param keys The token keys
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenKeys(address token, TokenKey[] memory keys) external returns (int64 responseCode);

    /// Query if valid token found for the given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return isToken True if valid token found for the given address
    function isToken(address token) external returns (int64 responseCode, bool isToken);

    /// Query to return the token type for a given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenType the token type. 0 is FUNGIBLE_COMMON, 1 is NON_FUNGIBLE_UNIQUE, -1 is UNRECOGNIZED
    function getTokenType(address token) external returns (int64 responseCode, int32 tokenType);

    /// Initiates a Redirect For Token
    /// @param token The token address
    /// @param encodedFunctionSelector The function selector from the ERC20 interface + the bytes input for the function called
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return response The result of the call that had been encoded and sent for execution.
    function redirectForToken(
        address token,
        bytes memory encodedFunctionSelector
    ) external returns (int64 responseCode, bytes memory response);
}


// File contracts/hedera/system/HederaTokenService.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2
abstract contract HederaTokenService {
    address constant precompileAddress = address(0x167);
    // 90 days in seconds
    int32 constant defaultAutoRenewPeriod = 7776000;

    modifier nonEmptyExpiry(IHederaTokenService.HederaToken memory token) {
        if (token.expiry.second == 0 && token.expiry.autoRenewPeriod == 0) {
            token.expiry.autoRenewPeriod = defaultAutoRenewPeriod;
        }
        _;
    }

    /// Performs transfers among combinations of tokens and hbars
    /// @param transferList the list of hbar transfers to do
    /// @param tokenTransfers the list of transfers to do
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)
    function cryptoTransfer(
        IHederaTokenService.TransferList memory transferList,
        IHederaTokenService.TokenTransferList[] memory tokenTransfers
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.cryptoTransfer.selector, transferList, tokenTransfers)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Performs transfers among combinations of tokens and hbars
    /// @param transferList the list of hbar transfers to do
    /// @param tokenTransfers the list of transfers to do
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)
    function delegateCryptoTransfer(
        IHederaTokenService.TransferList memory transferList,
        IHederaTokenService.TokenTransferList[] memory tokenTransfers
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.cryptoTransfer.selector, transferList, tokenTransfers)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Mints an amount of the token to the defined treasury account
    /// @param token The token for which to mint tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount Applicable to tokens of type FUNGIBLE_COMMON. The amount to mint to the Treasury Account.
    ///               Amount must be a positive non-zero number represented in the lowest denomination of the
    ///               token. The new supply must be lower than 2^63.
    /// @param metadata Applicable to tokens of type NON_FUNGIBLE_UNIQUE. A list of metadata that are being created.
    ///                 Maximum allowed size of each metadata is 100 bytes
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    /// @return serialNumbers If the token is an NFT the newly generate serial numbers, otherwise empty.
    function mintToken(
        address token,
        int64 amount,
        bytes[] memory metadata
    ) internal returns (int responseCode, int64 newTotalSupply, int64[] memory serialNumbers) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.mintToken.selector, token, amount, metadata)
        );
        (responseCode, newTotalSupply, serialNumbers) = success
            ? abi.decode(result, (int32, int64, int64[]))
            : (HederaResponseCodes.UNKNOWN, int64(0), new int64[](0));
    }

    /// Burns an amount of the token from the defined treasury account
    /// @param token The token for which to burn tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount  Applicable to tokens of type FUNGIBLE_COMMON. The amount to burn from the Treasury Account.
    ///                Amount must be a positive non-zero number, not bigger than the token balance of the treasury
    ///                account (0; balance], represented in the lowest denomination.
    /// @param serialNumbers Applicable to tokens of type NON_FUNGIBLE_UNIQUE. The list of serial numbers to be burned.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    function burnToken(
        address token,
        int64 amount,
        int64[] memory serialNumbers
    ) internal returns (int responseCode, int64 newTotalSupply) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.burnToken.selector, token, amount, serialNumbers)
        );
        (responseCode, newTotalSupply) = success
            ? abi.decode(result, (int32, int64))
            : (HederaResponseCodes.UNKNOWN, int64(0));
    }

    ///  Associates the provided account with the provided tokens. Must be signed by the provided
    ///  Account's key or called from the accounts contract key
    ///  If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    ///  If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    ///  If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    ///  If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    ///  If an association between the provided account and any of the tokens already exists, the
    ///  transaction will resolve to TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT.
    ///  If the provided account's associations count exceed the constraint of maximum token associations
    ///    per account, the transaction will resolve to TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED.
    ///  On success, associations between the provided account and tokens are made and the account is
    ///    ready to interact with the tokens.
    /// @param account The account to be associated with the provided tokens
    /// @param tokens The tokens to be associated with the provided account. In the case of NON_FUNGIBLE_UNIQUE
    ///               Type, once an account is associated, it can hold any number of NFTs (serial numbers) of that
    ///               token type
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function associateTokens(address account, address[] memory tokens) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.associateTokens.selector, account, tokens)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    function associateToken(address account, address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.associateToken.selector, account, token)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Dissociates the provided account with the provided tokens. Must be signed by the provided
    /// Account's key.
    /// If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    /// If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    /// If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    /// If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    /// If an association between the provided account and any of the tokens does not exist, the
    /// transaction will resolve to TOKEN_NOT_ASSOCIATED_TO_ACCOUNT.
    /// If a token has not been deleted and has not expired, and the user has a nonzero balance, the
    /// transaction will resolve to TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES.
    /// If a <b>fungible token</b> has expired, the user can disassociate even if their token balance is
    /// not zero.
    /// If a <b>non fungible token</b> has expired, the user can <b>not</b> disassociate if their token
    /// balance is not zero. The transaction will resolve to TRANSACTION_REQUIRED_ZERO_TOKEN_BALANCES.
    /// On success, associations between the provided account and tokens are removed.
    /// @param account The account to be dissociated from the provided tokens
    /// @param tokens The tokens to be dissociated from the provided account.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function dissociateTokens(address account, address[] memory tokens) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.dissociateTokens.selector, account, tokens)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    function dissociateToken(address account, address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.dissociateToken.selector, account, token)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleToken(
        IHederaTokenService.HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(
                IHederaTokenService.createFungibleToken.selector,
                token,
                initialTotalSupply,
                decimals
            )
        );

        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param fractionalFees list of fractional fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleTokenWithCustomFees(
        IHederaTokenService.HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals,
        IHederaTokenService.FixedFee[] memory fixedFees,
        IHederaTokenService.FractionalFee[] memory fractionalFees
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(
                IHederaTokenService.createFungibleTokenWithCustomFees.selector,
                token,
                initialTotalSupply,
                decimals,
                fixedFees,
                fractionalFees
            )
        );
        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleToken(
        IHederaTokenService.HederaToken memory token
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(IHederaTokenService.createNonFungibleToken.selector, token)
        );
        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param royaltyFees list of royalty fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleTokenWithCustomFees(
        IHederaTokenService.HederaToken memory token,
        IHederaTokenService.FixedFee[] memory fixedFees,
        IHederaTokenService.RoyaltyFee[] memory royaltyFees
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(
                IHederaTokenService.createNonFungibleTokenWithCustomFees.selector,
                token,
                fixedFees,
                royaltyFees
            )
        );
        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Retrieves fungible specific token info for a fungible token
    /// @param token The ID of the token as a solidity address
    function getFungibleTokenInfo(
        address token
    ) internal returns (int responseCode, IHederaTokenService.FungibleTokenInfo memory tokenInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getFungibleTokenInfo.selector, token)
        );
        IHederaTokenService.FungibleTokenInfo memory defaultTokenInfo;
        (responseCode, tokenInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.FungibleTokenInfo))
            : (HederaResponseCodes.UNKNOWN, defaultTokenInfo);
    }

    /// Retrieves general token info for a given token
    /// @param token The ID of the token as a solidity address
    function getTokenInfo(
        address token
    ) internal returns (int responseCode, IHederaTokenService.TokenInfo memory tokenInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenInfo.selector, token)
        );
        IHederaTokenService.TokenInfo memory defaultTokenInfo;
        (responseCode, tokenInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.TokenInfo))
            : (HederaResponseCodes.UNKNOWN, defaultTokenInfo);
    }

    /// Retrieves non-fungible specific token info for a given NFT
    /// @param token The ID of the token as a solidity address
    function getNonFungibleTokenInfo(
        address token,
        int64 serialNumber
    ) internal returns (int responseCode, IHederaTokenService.NonFungibleTokenInfo memory tokenInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getNonFungibleTokenInfo.selector, token, serialNumber)
        );
        IHederaTokenService.NonFungibleTokenInfo memory defaultTokenInfo;
        (responseCode, tokenInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.NonFungibleTokenInfo))
            : (HederaResponseCodes.UNKNOWN, defaultTokenInfo);
    }

    /// Query token custom fees
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fixedFees Set of fixed fees for `token`
    /// @return fractionalFees Set of fractional fees for `token`
    /// @return royaltyFees Set of royalty fees for `token`
    function getTokenCustomFees(
        address token
    )
        internal
        returns (
            int64 responseCode,
            IHederaTokenService.FixedFee[] memory fixedFees,
            IHederaTokenService.FractionalFee[] memory fractionalFees,
            IHederaTokenService.RoyaltyFee[] memory royaltyFees
        )
    {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenCustomFees.selector, token)
        );
        IHederaTokenService.FixedFee[] memory defaultFixedFees;
        IHederaTokenService.FractionalFee[] memory defaultFractionalFees;
        IHederaTokenService.RoyaltyFee[] memory defaultRoyaltyFees;
        (responseCode, fixedFees, fractionalFees, royaltyFees) = success
            ? abi.decode(
                result,
                (
                    int32,
                    IHederaTokenService.FixedFee[],
                    IHederaTokenService.FractionalFee[],
                    IHederaTokenService.RoyaltyFee[]
                )
            )
            : (HederaResponseCodes.UNKNOWN, defaultFixedFees, defaultFractionalFees, defaultRoyaltyFees);
    }

    /// Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
    /// again it overwrites the current allowance with value.
    /// Only Applicable to Fungible Tokens
    /// @param token The hedera token address to approve
    /// @param spender the account authorized to spend
    /// @param amount the amount of tokens authorized to spend.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approve(address token, address spender, uint256 amount) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.approve.selector, token, spender, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
    /// again it overwrites the current allowance with value.
    /// Only Applicable to Fungible Tokens
    /// @param token The hedera token address to approve
    /// @param spender the account authorized to spend
    /// @param amount the amount of tokens authorized to spend.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateApprove(address token, address spender, uint256 amount) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.approve.selector, token, spender, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `amount` tokens from `from` to `to` using the
    //  allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// Only applicable to fungible tokens
    /// @param token The address of the fungible Hedera token to transfer
    /// @param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
    /// @param to The account address of the receiver of the `amount` tokens
    /// @param amount The amount of tokens to transfer from `from` to `to`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferFrom.selector, token, from, to, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `amount` tokens from `from` to `to` using the
    //  allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// Only applicable to fungible tokens
    /// @param token The address of the fungible Hedera token to transfer
    /// @param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
    /// @param to The account address of the receiver of the `amount` tokens
    /// @param amount The amount of tokens to transfer from `from` to `to`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateTransferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.transferFrom.selector, token, from, to, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
    /// Only applicable to NFT tokens
    /// @param token The address of the non-fungible Hedera token to transfer
    /// @param from The account address of the owner of `serialNumber` of `token`
    /// @param to The account address of the receiver of `serialNumber`
    /// @param serialNumber The NFT serial number to transfer
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFromNFT(
        address token,
        address from,
        address to,
        uint256 serialNumber
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferFromNFT.selector, token, from, to, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
    /// Only applicable to NFT tokens
    /// @param token The address of the non-fungible Hedera token to transfer
    /// @param from The account address of the owner of `serialNumber` of `token`
    /// @param to The account address of the receiver of `serialNumber`
    /// @param serialNumber The NFT serial number to transfer
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateTransferFromNFT(
        address token,
        address from,
        address to,
        uint256 serialNumber
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.transferFromNFT.selector, token, from, to, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Returns the amount which spender is still allowed to withdraw from owner.
    /// Only Applicable to Fungible Tokens
    /// @param token The Hedera token address to check the allowance of
    /// @param owner the owner of the tokens to be spent
    /// @param spender the spender of the tokens
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function allowance(
        address token,
        address owner,
        address spender
    ) internal returns (int responseCode, uint256 amount) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.allowance.selector, token, owner, spender)
        );
        (responseCode, amount) = success ? abi.decode(result, (int32, uint256)) : (HederaResponseCodes.UNKNOWN, 0);
    }

    /// Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
    /// @param serialNumber The NFT serial number  to approve
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approveNFT(address token, address approved, uint256 serialNumber) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.approveNFT.selector, token, approved, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
    /// @param serialNumber The NFT serial number  to approve
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateApproveNFT(
        address token,
        address approved,
        uint256 serialNumber
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.approveNFT.selector, token, approved, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Get the approved address for a single NFT
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to check approval
    /// @param serialNumber The NFT to find the approved address for
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved The approved address for this NFT, or the zero address if there is none
    function getApproved(address token, uint256 serialNumber) internal returns (int responseCode, address approved) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getApproved.selector, token, serialNumber)
        );
        (responseCode, approved) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Query if token account is frozen
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return frozen True if `account` is frozen for `token`
    function isFrozen(address token, address account) internal returns (int64 responseCode, bool frozen) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isFrozen.selector, token, account)
        );
        (responseCode, frozen) = success ? abi.decode(result, (int32, bool)) : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query if token account has kyc granted
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return kycGranted True if `account` has kyc granted for `token`
    function isKyc(address token, address account) internal returns (int64 responseCode, bool kycGranted) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isKyc.selector, token, account)
        );
        (responseCode, kycGranted) = success ? abi.decode(result, (int32, bool)) : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Operation to freeze token account
    /// @param token The token address
    /// @param account The account address to be frozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function freezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.freezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate freeze token account
    /// @param token The token address
    /// @param account The account address to be frozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateFreezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.freezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to unfreeze token account
    /// @param token The token address
    /// @param account The account address to be unfrozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unfreezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.unfreezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate unfreeze token account
    /// @param token The token address
    /// @param account The account address to be unfrozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateUnfreezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.unfreezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to grant kyc to token account
    /// @param token The token address
    /// @param account The account address to grant kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function grantTokenKyc(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.grantTokenKyc.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to revoke kyc to token account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function revokeTokenKyc(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.revokeTokenKyc.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @param token The Hedera NFT token address to approve
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function setApprovalForAll(address token, address operator, bool approved) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.setApprovalForAll.selector, token, operator, approved)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @param token The Hedera NFT token address to approve
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateSetApprovalForAll(
        address token,
        address operator,
        bool approved
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.setApprovalForAll.selector, token, operator, approved)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Query if an address is an authorized operator for another address
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param owner The address that owns the NFTs
    /// @param operator The address that acts on behalf of the owner
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved True if `operator` is an approved operator for `owner`, false otherwise
    function isApprovedForAll(
        address token,
        address owner,
        address operator
    ) internal returns (int responseCode, bool approved) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isApprovedForAll.selector, token, owner, operator)
        );
        (responseCode, approved) = success ? abi.decode(result, (int32, bool)) : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query token default freeze status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultFreezeStatus True if `token` default freeze status is frozen.
    function getTokenDefaultFreezeStatus(address token) internal returns (int responseCode, bool defaultFreezeStatus) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenDefaultFreezeStatus.selector, token)
        );
        (responseCode, defaultFreezeStatus) = success
            ? abi.decode(result, (int32, bool))
            : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query token default kyc status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultKycStatus True if `token` default kyc status is KycNotApplicable and false if Revoked.
    function getTokenDefaultKycStatus(address token) internal returns (int responseCode, bool defaultKycStatus) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenDefaultKycStatus.selector, token)
        );
        (responseCode, defaultKycStatus) = success
            ? abi.decode(result, (int32, bool))
            : (HederaResponseCodes.UNKNOWN, false);
    }

    /**********************
     * ABI v1 calls       *
     **********************/

    /// Initiates a Fungible Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param accountIds account to do a transfer to/from
    /// @param amounts The amount from the accountId at the same index
    function transferTokens(
        address token,
        address[] memory accountIds,
        int64[] memory amounts
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferTokens.selector, token, accountIds, amounts)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Initiates a Non-Fungable Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param sender the sender of an nft
    /// @param receiver the receiver of the nft sent by the same index at sender
    /// @param serialNumber the serial number of the nft sent by the same index at sender
    function transferNFTs(
        address token,
        address[] memory sender,
        address[] memory receiver,
        int64[] memory serialNumber
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferNFTs.selector, token, sender, receiver, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param receiver The receiver of the transaction
    /// @param amount Non-negative value to send. a negative value will result in a failure.
    function transferToken(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferToken.selector, token, sender, receiver, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    // Router is using delegatecall - don't need to associate tokens to router
    function transferTokenRouter(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) internal returns (int32 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.transferToken.selector, token, sender, receiver, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param receiver The receiver of the transaction
    /// @param serialNumber The serial number of the NFT to transfer.
    function transferNFT(
        address token,
        address sender,
        address receiver,
        int64 serialNumber
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferNFT.selector, token, sender, receiver, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to pause token
    /// @param token The token address to be paused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function pauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.pauseToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate pause token
    /// @param token The token address to be paused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegatePauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.pauseToken.selector, token)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unpauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.unpauseToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateUnpauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.unpauseToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to wipe fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param amount The number of tokens to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccount(address token, address account, int64 amount) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.wipeTokenAccount.selector, token, account, amount)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to wipe fungible tokens from account with delegate call
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param amount The number of tokens to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateWipeTokenAccount(
        address token,
        address account,
        int64 amount
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.wipeTokenAccount.selector, token, account, amount)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to wipe non fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param  serialNumbers The serial numbers of token to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccountNFT(
        address token,
        address account,
        int64[] memory serialNumbers
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.wipeTokenAccountNFT.selector, token, account, serialNumbers)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delete token
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function deleteToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.deleteToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to update token keys
    /// @param token The token address
    /// @param keys The token keys
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenKeys(
        address token,
        IHederaTokenService.TokenKey[] memory keys
    ) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.updateTokenKeys.selector, token, keys)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to update token keys with delegate call
    /// @param token The token address
    /// @param keys The token keys
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateUpdateTokenKeys(
        address token,
        IHederaTokenService.TokenKey[] memory keys
    ) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.updateTokenKeys.selector, token, keys)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Query token KeyValue
    /// @param token The token address to check
    /// @param keyType The keyType of the desired KeyValue
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return key KeyValue info for key of type `keyType`
    function getTokenKey(
        address token,
        uint keyType
    ) internal returns (int64 responseCode, IHederaTokenService.KeyValue memory key) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenKey.selector, token, keyType)
        );
        IHederaTokenService.KeyValue memory defaultKeyValueInfo;
        (responseCode, key) = success
            ? abi.decode(result, (int32, IHederaTokenService.KeyValue))
            : (HederaResponseCodes.UNKNOWN, defaultKeyValueInfo);
    }

    /// Query if valid token found for the given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return isTokenFlag True if valid token found for the given address
    function isToken(address token) internal returns (int64 responseCode, bool isTokenFlag) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isToken.selector, token)
        );
        (responseCode, isTokenFlag) = success
            ? abi.decode(result, (int32, bool))
            : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query to return the token type for a given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenType the token type. 0 is FUNGIBLE_COMMON, 1 is NON_FUNGIBLE_UNIQUE, -1 is UNRECOGNIZED
    function getTokenType(address token) internal returns (int64 responseCode, int32 tokenType) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenType.selector, token)
        );
        (responseCode, tokenType) = success ? abi.decode(result, (int32, int32)) : (HederaResponseCodes.UNKNOWN, -1);
    }

    /// Operation to get token expiry info
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return expiryInfo The expiry info of the token
    function getTokenExpiryInfo(
        address token
    ) internal returns (int responseCode, IHederaTokenService.Expiry memory expiryInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenExpiryInfo.selector, token)
        );
        IHederaTokenService.Expiry memory defaultExpiryInfo;
        (responseCode, expiryInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.Expiry))
            : (HederaResponseCodes.UNKNOWN, defaultExpiryInfo);
    }

    /// Operation to update token expiry info
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenExpiryInfo(
        address token,
        IHederaTokenService.Expiry memory expiryInfo
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.updateTokenExpiryInfo.selector, token, expiryInfo)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to update token info
    /// @param token The token address
    /// @param tokenInfo The hedera token info to update token with
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenInfo(
        address token,
        IHederaTokenService.HederaToken memory tokenInfo
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.updateTokenInfo.selector, token, tokenInfo)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }
}


// File contracts/hedera/system/KeyHelper.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2
abstract contract KeyHelper {
    using Bits for uint256;
    address supplyContract;

    mapping(KeyType => uint256) keyTypes;

    enum KeyType {
        ADMIN,
        KYC,
        FREEZE,
        WIPE,
        SUPPLY,
        FEE,
        PAUSE
    }
    enum KeyValueType {
        INHERIT_ACCOUNT_KEY,
        CONTRACT_ID,
        ED25519,
        SECP256K1,
        DELEGETABLE_CONTRACT_ID
    }

    constructor() {
        keyTypes[KeyType.ADMIN] = 1;
        keyTypes[KeyType.KYC] = 2;
        keyTypes[KeyType.FREEZE] = 4;
        keyTypes[KeyType.WIPE] = 8;
        keyTypes[KeyType.SUPPLY] = 16;
        keyTypes[KeyType.FEE] = 32;
        keyTypes[KeyType.PAUSE] = 64;
    }

    function getDefaultKeys() internal view returns (IHederaTokenService.TokenKey[] memory keys) {
        keys = new IHederaTokenService.TokenKey[](2);
        keys[0] = getSingleKey(KeyType.KYC, KeyValueType.CONTRACT_ID, "");
        keys[1] = IHederaTokenService.TokenKey(
            getDuplexKeyType(KeyType.SUPPLY, KeyType.PAUSE),
            getKeyValueType(KeyValueType.CONTRACT_ID, "")
        );
    }

    function getAllTypeKeys(
        KeyValueType keyValueType,
        bytes memory key
    ) internal view returns (IHederaTokenService.TokenKey[] memory keys) {
        keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = IHederaTokenService.TokenKey(getAllKeyTypes(), getKeyValueType(keyValueType, key));
    }

    function getCustomSingleTypeKeys(
        KeyType keyType,
        KeyValueType keyValueType,
        bytes memory key
    ) internal view returns (IHederaTokenService.TokenKey[] memory keys) {
        keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = IHederaTokenService.TokenKey(getKeyType(keyType), getKeyValueType(keyValueType, key));
    }

    function getCustomDuplexTypeKeys(
        KeyType firstType,
        KeyType secondType,
        KeyValueType keyValueType,
        bytes memory key
    ) internal view returns (IHederaTokenService.TokenKey[] memory keys) {
        keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = IHederaTokenService.TokenKey(
            getDuplexKeyType(firstType, secondType),
            getKeyValueType(keyValueType, key)
        );
    }

    function getSingleKey(
        KeyType keyType,
        KeyValueType keyValueType,
        bytes memory key
    ) internal view returns (IHederaTokenService.TokenKey memory tokenKey) {
        tokenKey = IHederaTokenService.TokenKey(getKeyType(keyType), getKeyValueType(keyValueType, key));
    }

    function getSingleKey(
        KeyType keyType,
        KeyValueType keyValueType,
        address key
    ) internal view returns (IHederaTokenService.TokenKey memory tokenKey) {
        tokenKey = IHederaTokenService.TokenKey(getKeyType(keyType), getKeyValueType(keyValueType, key));
    }

    function getSingleKey(
        KeyType firstType,
        KeyType secondType,
        KeyValueType keyValueType,
        bytes memory key
    ) internal view returns (IHederaTokenService.TokenKey memory tokenKey) {
        tokenKey = IHederaTokenService.TokenKey(
            getDuplexKeyType(firstType, secondType),
            getKeyValueType(keyValueType, key)
        );
    }

    function getDuplexKeyType(KeyType firstType, KeyType secondType) internal pure returns (uint256 keyType) {
        keyType = keyType.setBit(uint8(firstType));
        keyType = keyType.setBit(uint8(secondType));
    }

    function getAllKeyTypes() internal pure returns (uint256 keyType) {
        keyType = keyType.setBit(uint8(KeyType.ADMIN));
        keyType = keyType.setBit(uint8(KeyType.KYC));
        keyType = keyType.setBit(uint8(KeyType.FREEZE));
        keyType = keyType.setBit(uint8(KeyType.WIPE));
        keyType = keyType.setBit(uint8(KeyType.SUPPLY));
        keyType = keyType.setBit(uint8(KeyType.FEE));
        keyType = keyType.setBit(uint8(KeyType.PAUSE));
    }

    function getKeyType(KeyType keyType) internal view returns (uint256) {
        return keyTypes[keyType];
    }

    function getKeyValueType(
        KeyValueType keyValueType,
        bytes memory key
    ) internal view returns (IHederaTokenService.KeyValue memory keyValue) {
        if (keyValueType == KeyValueType.INHERIT_ACCOUNT_KEY) {
            keyValue.inheritAccountKey = true;
        } else if (keyValueType == KeyValueType.CONTRACT_ID) {
            keyValue.contractId = supplyContract;
        } else if (keyValueType == KeyValueType.ED25519) {
            keyValue.ed25519 = key;
        } else if (keyValueType == KeyValueType.SECP256K1) {
            keyValue.ECDSA_secp256k1 = key;
        } else if (keyValueType == KeyValueType.DELEGETABLE_CONTRACT_ID) {
            keyValue.delegatableContractId = supplyContract;
        }
    }

    function getKeyValueType(
        KeyValueType keyValueType,
        address keyAddress
    ) internal pure returns (IHederaTokenService.KeyValue memory keyValue) {
        if (keyValueType == KeyValueType.CONTRACT_ID) {
            keyValue.contractId = keyAddress;
        } else if (keyValueType == KeyValueType.DELEGETABLE_CONTRACT_ID) {
            keyValue.delegatableContractId = keyAddress;
        }
    }
}

library Bits {
    uint256 internal constant ONE = uint256(1);

    // Sets the bit at the given 'index' in 'self' to '1'.
    // Returns the modified value.
    function setBit(uint256 self, uint8 index) internal pure returns (uint256) {
        return self | (ONE << index);
    }
}


// File contracts/hedera/system/SafeCast.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;

library SafeCast {
    function toInt64(int256 value) internal pure returns (int64 downcasted) {
        downcasted = int64(value);
        require(downcasted == value, "SafeCast: value doesn't fit in 64 bits");
    }

    function toInt64(uint256 value) internal pure returns (int64) {
        // Note: Unsafe cast below is okay because `type(int64).max` is guaranteed to be positive
        require(value <= uint256(uint64(type(int64).max)), "SafeCast: value doesn't fit in an int64");
        return int64(uint64(value));
    }

    function toUint64(uint256 value) internal pure returns (uint64) {
        require(value <= type(uint64).max, "SafeCast: value doesn't fit in 64 bits");
        return uint64(value);
    }
}


// File contracts/hedera/system/SafeHederaTokenService.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2
abstract contract SafeHederaTokenService is HederaTokenService {
    using SafeCast for uint256;

    event Transfer(address indexed from, address indexed to, uint64 value);

    function safeMintToken(
        address token,
        uint256 amount,
        bytes[] memory metadata
    ) internal returns (int64 newTotalSupply, int64[] memory serialNumbers) {
        int256 responseCode;
        (responseCode, newTotalSupply, serialNumbers) = HederaTokenService.mintToken(token, amount.toInt64(), metadata);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe mint failed!");
    }

    function safeBurnToken(
        address token,
        uint256 amount,
        int64[] memory serialNumbers
    ) internal returns (int64 newTotalSupply) {
        int256 responseCode;
        (responseCode, newTotalSupply) = HederaTokenService.burnToken(token, amount.toInt64(), serialNumbers);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe burn failed!");
    }

    function safeAssociateTokens(address account, address[] memory tokens) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.associateTokens(account, tokens);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe multiple associations failed!");
    }

    function safeAssociateToken(address account, address token) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.associateToken(account, token);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe single association failed!");
    }

    function safeTransferToken(address token, address sender, address receiver, uint256 amount) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.transferToken(token, sender, receiver, amount.toInt64());
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe token transfer failed!");
    }

    function safeTransferTokenRouter(address token, address sender, address receiver, uint256 amount) internal {
        int32 responseCode;
        (responseCode) = HederaTokenService.transferTokenRouter(token, sender, receiver, amount.toInt64());
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe token transfer router failed!");
    }

    function safeApprove(address token, address spender, uint256 amount) internal {
        int responseCode;
        (responseCode) = HederaTokenService.approve(token, spender, amount);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe approve failed!");
    }
}


// File contracts/HederaERC20TokenManage.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.8;
contract HederaERC20TokenManage is SafeHederaTokenService, KeyHelper {
    using SafeCast for uint256;

    struct TokenInfo {
        string name;
        string symbol;
        address tokenAddress;
        uint256 initialSupply;
    }

    TokenInfo[] public tokens;

    function createToken(
        string memory name,
        string memory symbol,
        int32 decimal,
        uint256 initialSupply
    ) external payable returns (address) {
        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = getSingleKey(KeyType.SUPPLY, KeyValueType.CONTRACT_ID, address(this));

        IHederaTokenService.Expiry memory expiry = IHederaTokenService.Expiry({
            autoRenewAccount: address(this),
            autoRenewPeriod: 8_000_000,
            second: 0
        });
        IHederaTokenService.HederaToken memory myToken;
        myToken.name = name;
        myToken.symbol = symbol;
        myToken.treasury = address(this);
        myToken.expiry = expiry;
        myToken.tokenKeys = keys;

        (int responseCode, address _token) = HederaTokenService.createFungibleToken(
            myToken,
            initialSupply.toInt64(),
            decimal
        );

        require(responseCode == HederaResponseCodes.SUCCESS, "TOKEN_CREATION_FAILED");

        tokens.push(TokenInfo({name: name, symbol: symbol, tokenAddress: _token, initialSupply: initialSupply}));

        return _token;
    }

    function mint(uint256 tokenIndex, address account, uint256 amount) external returns (bool) {
        require(amount > 0, "MINT_AMOUNT_ZERO");
        require(tokenIndex < tokens.length, "TOKEN_INDEX_OUT_OF_BOUNDS");

        address token = tokens[tokenIndex].tokenAddress;

        safeMintToken(token, amount, new bytes[](0));
        safeTransferToken(token, address(this), account, amount);
        return true;
    }

    function getTokenInfo(
        uint256 tokenIndex
    ) external view returns (string memory name, string memory symbol, address tokenAddress, uint256 initialSupply) {
        require(tokenIndex < tokens.length, "TOKEN_INDEX_OUT_OF_BOUNDS");
        TokenInfo memory tokenInfo = tokens[tokenIndex];
        return (tokenInfo.name, tokenInfo.symbol, tokenInfo.tokenAddress, tokenInfo.initialSupply);
    }

    function tokenAssociate(uint256 tokenIndex) external {
        TokenInfo memory tokenInfo = tokens[tokenIndex];
        safeAssociateToken(address(this), tokenInfo.tokenAddress);
    }
}
