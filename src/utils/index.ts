import { AVAX_CHAINID } from "src/constant/network";
import { has } from "lodash";
import { REBASE_INTERVAL } from "src/constant";

export const getAddress = (addresses: any): string => {
  if (!addresses) return;

  let targetChainId: Number;
  [AVAX_CHAINID].forEach((chainId) => {
    if (has(addresses, Number(chainId))) targetChainId = Number(chainId);
  });

  return String(addresses[Number(targetChainId)]).toLowerCase();
};

export const shortAddress = (text: string) => {
  if (text.length < 10) return text;
  return `${text.slice(0, 6)}...${text.slice(text.length - 4)}`;
};

export const waitingAllRequest = async (promises: Promise<any>[]) => {
  const result = [];

  for (let index = 0; index < promises.length; index++) {
    result.push(await promises[index]);
  }

  return result;
};

export const calcStakingCompoundROI = (
  compoundTime: number,
  roiPerGetRewardTime: number
) => {
  const roiWithoutCompound = roiPerGetRewardTime * compoundTime;

  return (1 + roiWithoutCompound / compoundTime) ** compoundTime - 1;
};

export const copyTextToClipboard = (text: string, callback: (result: boolean) => void) => {
  try {
    navigator.clipboard.writeText(text).then(
      () => {
        callback(true);
      },
      () => {
        callback(false);
      }
    );
  } catch (err) { }
};

export const getNumberOfElapsedEpochs = (start: number, end: number) => {
  const rebasePeriod = REBASE_INTERVAL / 1000;
  const numberOfElapsedEpochs = (end - (end % rebasePeriod) - start) / rebasePeriod
  return numberOfElapsedEpochs
}

