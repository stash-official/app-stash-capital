import BigNumber from "bignumber.js";
import { useEffect, useState } from "react"
import { FETCH_BALANCE_INTERVAL } from "src/constant";
import { getBalanceOf } from "src/shared/services/infura";
import { Token } from "src/shared/type/token";
import { useWeb3Context } from "./web3Context";

export const useTokenBalance: (token: Token) => BigNumber = (token) => {
  const { address } = useWeb3Context();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!address) {
      setBalance(null)
      return;
    }

    const fetch = async () => {
      const balance = await getBalanceOf(token, address);
      setBalance(balance);
    }

    fetch();

    const interval = setInterval(fetch, FETCH_BALANCE_INTERVAL)
    return () => { clearInterval(interval) }
  }, [address])

  return address ? balance : new BigNumber(0);
}