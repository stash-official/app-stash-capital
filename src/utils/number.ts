import BigNumber from "bignumber.js";

/**
 * Convert 10.999 to 10999000
 */
export function toBaseUnitBN(
  rawAmt: string | number | BigNumber,
  decimals: number
): BigNumber {
  const raw = new BigNumber(rawAmt);
  const base = new BigNumber(10);
  const decimalsBN = new BigNumber(decimals);
  return raw.times(base.pow(decimalsBN)).integerValue();
}

/**
 * Convert 10999000 to 10.999
 */
export const toTokenUnitsBN = (
  tokenAmount: string | number | BigNumber,
  tokenDecimals: number
): BigNumber => {
  const amt = new BigNumber(tokenAmount);
  const digits = new BigNumber(10).pow(new BigNumber(tokenDecimals));
  return amt.div(digits);
};

export const isPos = (amount: BigNumber): boolean => {
  return !amount.isZero() && amount.isPositive();
};

export const ownership = (
  balance: BigNumber,
  totalSupply: BigNumber
): BigNumber => {
  return balance.multipliedBy(new BigNumber(100)).dividedBy(totalSupply);
};

/**
 * BigNumber string formatting
 */

export const formatBN = (amount: BigNumber, position: number): string => {
  if (amount.isLessThan(new BigNumber(1))) {
    return pad(
      amount.precision(position, BigNumber.ROUND_FLOOR).toFixed(),
      position
    );
  }
  return delineate(amount.toFixed(position, BigNumber.ROUND_FLOOR));
};

export function delineate(bnStr: string, decimalDigitTake?: number) {
  const parts = bnStr.split(".");
  if (decimalDigitTake && parts[1]) {
    parts[1] = parts[1].substr(0, decimalDigitTake);
  }

  const formatDecimal =
    parts[1] && Number(parts[1]) && decimalDigitTake !== 0
      ? "." + parts[1]
      : "";
  return (
    parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + formatDecimal
  );
}

function pad(bnStr: string, position: number) {
  if (!bnStr.includes(".")) {
    bnStr += ".";
  }

  const parts = bnStr.split(".");
  for (let i = 0; i < position - parts[1].length; i++) {
    bnStr += "0";
  }

  return bnStr;
}

export function formatMoney(number: number) {
  let n = number.toPrecision(3);
  return Math.abs(Number(n)) >= 1.0e9
    ? Math.abs(Number(n)) / 1.0e9 + "B"
    : Math.abs(Number(n)) >= 1.0e6
      ? Math.abs(Number(n)) / 1.0e6 + "MM"
      : Math.abs(Number(n)) >= 1.0e3
        ? Math.abs(Number(n)) / 1.0e3 + "K"
        : Math.abs(Number(n));
}

export const parseNumberDisplay = (
  value: BigNumber,
  fixed: number = 10,
  decimals: number = 0
) => {
  const parsedValue = toTokenUnitsBN(value, decimals).toString(10);
  return delineate(
    Number(parsedValue)
      ? parsedValue
      : toTokenUnitsBN(value, decimals).toString(10),
    Number(parsedValue) ? fixed : 10
  );
};

export const parseNumber = (bigNum: BigNumber, decimals: number, fixed: number) => {

  const [number, decimal] = bigNum.toFixed(decimals).toString().split(".");

  return Number(
    `${number}${decimal ? "." + decimal.substr(0, fixed) : ""}`
  );
} 
