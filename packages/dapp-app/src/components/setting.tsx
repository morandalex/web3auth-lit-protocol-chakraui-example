import React, { useState, useEffect } from 'react'
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK, WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { Image, Text, HStack, Button, Box, Select } from "@chakra-ui/react";
import { Web3AuthContext } from "../services/web3auth";
import { useContext } from "react";
import { ethers } from 'ethers'
import { useWeb3Auth } from "../services/web3auth";
interface IProps {
  setNetwork: Dispatch<SetStateAction<WEB3AUTH_NETWORK_TYPE>>;
  setChain: Dispatch<SetStateAction<CHAIN_CONFIG_TYPE>>;
}
const Setting = ({ setNetwork, setChain }: IProps) => {
  const [account, setAccount] = useState('')
  const { login, logout, getAccounts, getBalance } = useWeb3Auth();
  const networkChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Settings", e.target.value);
    setNetwork(e.target.value as WEB3AUTH_NETWORK_TYPE);
  };
  const chainChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Settings", e.target.value);
    setChain(e.target.value as CHAIN_CONFIG_TYPE);
  };
  const [net, setNet] = React.useState('');
  const { provider } = useContext(Web3AuthContext);
  const isLoggedIn = provider !== null;
  return (
    <Box

      flexDirection='row'
      display="flex" justifyContent="space-around" alignItems="center"
      bg='green.100'
      p='1'
    >
      <HStack>
        <Text>Encrypt with </Text>
        <Image h='30px' src='https://litprotocol.com/lit-logo.png'></Image>
      </HStack>
      <HStack>
        <Select w='200px' bg='gray.100' onChange={chainChangeHandler} disabled={isLoggedIn}>
          {Object.keys(CHAIN_CONFIG).map((x: string) => {
            return (
              <option key={x} value={x}>
                {!isLoggedIn ? CHAIN_CONFIG[x as CHAIN_CONFIG_TYPE].displayName : 'connected'}
              </option>
            );
          })}
        </Select>
        {
          isLoggedIn ? (<>
            <Button bg='gray.100' m='2' onClick={logout} >
              Log Out
            </Button>
          </>
          ) : (
            <Button bg='gray.100' m='2' onClick={login} >
              Login
            </Button>
          )
        }
      </HStack>
    </Box>
  );
};
export default Setting;
