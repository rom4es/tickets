import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import HallScheme from './components/hallScheme';
import Basket from './components/basket';
import hallSchemeStore from './stores/HallSchemeStore';
import Preloader from './components/preloader';

import styles from './App.module.scss';
import Events from './components/events';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      await hallSchemeStore.fetchEvents();
      await hallSchemeStore.fetchPlaces();
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <Events />
      {hallSchemeStore.loading ? (
        <Preloader />
      ) : (
        <div className={styles.workspace}>
          <HallScheme />
          <Basket />
        </div>
      )}
    </div>
  );
}

export default observer(App);
