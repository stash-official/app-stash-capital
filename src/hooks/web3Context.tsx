import React, {
  useState,
  ReactElement,
  useContext,
  useMemo,
  useCallback,
} from "react";
import Web3Modal from "web3modal";
import {
  StaticJsonRpcProvider,
  JsonRpcProvider,
  Web3Provider,
} from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import {
  AVAX_CHAINID,
  REACT_APP_BLOCK_EXPLORER,
  REACT_APP_RPC,
} from "src/constant/network";
import { ethers } from "ethers";

const isIframe = () => {
  return window.location !== window.parent.location;
};
const clearStorage = () => {
  try {
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
  } catch (err) {}
};
/*
  Types
*/
type onChainProvider = {
  connect: () => Promise<any>;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  chainID: number;
  provider: JsonRpcProvider;
  address: string;
  connected: Boolean;
  web3Modal: Web3Modal;
};

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  const { onChainProvider } = web3Context;
  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [web3Context]);
};

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [connected, setConnected] = useState(false);
  // NOTE (appleseed): if you are testing on rinkeby you need to set chainId === 4 as the default for non-connected wallet testing...
  // ... you also need to set getTestnetURI() as the default uri state below
  const [chainID, setChainID] = useState(AVAX_CHAINID);
  const [address, setAddress] = useState("");

  const [uri, setUri] = useState(REACT_APP_RPC);

  const [provider, setProvider] = useState<JsonRpcProvider>(
    new StaticJsonRpcProvider(uri)
  );

  const [web3Modal, setWeb3Modal] = useState<Web3Modal>(
    new Web3Modal({
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              [chainID]: uri,
            },
            chainId: AVAX_CHAINID,
          },
        },
      },
    })
  );

  const hasCachedProvider = (): boolean => {
    if (!web3Modal) return false;
    if (!web3Modal.cachedProvider) return false;
    return true;
  };

  // NOTE (appleseed): none of these listeners are needed for Backend API Providers
  // ... so I changed these listeners so that they only apply to walletProviders, eliminating
  // ... polling to the backend providers for network changes
  const _initListeners = useCallback(
    (rawProvider: any) => {
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on("accountsChanged", async (accounts: string[]) => {
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("chainChanged", async (chain: number) => {
        _checkNetwork(chain);
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("network", (_newNetwork: any, oldNetwork: any) => {
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [provider]
  );

  const _checkNetwork = (otherChainID: number): Boolean => {
    if (
      parseInt(chainID.toString(), 10) !== parseInt(otherChainID.toString(), 10)
    ) {
      return false;
    }
    return true;
  };
  // connect - only runs for WalletProviders
  const connect = useCallback(async () => {
    // handling Ledger Live;
    let rawProvider;
    if (isIframe()) {
      rawProvider = new IFrameEthereumProvider();
    } else {
      rawProvider = await web3Modal.connect();
    }

    // new _initListeners implementation matches Web3Modal Docs
    // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
    _initListeners(rawProvider);
    const connectedProvider = new Web3Provider(rawProvider, "any");
    const chainId = await connectedProvider
      .getNetwork()
      .then((network) => network.chainId);
    const connectedAddress = await connectedProvider.getSigner().getAddress();

    // Save everything after we've validated the right network.
    // Eventually we'll be fine without doing network validations.
    setAddress(connectedAddress);
    setProvider(connectedProvider);

    // Keep this at the bottom of the method, to ensure any repaints have the data we need
    setConnected(true);

    return connectedProvider;
  }, [provider, web3Modal, connected]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();

    clearStorage();
    setConnected(false);

    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [web3Modal]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      address,
      chainID,
      web3Modal,
      uri,
    }),
    [
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      address,
      chainID,
      web3Modal,
      uri,
    ]
  );

  const setupNetwork = async (chainId: number) => {
    const provider = window.ethereum;
    if (provider) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.utils.hexlify(AVAX_CHAINID),
              chainName: `Avalanche C Chain ${
                AVAX_CHAINID === 43114 ? "mainnet" : "testnet"
              }`,
              nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
              },
              rpcUrls: [uri],
              blockExplorerUrls: [REACT_APP_BLOCK_EXPLORER],
            },
          ],
        });
      } catch (error) {
        clearStorage();
        console.error("Wrong network, please switch to mainnet");
      }
    } else {
      clearStorage();
      console.error("Wrong network, please switch to mainnet");
    }
  };

  return (
    <Web3Context.Provider value={{ onChainProvider }}>
      {children}
    </Web3Context.Provider>
  );
};
