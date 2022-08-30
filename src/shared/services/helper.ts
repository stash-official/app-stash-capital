import axios from "axios";
import BigNumber from "bignumber.js";
import request, { gql } from "graphql-request";
import { GRAPH_API } from "src/constant";
import { tokens } from "src/constant/token";
import { getAddress } from "src/utils";
import { AccountInfo, AccountInfoApi } from "../type/accountInfoApi";

export async function getAVAXPrice(tokenId = "avalanche-2") {
  const resp = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
  );
  let tokenPrice: number = resp.data[tokenId].usd;
  return tokenPrice;
}

export const getAccountInfo = async (account: string): Promise<AccountInfo> => {
  try {

    const { holders }: AccountInfoApi = await request(
      GRAPH_API,
      gql`
        {
          holders(where: { id: "${account.toLowerCase()}" }) {
            id,
            balance,
            cummulativeBalance,
            totalEarned,
            lastTransferAtEpochTimestamp
          }
        }
      `
    )
    const holder = holders[0];
    return holder && {
      id: holder.id,
      balance: new BigNumber(holder.balance),
      cummulativeBalance: new BigNumber(holder.cummulativeBalance),
      totalEarned: new BigNumber(holder.totalEarned),
      lastTransferAtEpochTimestamp: Number(holder.lastTransferAtEpochTimestamp)
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const addTokenToWallet = async () => {
  const tokenLogo = window.location.origin + "/tokenLogo.svg";
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: getAddress(tokens.stash.addresses),
            symbol: "STASH",
            decimals: tokens.stash.decimals,
            image: tokenLogo,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
};
