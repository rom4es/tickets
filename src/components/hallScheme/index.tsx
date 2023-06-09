import React from 'react';
import { observer } from 'mobx-react';
import styles from './hallScheme.module.css';
import hallSchemeStore from '../../stores/HallSchemeStore';
import Place from '../place';

const HallScheme = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scene}>Сцена</div>
      <div className={styles.places}>
        {hallSchemeStore.places.map((row, index) => {
          return (
            <div className={styles.row}>
              <div className={styles.rowNumber}>{index + 1}</div>
              {row.map((place) => (
                <Place place={place}/>
              ))}
              <div className={styles.rowNumber}>{index + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(HallScheme);
