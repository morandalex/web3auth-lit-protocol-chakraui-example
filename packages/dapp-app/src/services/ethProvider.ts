import React from 'react'
import { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";
import { IWalletProvider } from "./walletProvider";
import { timeStamp } from "console";
import { ethers, BigNumber } from 'ethers';
//@ts-ignore
import LitJsSdk from 'lit-js-sdk'

const client = async () => {
  const client = new LitJsSdk.LitNodeClient()
  await client.connect()
  //@ts-ignore
  window.litNodeClient = client

  return client
}



const ethProvider = (provider: SafeEventEmitterProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {


  const getAccounts = async () => {
    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();
      console.log("Eth accounts", accounts);
    } catch (error) {
      console.error("Error", error);
      console.log("error", error);
    }
  };

  const getBalance = async () => {
    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log("Eth balance", balance);
    } catch (error) {
      console.error("Error", error);
      console.log("error", error);
    }
  };


  const getNetworkName = async () => {
    try {

      const p: any = new ethers.providers.Web3Provider(provider as any)

      const { chainId } = await p.getNetwork()
      // 42

      let chain;
      if (chainId == '80001') {
        chain = 'mumbai'
      } else
        if (chainId == '137') {
          chain = 'polygon'
        } else {
          chain = chainId
        }
      //  console.log(chainId,chain)
      return chain

    } catch (error) {
      console.log("error", error);

    }
    return ''
  };

  const getEthersProvider = async () => {
    let ethersProvider;
    try {

      ethersProvider = new ethers.providers.Web3Provider(provider as any)


    } catch (error) {
      console.log("error", error);

    }

    return ethersProvider;
  }
  return { getAccounts, getBalance, getNetworkName, getEthersProvider };
};

export default ethProvider;
