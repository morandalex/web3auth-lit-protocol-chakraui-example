# Encrypt strings with Lit protocol 

A user write a string that he wants to encrypt.

Then the user get an encrypted string and an encrypted symmetric key.

If the condition getFlag is true then the user can decrypt.

Check the working app ( injected wallet advised ) here:
https://web3auth-lit-protocol-chakraui-example.vercel.app/
![Peek 30-05-2022 10-26](https://user-images.githubusercontent.com/9484568/170951717-cafe9aaf-a1dd-47cf-963d-30d2066d3798.gif)

## A sauce with 

* A true/false solidity contract condition deployed on mumbai
* Lit protocol sdk to encrypt and decrypt a string defined by the connected user
* Web3auth to manage the wallet 
* Chakraui to scaffold the frontend

## Install dependencies

Create .env variables where needed, then install all dependencies

    yarn bootstrap 

### Getting started with hardhat 

Start a local hardhat development chain:

    yarn hhChain 

Compile the contract:

    yarn hhCompile 

Deploy on hardhat_contract.json the abi and contract address of localhost:

    yarn hhDeploy --network localhost 


If you want to deploy on polygon you should config hardhat.config.json putting your private key, and then deploy:
 
    yarn hhDeploy --network mumbai 

or

    yarn hhDeploy --network mumbai 


### Getting started with chakraui frontend

Go to web3auth dashboard , create a project id and paste it on *web3auth.tsx* file.

Then whitelist localhost:3000 or your domain.

Then start the dapp working on localhost:3000 :

    yarn dpDev 

If you deployed on more chains , config the *chainConfig.ts* accordingly.

    import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
    import { utils } from 'ethers';
    export const CHAIN_CONFIG = {
    /*polygon: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: "https://polygon-rpc.com",
        blockExplorer: "https://polygonscan.com/",
        chainId: "0x89",
        displayName: "Polygon Mainnet",
        ticker: "matic",
        tickerName: "Matic",
    } as CustomChainConfig,*/
    mumbai: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: "https://polygon-mumbai.g.alchemy.com/v2/OVjPtuRy5EMyS13W7iTVcaH2tVZkmwV2",
        blockExplorer: "https://mumbai.polygonscan.com/",
        chainId: utils.hexValue(80001),
        displayName: "Mumbai",
        ticker: "matic",
        tickerName: "Matic",
    } as CustomChainConfig,
    /*hardhat: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: "http://127.0.0.1:8545/",
        blockExplorer: "",
        chainId: utils.hexValue(31337),
        displayName: "Hardhat",
        ticker: "eth",
        tickerName: "Eth",
    } as CustomChainConfig,*/
    } as const;
    export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;

