import BigNumber from "bignumber.js";
import { AppState } from "src/shared/type/State/app";

export const initialAppState: AppState = {
  stashInsuaranceFund: new BigNumber(0),
  timeNextRebase: null,
  timeLastRebase: 0,
  treasuryBalance: new BigNumber(0),
  stashBurned: new BigNumber(0),
  totalSupply: new BigNumber(0),
  marketCap: new BigNumber(0),
  poolValue: new BigNumber(0),
  nextRewardYield: 0,
  avaxPrice: 0,
  stashPrice: new BigNumber(0),
  treasuryBalanceAvax: new BigNumber(0),
};
