import React, { useEffect, useState } from 'react';
import { useWeb3Auth } from "../services/web3auth";
import {
  HStack,
  Button,
  Box, VStack, Text,
  Input,
  Checkbox,
  SliderTrack
} from '@chakra-ui/react'
import { ethers, BigNumber } from 'ethers';
//@ts-ignore
import LitJsSdk from 'lit-js-sdk'
import { toString as uint8arrayToString } from "uint8arrays/to-string";
import { fromString as uint8arrayFromString } from "uint8arrays/from-string";
import a from '../../../../packages/hardhat-ts/hardhat_contracts.json'
const Main = () => {
  const { provider, login, logout, getAccounts, getBalance } = useWeb3Auth();
  const [cond, setCond] = useState(true)
  const [abi, setAbi] = useState({})
  const [contractAddress, setContractAddress] = useState('')
  const [chain, setChain] = useState('')
  const [stringToBeEncrypted, setStringToBeEncrypted] = useState('write a string that you want to hide with lit protocol')
  const [strEncrypted, setStrEncrypted] = useState('')
  const [symEncrypted, setSymEncrypted] = useState('')
  useEffect(() => {
    console.log('ether provider changed')
    async function init() {
      const p: any = await provider?.getEthersProvider()
      console.log('ether provider changed ')
      if (p) {
        const { chainId } = await p.getNetwork()
        console.log('chainid', chainId)
        if (chainId == 31337) {
          setAbi(a['31337'].localhost.contracts.LitConditionExample.abi)
          setContractAddress(a['31337'].localhost.contracts.LitConditionExample.address)
          setChain('hardhat')
        }
        if (chainId == 80001) {
          setAbi(a['80001'].mumbai.contracts.LitConditionExample.abi)
          setContractAddress(a['80001'].mumbai.contracts.LitConditionExample.address)
          setChain('mumbai')
        }
      }
      //INIT LIT CLIENT
      const client = new LitJsSdk.LitNodeClient()
      await client.connect()
      //@ts-ignore
      window.litNodeClient = client
    }
    init()
  }, [provider?.getEthersProvider()])
  const getFlagFun = async () => {
    try {
      const p: any = await provider?.getEthersProvider()
      const signer = p.getSigner();
      //@ts-ignore
      const c = new ethers.Contract(contractAddress, abi, signer)
      if (p.getCode(contractAddress)) {
        const res = await c.getFlag();
        alert(String(res))
        setCond(res)
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function getNetworkNameFun() {
    const nn = await provider?.getNetworkName()
    return alert(nn)
  }
  async function setConditionFun() {
    try {
      const p: any = await provider?.getEthersProvider()
      const signer = p.getSigner();
      //@ts-ignore
      const c = new ethers.Contract(contractAddress, abi, signer)
      console.log('set ', cond)
      if (p.getCode(contractAddress)) {
        const res = await c.setCondition(cond);
        console.log(res)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSelectedCond = () => {
    setCond(!cond)
  }
  const handleStr = (e: any) => {
    setStringToBeEncrypted(e.target.value)
  }
  async function encrypt() {
    try {
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain })
      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        stringToBeEncrypted
      );
      console.log('encryptedString', encryptedString)
      console.log('symmetricKey', symmetricKey)
      const encryptedStringBase64 = uint8arrayToString(
        new Uint8Array(await encryptedString.arrayBuffer()),
        "base64"
      );
      setStrEncrypted(encryptedStringBase64)
      console.log('encryptedStringBase64', encryptedStringBase64)
      const evmContractConditions =
        [
          {
            contractAddress: contractAddress,
            functionName: "getFlag",
            functionParams: [],
            functionAbi: {
              "inputs": [],
              "name": "getFlag",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            chain: chain,
            returnValueTest: {
              key: "",
              comparator: "=",
              value: "true",
            },
          },
        ];
      //@ts-ignore
      const encSymmetricKey = await window.litNodeClient.saveEncryptionKey({
        evmContractConditions,
        symmetricKey,
        authSig,
        chain,
      });
      console.log(encSymmetricKey)
      const encSymmetricStringBase64 = uint8arrayToString(
        encSymmetricKey,
        "base64"
      );
      console.log('encSymmetricStringBase64', encSymmetricStringBase64)
      setSymEncrypted(encSymmetricStringBase64)
    } catch (e: any) { alert(e.message) }
  }
  async function decrypt() {
    try {
      const evmContractConditions =
        [
          {
            contractAddress: contractAddress,
            functionName: "getFlag",
            functionParams: [],
            functionAbi: {
              "inputs": [],
              "name": "getFlag",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            chain: chain,
            returnValueTest: {
              key: "",
              comparator: "=",
              value: "true",
            },
          },
        ];
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain })
      const check = uint8arrayFromString(
        symEncrypted,
        "base64"
      );
      //@ts-ignore
      const symmetricKey = await window.litNodeClient.getEncryptionKey({
        evmContractConditions,
        // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
        toDecrypt: LitJsSdk.uint8arrayToString(check, "base16"),
        chain,
        authSig
      })
      const arrayBuffer = uint8arrayFromString(
        strEncrypted,
        "base64"
      ).buffer;
      const blob = new Blob([arrayBuffer])
      const decryptedString = await LitJsSdk.decryptString(
        blob,
        symmetricKey
      );
      alert(decryptedString)
      alert('try setting the condition to false  to see that the decrypting authorization condition changed')
    } catch (e: any) {
      alert(e.message)
      alert('if you saw some message error from lit protocol, it means that you should set the condition to true')
    }
  }
  const loggedInView = (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p='2'
    >
      <Button m='2' onClick={getFlagFun} >
        get condition
      </Button>
      <HStack>
        <Checkbox
          checked={cond}
          onChange={handleSelectedCond}
        >
          click
        </Checkbox>
        <Button m='2' onClick={setConditionFun} >
          set autorization to  (   {String(cond)} )
        </Button>
      </HStack>
      <VStack m='2' p='2'>
        <Input htmlSize={4} width='400px' onChange={handleStr} placeholder={stringToBeEncrypted} />
        <Button onClick={encrypt}>
          encrypt() into chain {chain}
        </Button>
        <Button onClick={decrypt}>
          decrypt() into chain  {chain}
        </Button>
        <Text>{stringToBeEncrypted}</Text>
        <HStack>
          <Text>Encrypted String : </Text>
          <Text w='400px'>{strEncrypted}</Text>
        </HStack>
        <HStack>
          <Text>Encrypted symmetric key:</Text>
          <Text w='400px'>{symEncrypted}</Text>
        </HStack>
      </VStack>
    </Box>
  );
  const unloggedInView = (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p='2'
    >
      <Text>Click  login to start encrypting and decrypting with Lit Protocol </Text>
    </Box>
  );
  return <div>{provider ? loggedInView : unloggedInView}</div>;
};
export default Main;
