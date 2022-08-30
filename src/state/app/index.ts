import BigNumber from "bignumber.js";
import { createSlice } from "@reduxjs/toolkit";
import { initialAppState } from "./detailsState";
import {
  getTimeRebase,
  getBalanceOf,
  getTotalSupply,
  getBackingLiquidity,
  getPoolValueInAvax,
  getStashInsuaranceFund,
  getMarketCapInAvax,
  getStashPriceInAvax,
  getNextRewardYield,
  getAvaxBalance,
} from "src/shared/services/infura";
import { tokens } from "src/constant/token";
import { contractAddresses } from "src/constant/address";
import { waitingAllRequest, getAddress } from "src/utils";
import { AppState } from "src/shared/type/State/app";
import { getAVAXPrice } from "src/shared/services/helper";

const initialState: AppState = initialAppState;

export const fetchDataContract = () => async (dispatch: any) => {
  const results = await waitingAllRequest([
    getTimeRebase(),
    getBalanceOf(tokens.stash, getAddress(contractAddresses.treasury)),
    getTotalSupply(tokens.stash),
    getBalanceOf(tokens.stash, getAddress(contractAddresses.burn)),
    getMarketCapInAvax(),
    getPoolValueInAvax(),
    getStashInsuaranceFund(),
    getAVAXPrice(),
    getStashPriceInAvax(),
    getNextRewardYield(),
    getAvaxBalance(),
  ]);

  const timeRebase = results[0];
  const treasuryBalance = results[1];
  const totalSupply: BigNumber = results[2];
  const stashBurned: BigNumber = results[3];
  const marketCap = results[4];
  const poolValue = results[5];
  const stashInsuaranceFund = results[6];
  const avaxPrice = results[7];
  const stashPrice = results[8];
  const nextRewardYield = results[9];
  const treasuryBalanceAvax = results[10];

  dispatch(
    setDataContract({
      stashBurned,
      treasuryBalance,
      timeNextRebase: timeRebase.nextRebaseTime,
      timeLastRebase: timeRebase.lastRebaseTime,
      totalSupply: totalSupply.minus(stashBurned),
      nextRewardYield,
      poolValue,
      stashInsuaranceFund,
      marketCap,
      avaxPrice,
      stashPrice,
      treasuryBalanceAvax,
    })
  );
};

export const fetchLastTimeRebase = () => async (dispatch: any) => {
  const timeRebase = await getTimeRebase();
  dispatch(
    setTimeNextRebase({
      timeNextRebase: timeRebase.nextRebaseTime,
      timeLastRebase: timeRebase.lastRebaseTime,
    })
  );
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDataContract: (state, action) => {
      const payload = action?.payload || {};

      const stashInsuaranceFund: BigNumber =
        payload?.stashInsuaranceFund || new BigNumber(0);
      const treasuryBalance: BigNumber =
        payload?.treasuryBalance || new BigNumber(0);
      const stashBurned: BigNumber = payload?.stashBurned || new BigNumber(0);
      const totalSupply: BigNumber = payload?.totalSupply || new BigNumber(0);
      const nextRewardYield: number = payload?.nextRewardYield || 0;
      const poolValue: BigNumber = payload?.poolValue || new BigNumber(0);
      const marketCap: BigNumber = payload?.marketCap || new BigNumber(0);
      const treasuryBalanceAvax: BigNumber =
        payload?.treasuryBalanceAvax || new BigNumber(0);

      state.stashInsuaranceFund = stashInsuaranceFund;
      state.stashBurned = stashBurned;
      state.treasuryBalance = treasuryBalance;
      state.timeLastRebase = payload?.timeLastRebase;
      state.timeNextRebase = payload?.timeNextRebase;
      state.marketCap = marketCap;
      state.totalSupply = totalSupply;
      state.poolValue = poolValue;
      state.nextRewardYield = nextRewardYield;
      state.avaxPrice = payload.avaxPrice;
      state.stashPrice = payload.stashPrice;
      state.treasuryBalanceAvax = treasuryBalanceAvax;

      return state;
    },

    setTimeNextRebase: (state, action) => {
      const payload = action?.payload || {};
      state.timeNextRebase = payload?.timeNextRebase;

      return state;
    },
  },
  extraReducers: (builder) => { },
});

// Actions
export const { setDataContract, setTimeNextRebase } = AppSlice.actions;

export default AppSlice.reducer;
