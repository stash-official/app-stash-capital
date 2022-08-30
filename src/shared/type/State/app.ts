import BigNumber from 'bignumber.js'

export interface AppState {
    stashInsuaranceFund: BigNumber,
    timeNextRebase: number,
    timeLastRebase: number,
    treasuryBalance: BigNumber,
    stashBurned: BigNumber,
    totalSupply: BigNumber,
    marketCap: BigNumber,
    poolValue: BigNumber,
    nextRewardYield: number,
    avaxPrice: number,
    stashPrice: BigNumber,
    treasuryBalanceAvax: BigNumber,
  };
  