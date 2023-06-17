import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import mainStore from '../../stores/MainStore';
import { Colors } from '../../shared/interfaces';

const renderPrices = (colors: Colors) => {
  const list: React.ReactNode[] = [];

  for (let [price, color] of colors.entries()) {
    list.push(
      <div className={styles.item} key={price}>
        <div className={styles.color} style={{ backgroundColor: color }}></div>
        <div>{price}</div>
      </div>
    );
  }

  return list;
};

const Legend = () => {
  return <div className={styles.legend}>{renderPrices(mainStore.colors)}</div>;
};

export default observer(Legend);
