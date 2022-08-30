import { tokens } from "./token";

export const contractAddresses = {
  stash: tokens.stash.addresses,
  stashAvax: tokens.stashAvaxLP.addresses,

  treasury: {
    43114: "0x09f7b26f83835c32bc042e372abd65c2afbe1716",
    43113: "",
  },

  autoLiquidityAddress: {
    43114: "0x42174c941a7008e4Ae81AF29839a617d1A0a6750",
    43113: "",
  },

  stashInsuarance: {
    43114: "0xE39ec2278CB5026ddcB0116f6915dac73d78474c",
    43113: "",
  },

  burn: {
    43114: "0x000000000000000000000000000000000000dEaD",
    43113: "",
  },

  dexRouter: {
    43114: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
    43113: "",
  },
};