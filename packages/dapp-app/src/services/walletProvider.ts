import { SafeEventEmitterProvider } from "@web3auth/base";
import ethProvider from "./ethProvider";


export interface IWalletProvider {

  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
  getNetworkName: () => Promise<string>;
  getEthersProvider: () => Promise<any>;
}

export const getWalletProvider = (chain: string, provider: SafeEventEmitterProvider, uiConsole: any): IWalletProvider => {

  return ethProvider(provider, uiConsole);
};
