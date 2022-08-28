import fs from "fs";
import readline from "readline";

// Install the latest version of starknet with npm install starknet@next and import starknet
import {
  Account,
  Contract,
  defaultProvider,
  ec,
  json,
  stark,
  Provider,
  number
} from "starknet";

const provider = process.env.STARKNET_PROVIDER_BASE_URL === undefined ?
  defaultProvider :
  new Provider({ baseUrl: process.env.STARKNET_PROVIDER_BASE_URL });
const erc20Address = "0x06cf7610c6209b72980c39196bb94b0d1c952dc1248be14cf149ed16a2c5864f";
const contractAbi = [
    {
      "members": [
        {
          "name": "low",
          "offset": 0,
          "type": "felt"
        },
        {
          "name": "high",
          "offset": 1,
          "type": "felt"
        }
      ],
      "name": "Uint256",
      "size": 2,
      "type": "struct"
    },
    {
      "inputs": [
        {
          "name": "name",
          "type": "felt"
        },
        {
          "name": "symbol",
          "type": "felt"
        },
        {
          "name": "initial_supply",
          "type": "Uint256"
        },
        {
          "name": "recipient",
          "type": "felt"
        }
      ],
      "name": "constructor",
      "outputs": [],
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "name",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "symbol",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "totalSupply",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "decimals",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "account",
          "type": "felt"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "owner",
          "type": "felt"
        },
        {
          "name": "spender",
          "type": "felt"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "faucet",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "sender",
          "type": "felt"
        },
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "added_value",
          "type": "Uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "subtracted_value",
          "type": "Uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    }
  ];

const erc20 = new Contract(contractAbi, erc20Address, provider);
const balanceBeforeTransfer = await erc20.balanceOf("0x06a3b22E6059dd35205B94D2081550d3c9B6D4E59A29aA12D755E4C36bC5378E");
console.log("Balance before transfer: ", balanceBeforeTransfer.balance.low.toString());

// account = 0x06a3b22E6059dd35205B94D2081550d3c9B6D4E59A29aA12D755E4C36bC5378E
// erc20 = 0x06cf7610c6209b72980c39196bb94b0d1c952dc1248be14cf149ed16a2c5864f