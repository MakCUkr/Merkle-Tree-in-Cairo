
import React  from 'react';
import AddingRootComponent from "./AddingRootComponent"
import CurrentRootComponent from "./CurrentRootComponent"
import { StarknetProvider, getInstalledInjectedConnectors } from '@starknet-react/core'

function App() {
  const connectors = getInstalledInjectedConnectors();

  return (
    <StarknetProvider connectors={connectors}>
      <div>
        <CurrentRootComponent/>
        <AddingRootComponent/>
      </div>
    </StarknetProvider>
  );
}

export default App;
