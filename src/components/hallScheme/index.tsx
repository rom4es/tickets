import React from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import mainStore from '../../stores/MainStore';
import Legend from '../legend';
import Seat from '../seat';

const HallScheme = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hall}>
        <div className={styles.scene}><b>Сцена</b></div>
        <div className={styles.seats}>
          {mainStore.seats.map((row, index) => {
            return (
              <div className={styles.row} key={index}>
                <div className={styles.rowNumber}>{index + 1}</div>
                {row.map((seat) => (
                  <Seat seat={seat} key={seat.seat} />
                ))}
                <div className={styles.rowNumber}>{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.legend}>
        <Legend />
      </div>
    </div>
  );
};

export default observer(HallScheme);
