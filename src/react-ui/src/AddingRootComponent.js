import React, { useState } from 'react';
import { merkleContract } from "./constants"
import { connect, getStarknet } from "get-starknet"

function AddingRootComponent() {
  const [newHashVal, setNewHashVal] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
      <div>
        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Root Hash</label>
        <input onChange={(e) => {
          setNewHashVal(e.target.value);
        }}
          type="text" id="small-input" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <button type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={async () => {
          let wallet = getStarknet();
          // let wallet = await connect();
          console.log("Connectng account: ", wallet);
          // merkleContract.connect(wallet);
          // const { transaction_hash: mintTxHash } = await merkleContract.set_merkle_root(
          //   newHashVal,
          //   { maxFee: "999999995330000" }
          // );
        }}
      >Set</button>
    </div>
  );
}

export default AddingRootComponent;