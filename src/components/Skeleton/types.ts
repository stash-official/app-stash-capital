import { CSSProperties } from "styled-components";

export const animation = {
  WAVES: "waves",
  PULSE: "pulse",
};

export const variant = {
  RECT: "rect",
  CIRCLE: "circle",
};

export type Animation = typeof animation[keyof typeof animation];
export type Variant = typeof variant[keyof typeof variant];

export interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  animation?: string;
  variant?: string;
  className?: string;
  style?: CSSProperties;
}
