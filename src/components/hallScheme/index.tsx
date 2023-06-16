import React from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import hallSchemeStore from '../../stores/HallSchemeStore';
import Place from '../place';
import Legend from '../legend';

const HallScheme = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hall}>
        <div className={styles.scene}><b>Сцена</b></div>
        <div className={styles.places}>
          {hallSchemeStore.places.map((row, index) => {
            return (
              <div className={styles.row} key={index}>
                <div className={styles.rowNumber}>{index + 1}</div>
                {row.map((place) => (
                  <Place place={place} key={place.place} />
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
