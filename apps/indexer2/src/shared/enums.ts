export enum ScheduleType {
    SEED = 'seed',
    PRIVATE = 'private',
}

export enum ScheduleStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    FINISHED = 'finished',
    FAILED = 'failed',
}

export enum TransactionStatus {
    SENT = 'sent',
    FAILED = 'failed',
    SUCCEEDED = 'succeeded',
}

export enum HotWalletStatus {
    COMPLETED = "completed",
    FAILED = "failed",
}

export enum Currency {
    BIV = "biv",
    WBIV = "wbiv",
    ETH = "eth",
}

export enum WEBHOOK_TYPE {
    TRANSFER = "transfer",
    TXCHANGED = "tx_changed",
    COMMON = "common",
}

export enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAWAL_NORMAL = "withdrawal_normal",
    WITHDRAWAL_COLD = "withdrawal_cold",
    SEED = "seed",
    COLLECT = "collect",
    WITHDRAWAL_COLLECT = "withdrawal_collect",
}

export enum WithdrawalStatus {
    INVALID = "invalid",
    UNSIGNED = "unsigned",
    SIGNING = "signing",
    SIGNED = "signed",
    SENT = "sent",
    COMPLETED = "completed",
    FAILED = "failed",
}

export enum PendingWithdrawalStatus {
    UNSIGNED = "unsigned",
    SIGNING = "signing",
    SIGNED = "signed",
    SENT = "sent",
}

export enum WithdrawOutType {
    WITHDRAW_OUT_COLD_SUFFIX = "_cold_withdrawal",
    WITHDRAW_OUT_NORMAL = "normal",
    EXPLICIT_FROM_HOT_WALLET = "explicit_from_hot_wallet",
    EXPLICIT_FROM_DEPOSIT_ADDRESS = "explicit_from_deposit_address",
    AUTO_COLLECTED_FROM_DEPOSIT_ADDRESS = "auto_collected_from_deposit_address",
}

export enum WalletEvent {
    CREATED = "created",
    DEPOSIT = "deposit",
    WITHDRAW_REQUEST = "withdraw_request",
    WITHDRAW_COMPLETED = "withdraw_completed",
    WITHDRAW_FAILED = "withdraw_failed",
    WITHDRAW_FEE = "withdraw_fee",
    WITHDRAW_ACCEPTED = "withdraw_accepted",
    WITHDRAW_DECLINED = "withdraw_declined",
    COLLECT_FEE = "collect_fee",
    COLLECT_AMOUNT = "collect_amount",
    COLLECTED_FAIL = "collected_fail",
    COLLECTED = "collected",
    SEEDED_FAIL = "seeded_fail",
    SEEDED = "seeded",
    SEED_FEE = "seed_fee",
    SEED_AMOUNT = "seed_amount",
}

export enum CollectStatus {
    UNCOLLECTED = "uncollected",
    COLLECTING_FORWARDING = "forwarding",
    COLLECTING = "collecting",
    COLLECT_SIGNED = "collect_signed",
    COLLECT_SENT = "collect_sent",
    COLLECTED = "collected",
    NOTCOLLECT = "notcollect",
    SEED_REQUESTED = "seed_requested",
    SEEDING = "seeding",
    SEED_SIGNED = "seed_signed",
    SEED_SENT = "seed_sent",
    SEEDED = "seeded",
}

export enum HotWalletType {
    NORMAL = "normal",
    SEED = "seed",
}

export enum SortBy {
    UPDATED_AT = "updatedAt",
    AMOUNT = "amount",
}

export enum SortType {
    SortTypeASC = "asc",
    SortTypeDESC = "desc",
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    REQUEST = "request",
}

export enum UserType {
    WALLET = "wallet",
    EMAIL = "email",
}

export enum CollectionStatus {
    REQUEST = "request",
    LISTED = "listed",
    DELISTED = "delisted",
}

export enum GAMESTATUS {
    INACTIVE = "inactive",
    ACTIVE = "active",
}

export enum CollectionType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155",
}

export enum CollectionSyncStatus {
    SYNCED = "synced",
    SYNCING = "syncing",
}

export enum NftStatus {
    LISTED = "listed",
    SALE = "sale",
    AUCTION = "auction",
    LOOTBOX = "lootbox",
    CENSORED = "censored",
}

export enum BannerStatus {
    ACTIVE = "active",
    INACTIVE = "in-active",
}

export enum OnchainStatus {
    CONFIRMING = "confirming",
    CONFIRMED = "confirmed",
}

export enum ConfigObjectType {
    NFT = "nft",
    AUCTION = "auction",
    LOOTBOX = "lootbox",
}

export enum AuctionStatus {
    NEW = "new",
    INPROGRESS = "inprogress",
    END_SUCCESS = "end_success",
    END_NO_BID = "end_no_bid",
    CANCELED = "canceled",
    RE_CLAIMED = "reclaimed",
    CLAIMED = "claimed",
}

export enum LootBoxType {
    GENERAL = "general",
    WHITELISTED = "whitelisted",
}

export enum LootBoxStatus {
    ACTIVE = 1,
    CANCELED = 0,
}
export enum LootBoxDisplayStatus {
    DRAFT = 'draft',
    NOT_DEPOSITED = 'not_deposited',
    NEW = 'new',
    ACTIVE = 'active',
    CANCELED = 'canceled',
    EXPIRED = 'expired',
    OUT_OF_NFT = 'out_of_nft',
}

export enum AdminType {
    ADMIN = 1,
    PARTNERSHIP = 2,
}

export enum AdminStatus {
    ACTIVE = 1,
    FREEZED = 2,
}

export enum RarityNftOnchainStatus {
    SYNCED = 1,
    NOT_SYNCED = 0,
}

export enum FolderImageS3 {
    COLLECTION = 'collections',
    BANNER_SLIDE = 'slide-banner',
    FAQ = 'faq',
    LOOT_BOX = 'loot-box',
    USERS = 'users',
}

export enum TransactionRequestStatus {
    PENDING = "pending", // waiting for worker handle
    PROCESSING = "processing", // worker is handling, decreased offchain || onchain balance sent to game server
    PROCESSED = "processed", // worker has handled, decreased offchain balance || decreased onchain balance succeeded
    CONSTRUCTED = "constructed", // worker has constructed transaction
    SENT = "sent", // worker has sent to game server
    SUCCEEDED = "succeeded", // transaction succeeded
    FAILED = "failed", // transaction failed
    WILL_NOT_PROCEED = "will not proceed", // user that not register on game server but still deposit token in exchange token
}

export enum TransactionItemStatus {
    PENDING = "pending", // waiting for worker handle
    PROCESSING = "processing", // worker is handling, exchange item request send to game server
    SUCCEEDED = "succeeded", // transaction succeeded
}

export enum TransactionOnchainStatus {
    UNSIGNED = "unsigned", // construct transaction and unsigned tx
    SIGNED = "signed", // signed tx
    SENT = "sent", // transaction has been sent to blockchain
    SUCCEEDED = "succeeded", // transaction succeeded
    FAILED = "failed", // transaction failed
    UNKNOWN = "unknown", // transaction status is unknown when deposit create by api

}

export enum TransactionRequestType {
    ON_TO_OFF = "on_to_off", // onchain to offchain
    OFF_TO_ON = "off_to_on", // offchain to onchain
    EXCHANGE_ITEM = "exchange_item", // exchange item
}

export enum TransactionOnchainType {
    DEPOSIT = "deposit", // deposit onchain zenny of user to smart contract
    UNLOCKED = "unlocked", // withdraw onchain zenny for user from smart contract
    EXCHANGE_ITEM = "exchange_item", // exchange item onchain
}

export enum GameServerApiUrls {
    GET_BALANCE = "/api/v1/wallet/get-balance",
    DECREASE_OFFCHAIN_BALANCE = "/api/v1/wallet/decrease-offchain",
    INCREASE_OFFCHAIN_BALANCE = "/api/v1/wallet/increase-offchain",
    VERIFY_REQUEST = "/api/v1/wallet/verify-request",
}

export enum VerifyRequestStatus {
    UNKNOWN = "unknown",
    PROCESSING = "processing",
    ERROR = "error",
    SUCCESS = "success",
}

export enum VerifyErrorCode {
    APIKEY_INVALID = "APIKEY_INVALID",
    DATA_INVALID = "DATA_INVALID",
    VERIFICATION_FAILED = "VERIFICATION_FAILED",
    SEQUENCE_ID_DUPLICATE = "SEQUENCE_ID_DUPLICATE",
    VERSION_IS_NOT_LATEST = "VERSION_IS_NOT_LATEST",
    ESTIMATE_TYPE_INVALID = "ESTIMATE_TYPE_INVALID",
    USER_ID_NOT_EXIST = "USER_ID_NOT_EXIST",
}

export enum SocketNotificationType {
    TRANSACTION_NOTI = "transaction_noti",
}


export enum SocketEvents {
    INSUFFICIENT_BALANCE = "insufficient_balance",
    TRANSACTION_SUCCESSFULLY = "transaction_successfully",
    TRANSACTION_FAILED = "transaction_failed",
}

export enum TokenStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    REQUEST = "request",
}

export enum ItemConfigStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    REQUEST = "request",
}

export enum TransactionTag {
    IN_GM_SYSTEM = "in_gm_system",
    OUT_GM_SYSTEM = "out_gm_system",
}