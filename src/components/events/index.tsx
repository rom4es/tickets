import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import mainStore from '../../stores/MainStore';
import clsx from 'clsx';

const Events = () => {
  return (
    <div className={styles.container}>
      {mainStore.events.map((event) => (
        <div
          key={event.id}
          className={clsx(styles.event, event.selected && styles.selected)}
          onClick={() => mainStore.selectEvent(event.id)}
        >
          <div className={styles.hall}>
            <b>{event.hall}</b>
          </div>
          <div className={styles.date}>{event.date}</div>
          <div className={styles.seats}>Свободных мест: {event.seats}</div>
        </div>
      ))}
    </div>
  );
};

export default observer(Events);
