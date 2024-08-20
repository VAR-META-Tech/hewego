# Hedera Hackathon Monorepos

## Description
The ```Hewego``` project is an application designed for issuing bonds on the Hedera blockchain. The project's repository includes multiple components, such as the server, website, indexer, and smart contract resources, all necessary for the deployment and operation of the bond issuance platform on Hedera.

## Techstack
- Database: ``PostgresSQL``
- Frontend: ``NextJS``
- API, Indexer: ``NestJS``
- SmartContract: ``Solidity``
## Prerequisite
- You must install Node version 18 or newer. To run stable application, we recommend using node version ``18 -> 22``.

## Env
Before starting the app you would need to setup env variables. To do so first go to the root ``apps`` dir of monorepo and copy all .env.example in each sub folder to ``.env`` file equivalently.
## Installation
```bash
$ npm install -g pnpm
$ pnpm install
```

## Build
```bash
$ pnpm run build
```

## Running

```bash
# development
$ pnpm run dev
```
## Smart Contract
```bash
$ cd packages/smart-contract
$ cp .env.example .env
$ yarn install 

# Run job task
$ npx hardhat run ./scripts/jobs.ts --network testnet

# Deploy contract
$ npx hardhat run ./scripts/ez_implement.ts --network testnet
```

## Stay in touch
- Website - [https://www.var-meta.com/](https://www.var-meta.com/)
