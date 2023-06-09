import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import HallScheme from './components/hallScheme';
import hallSchemeStore from './stores/HallSchemeStore';

import './App.css';

function App() {
  useEffect(() => {
    hallSchemeStore.fetchPlaces();
  }, []);

  return (
    <div className="app">
      <HallScheme />
    </div>
  );
}

export default observer(App);
