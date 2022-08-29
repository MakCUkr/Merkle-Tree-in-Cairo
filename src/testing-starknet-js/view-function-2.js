import {
  Contract,
  defaultProvider,
  Provider,
} from "starknet";

const provider = process.env.STARKNET_PROVIDER_BASE_URL === undefined ?
  defaultProvider :
  new Provider({ baseUrl: process.env.STARKNET_PROVIDER_BASE_URL });
const erc20Address = "0x05b4fc161748ddada82bd1c72b6323ee203a6ebf400ac2acdb068f541aff2e03";
const contractJson = JSON.parse("../cairo-part/build/MerkleContract.json")

const erc20 = new Contract(contractJson.abi, erc20Address, provider);
const balanceBeforeTransfer = await erc20.root();
console.log("Balance before transfer: ", balanceBeforeTransfer.root.toString());

// account = 0x06a3b22E6059dd35205B94D2081550d3c9B6D4E59A29aA12D755E4C36bC5378E
// erc20 = 0x06cf7610c6209b72980c39196bb94b0d1c952dc1248be14cf149ed16a2c5864f