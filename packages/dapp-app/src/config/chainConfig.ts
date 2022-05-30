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
