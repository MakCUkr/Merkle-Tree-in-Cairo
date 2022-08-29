import {
  Contract,
  defaultProvider,
  Provider,
} from "starknet";

const MERKLE_CONTRACT_ADDRESS = "0x05b4fc161748ddada82bd1c72b6323ee203a6ebf400ac2acdb068f541aff2e03";
const MERKLE_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "root",
    "outputs": [
      {
        "name": "root",
        "type": "felt"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "root",
        "type": "felt"
      }
    ],
    "name": "set_merkle_root",
    "outputs": [],
    "type": "function"
  }
];
const CAIRO_PROVIDER = process.env.STARKNET_PROVIDER_BASE_URL === undefined ?
  defaultProvider :
  new Provider({ baseUrl: process.env.STARKNET_PROVIDER_BASE_URL });

const merkleContract = new Contract(MERKLE_CONTRACT_ABI, MERKLE_CONTRACT_ADDRESS, CAIRO_PROVIDER);

export { MERKLE_CONTRACT_ADDRESS, MERKLE_CONTRACT_ABI, CAIRO_PROVIDER, merkleContract }