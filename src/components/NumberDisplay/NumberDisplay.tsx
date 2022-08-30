import BigNumber from "bignumber.js";
import React from "react";
import { parseNumberDisplay } from "../../utils/number";

export interface NumberDisplayProps {
  value: BigNumber;
  fixed?: number;
  decimals?: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = React.memo(
  ({ value, fixed = 10, decimals = 18 }) => {
    const parsedValue = parseNumberDisplay(value, fixed, decimals);

    return value ? <>{parsedValue}</> : <>...</>;
  },
  (pre: NumberDisplayProps, next: NumberDisplayProps) => {
    return next.value && next.value.isEqualTo(pre.value);
  }
);

export default NumberDisplay;
