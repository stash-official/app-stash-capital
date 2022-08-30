import { useEffect } from "react";
import { FETCH_ALL_DATA_INTERVAL } from "src/constant";
import { getAccountInfo } from "src/shared/services/helper";
import { AppState } from "src/shared/type/State/app";
import { fetchAccountData } from "src/state/account";
import { useAppDispatch, useAppSelector } from "src/state/store";
import { useWeb3Context } from "./web3Context";

export const useAccountData = () => {
  const { address } = useWeb3Context();
  const dispatch = useAppDispatch();

  const {
    timeNextRebase
  }: AppState = useAppSelector((state) => state.app);


  useEffect(() => {
    if (!address) return;

    const fetch = async () => {
      await dispatch(fetchAccountData(address));
    }
    fetch();
    const interval = setInterval(fetch, FETCH_ALL_DATA_INTERVAL);

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, address]);

  useEffect(() => {
    if (!address) return;

    if (timeNextRebase) {
      dispatch(fetchAccountData(address));
    }
  }, [address]);

}