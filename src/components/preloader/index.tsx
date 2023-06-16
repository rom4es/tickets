import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import { CircularProgress } from '@mui/material';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <CircularProgress />
      <p>Загрузка мест</p>
    </div>
  );
};

export default observer(Preloader);
