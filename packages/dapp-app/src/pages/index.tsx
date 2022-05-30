import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Main from "../components/main";
import { CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { Web3AuthProvider } from "../services/web3auth";
import Setting from "../components/setting";
import { Heading } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'
import a from '../../../../packages/hardhat-ts/hardhat_contracts.json'
const Home: NextPage = () => {
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("mumbai");
  return (
    <ChakraProvider>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <Setting setNetwork={setWeb3AuthNetwork} setChain={setChain} />
        <Main />
      </Web3AuthProvider>
    </ChakraProvider>
  );
};
export default Home;
