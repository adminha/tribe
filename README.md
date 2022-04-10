<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# NestJS Backend for Tribe

A simple api service which will serve the [frontend built with react](https://github.com/adminha/tribe-frontend)

Here we have 6 main logics and services:

- Authentication & Authorization (using Jwt)
- Generating ethereum wallets
- Self-adding ethereum wallets
- Guest & member access token (tribe) generating
- User registration (both in here at NestJS backend & tribe platform) & login
- Sending rewards (Tribe Token Reward) to user's wallet on Like & comment reaction



# 1. Usage
## 1.1. Default config (Recommended)

If you don't want to change anything, you can just create a database & provide the credentials in `ormconfig.json` file, you don't need to change anything else & you can use the default values provided in `.env` file here in this repository.

## 1.2. Configuring with your own credentials

First of all you should create a test database & define the connection parameters & credentials in `ormconfig.json` file.

After that, please go to `.env` file and change the variable values as well.

In the `.env` file there are three variables beginning with `ETHEREUM_`, please refer to section `1.2.1` for more details.

### 1.2.1. Ethereum smart contract & wallet credentials

Again, I highly recommend to use the default config as mentioned in section `1.1`, But if you prefer to use your own smart contract or generate a new token, you can use the `tribetoken.sol` file provided here in this repository.

It contains a simple smart contract written in `Solidity` language for generating a token named `Tribe Reward Token` with `TRT` as the symbol.

In order to use it, you should first install `MetaMask` extension, then after executing the contract & approving the transaction in metamask, a new contract with the new token you configured will be generated. Then, you should provide the smart contract address & your wallet public/private keys in the `.env` file.

*You can use Ethereum's Ropsten test network and get some test ETH tokens from free faucets*

# 2. Installation & Running

There are two main steps here.

### 2.1.1. Installation

```bash 
npm install
```

### 2.1.2. Seeding the database

```bash 
npm run seed:run
```

This command will seed the database with two base users:

- Username: mostafa, password: 123
- Username: siavash, password: 123

You can use these users in order to login in the frontend built with react.

Btw, if you want, you can also register as a new user in the frontend, which will generate two users:

1. A user will be created in Tribe Community
2. Same user will be created in the database you provided here for NestJS

## 2.2. Running the project

```bash
nest start --watch
```
If you don't want to change anything and see the results in realtime, you can ignore `--watch` part.