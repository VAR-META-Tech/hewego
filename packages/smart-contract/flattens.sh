# Function to compile and flatten a contract
# https://verify.hashscan.io/#/verifier
compile_and_flatten() {
  local contract_name=$1
  local contract_path=$2
  local output_dir=$3

  mkdir -p $output_dir
  npx hardhat flatten $contract_path > $output_dir/${contract_name}_flatten.sol
  solc --bin --abi --metadata --overwrite --via-ir --optimize --optimize-runs 200 -o $output_dir $output_dir/${contract_name}_flatten.sol
}

# Flatten and compile ERC20Token contract
compile_and_flatten "ERC20Token" "./contracts/tokens/ERC20Token.sol" "./contract-flattens/tokens/ERC20Token"

# Flatten and compile PriceFeed contract
compile_and_flatten "PriceFeed" "./contracts/PriceFeed.sol" "./contract-flattens/PriceFeed"

# Flatten and compile BondIssuance contract
compile_and_flatten "BondIssuance" "./contracts/BondIssuance.sol" "./contract-flattens/BondIssuance"

# Flatten and compile BondERC1155Token contract
compile_and_flatten "BondERC1155Token" "./contracts/BondERC1155Token.sol" "./contract-flattens/BondERC1155Token"

# Flatten and compile HederaCustomTokenService contract
compile_and_flatten "HederaCustomTokenService" "./contracts/HederaCustomTokenService.sol" "./contract-flattens/HederaCustomTokenService"

# Flatten and compile HederaERC20TokenManage contract
compile_and_flatten "HederaERC20TokenManage" "./contracts/HederaERC20TokenManage.sol" "./contract-flattens/HederaERC20TokenManage"