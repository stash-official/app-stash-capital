import BigNumber from "bignumber.js";
import { ethers, Contract } from "ethers";
import { REACT_APP_RPC } from "src/constant/network";
import { getAddress } from "src/utils";
import stashABI from "../abis/stash.json";
import erc20ABI from "../abis/erc20.json";
import pairABI from "../abis/pairABI.json";
import { Addresses } from "../type/addresses";
import { contractAddresses } from "src/constant/address";
import { tokens } from "src/constant/token";
import { Token } from "../type/token";
import { REBASE_INTERVAL } from "src/constant";


export const getRPC = () => new ethers.providers.JsonRpcProvider(REACT_APP_RPC);

const _getContract = (addresses: Addresses, abi: any): any =>
  new Contract(
    getAddress(addresses),
    abi,
    getRPC()
  );


const getERC20Contract = (addresses: Addresses): Contract => _getContract(addresses, erc20ABI);

const getContractStash = (): Contract =>
  _getContract(contractAddresses.stash, stashABI);

const getContractPair = (): Contract =>
  _getContract(contractAddresses.stashAvax, pairABI);

export const getTimeRebase = async () => {
  const contract = getContractStash();
  const lastRebasedTime = await contract.lastRebasedTime();
  const parsedLastRebasedTime = Number(lastRebasedTime.toString()) * 1000;
  const nextRebaseTime = parsedLastRebasedTime + REBASE_INTERVAL;
  const currentTime = new Date().valueOf();

  const secondsTillNextRebase = nextRebaseTime - currentTime;

  if (secondsTillNextRebase < 0) {
    return { lastRebaseTime: parsedLastRebasedTime, nextRebaseTime: null };;
  }
  return { lastRebaseTime: parsedLastRebasedTime, nextRebaseTime };
};

export const getBalanceOf = async (token: Token, address: string) => {
  const contract = getERC20Contract(token.addresses);
  const balance = await contract.balanceOf(
    address
  );
  return new BigNumber(balance.toString()).div(10 ** token.decimals);
};

export const getNativeBalanceOf = async (address: string) => {
  let provider = getRPC();
  const balance = await provider.getBalance(
    address
  );

  return new BigNumber(balance.toString()).div(10 ** 18);
};

export const getTotalSupply = async (token: Token) => {
  const contract = getERC20Contract(token.addresses);
  const totalSupply = await contract.totalSupply();
  return new BigNumber(totalSupply.toString()).div(10 ** token.decimals);
};

export const getBackingLiquidity = async () => {
  const contract = getContractStash();
  const accuracy = 100;
  const liquidityBacking = await contract.getLiquidityBacking(accuracy);
  return new BigNumber(liquidityBacking.toString());
};

export const getBalanceStashAvaxPair = async () => {
  const pair = getContractPair();
  const reserves = await pair.getReserves();
  return reserves
}

export const getPoolValueInAvax = async () => {
  const reserves = await getBalanceStashAvaxPair();
  const balanceAvax = new BigNumber(reserves[1].toString());
  const totalPoolValue = balanceAvax.multipliedBy(2).div(10 ** tokens.wAvax.decimals);
  return new BigNumber(totalPoolValue.toString());
};

export const getStashInsuaranceFund = async () => {
  const balanceOfInsuaranceFund = await getNativeBalanceOf(getAddress(contractAddresses.stashInsuarance))

  return balanceOfInsuaranceFund;
};

export const getAvaxBalance = async () => {
  const balanceOfInsuaranceFund = await getNativeBalanceOf(
    getAddress(contractAddresses.treasury)
  );

  return balanceOfInsuaranceFund;
};

export const getStashPriceInAvax = async () => {
  const reserves = await getBalanceStashAvaxPair();

  const balanceAvax = new BigNumber(reserves[1].toString()).div(
    10 ** tokens.wAvax.decimals
  );
  const balanceStash = new BigNumber(reserves[0].toString()).div(
    10 ** tokens.stash.decimals
  );
  const price = balanceAvax.div(balanceStash);

  return price;
};

export const getMarketCapInAvax = async () => {
  const stashContract = getERC20Contract(tokens.stash.addresses);
  const stashPrice = await getStashPriceInAvax();
  const stashSupply = await stashContract.totalSupply();

  const marketCap = new BigNumber(stashSupply.toString())
    .div(10 ** tokens.stash.decimals)
    .multipliedBy(stashPrice);

  return marketCap;
};

export const getNextRewardYield = async () => {
  // const stashContract = getContractStash();
  // const rebaseRate = await stashContract.getRebaseRate();
  return 2374 / 10 ** 7;
};
