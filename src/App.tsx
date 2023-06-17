import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import HallScheme from './components/hallScheme';
import Basket from './components/basket';
import mainStore from './stores/MainStore';
import Preloader from './components/preloader';
import Events from './components/events';

import githubIcon from './assets/images/github.svg';
import styles from './App.module.scss';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      await mainStore.fetchEvents();
      await mainStore.fetchSeats();
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>Tickets</h1>
        <a
          href="https://github.com/rom4es/tickets"
          className={styles.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="" />
        </a>
      </div>

      <Events />
      {mainStore.loading ? (
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
