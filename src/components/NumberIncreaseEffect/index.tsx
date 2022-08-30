import BigNumber from "bignumber.js";
import React, { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { delineate, parseNumber } from "src/utils/number";

export interface NumberIncreaseEffectProps {
  value: BigNumber;
  decimals?: number;
  fixed?: number;
  start?: BigNumber;
}

const NumberIncreaseEffect: React.FC<NumberIncreaseEffectProps> = ({
  value,
  decimals = 5,
  fixed = 2,
  start = new BigNumber(0),
}) => {
  const parsedStart = useMemo(
    () => parseNumber(start, decimals, fixed),
    [start]
  );
  const parsedNumber = useMemo(
    () => parseNumber(value, decimals, fixed),
    [value]
  );

  const [preValue, setPreValue] = useState(parsedStart);

  const formatValue = (value: number) => {
    return delineate(value.toFixed(fixed + 1), fixed);
  };

  return (
    <CountUp
      style={{ fontFamily: '"Bebas Neue", cursive' }}
      decimals={fixed}
      start={preValue}
      end={parsedNumber}
      formattingFn={formatValue}
      duration={1}
      onEnd={() => {
        setPreValue(parsedNumber);
      }}
    />
  );
};

export default NumberIncreaseEffect;
