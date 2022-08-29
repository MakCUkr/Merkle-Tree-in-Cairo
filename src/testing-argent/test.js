import React, { useState }  from 'react';
import { MERKLE_CONTRACT_ABI, MERKLE_CONTRACT_ADDRESS} from "./constants";
import {
  Contract
} from "starknet";
import { getStarknet } from "@argent/get-starknet"

console.log("Hello World");