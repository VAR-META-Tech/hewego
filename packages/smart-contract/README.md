# Hedera hackathon contract

## Before all
 ```script
 cd packages/smart-contract
 ```
 
## To deploy (Skip it if you use our contracts)
```script
./flattens.sh
npx hardhat run ./scripts/ez_implement.ts --network testnet
```


## To run job
```script
yarn install
npx hardhat run ./scripts/jobs.ts --network testnet
```
