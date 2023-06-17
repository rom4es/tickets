import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import mainStore from '../../stores/MainStore';
import { Button } from '@mui/material';
import { getColor } from '../../shared/helpers';
import closeIcon from '../../assets/images/close.svg';

const Basket = () => {
  return (
    <div className={styles.basket}>
      <h3>Выбранные места</h3>
      {mainStore.selectedSeats.length ? (
        <>
          <ul className={styles.list}>
            {mainStore.selectedSeats.map((seat) => (
              <li
                key={`${seat.row}-${seat.seat}`}
                className={styles.item}
                style={{ borderColor: getColor(seat, mainStore.colors) }}
              >
                <div>
                  <b>{seat.price} руб.</b>
                </div>
                <div className={styles.seat}>
                  {seat.row} ряд {seat.seat} место
                </div>
                <div
                  className={styles.remove}
                  onClick={() => mainStore.removeSeat(seat.row, seat.seat)}
                >
                  <img src={closeIcon} alt="remove" />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            Итого к оплате: <b>{mainStore.totalPrice} руб.</b>
          </div>
          <Button variant="contained">Оплатить</Button>
        </>
      ) : (
        <p className={styles.empty}>Ещё не выбрано ни одного места</p>
      )}
    </div>
  );
};

export default observer(Basket);
