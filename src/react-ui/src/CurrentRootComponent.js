import React, { useState }  from 'react';
import {merkleContract} from "./constants";



function CurrentRootComponent() {
  const [contractRoot, setContractRoot] = useState(0);
  async function getRoot() {
    setContractRoot((await merkleContract.root()).root.words[0]);
  }

  getRoot();

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
      <h4> Current root: {contractRoot}</h4>
      <div></div>
    </div>
  );
}

export default CurrentRootComponent;