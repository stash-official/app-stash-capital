import BigNumber from "bignumber.js";

export interface AccountInfo {
    id: string,
    balance: BigNumber,
    cummulativeBalance: BigNumber,
    totalEarned: BigNumber,
    lastTransferAtEpochTimestamp: Number
}

export interface AccountInfoApi {
    holders: any
}