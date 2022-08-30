import BigNumber from "bignumber.js";

export const FETCH_ALL_DATA_INTERVAL = 300000 // 5mins;
export const FETCH_STASH_PRICE_INTERVAL = 30000 // 30s;
export const FETCH_BALANCE_INTERVAL = 10000 // 30s;
export const FETCH_NEXT_REBASE_TIME_INTERVAL = 10000 // 15s;

export const REBASE_PERIOD = 60 * 15;

export const REBASE_INTERVAL = REBASE_PERIOD * 1000;

export const YEAR_IN_SEC = 60 * 60 * 24 * 365;
export const DAY_IN_SEC = 60 * 60 * 24;
export const MONTH_IN_SEC = 60 * 60 * 24 * 30;
export const ZERO = new BigNumber(0);

export const GRAPH_API = "https://api.thegraph.com/subgraphs/name/dogedevv/stash";
