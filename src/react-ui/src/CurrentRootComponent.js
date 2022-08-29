import React, { Component }  from 'react';
// import fs from "fs";
import {
  Contract,
  defaultProvider,
  Provider,
  json
} from "starknet";
// import {MERKLE_CONTRACT_ADDRESS, MERKLE_CONTRACT_ABI, CAIRO_PROVIDER} from "./constants";

async function getRoot() {
  const MERKLE_CONTRACT_ADDRESS = "0x05b4fc161748ddada82bd1c72b6323ee203a6ebf400ac2acdb068f541aff2e03";
  let contractAbi = [
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
  const merkleContract = new Contract(MERKLE_CONTRACT_ADDRESS, contractAbi, CAIRO_PROVIDER);
  console.log(await merkleContract.contract.root());
}

function CurrentRootComponent() {
  getRoot();

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
      <h4> Current root: </h4>
      <div></div>
    </div>
  );
}

export default CurrentRootComponent;