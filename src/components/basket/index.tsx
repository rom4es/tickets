import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import hallSchemeStore from '../../stores/HallSchemeStore';
import { Button } from '@mui/material';
import { getColor } from '../../shared/helpers';
import closeIcon from '../../assets/images/close.svg';

const Basket = () => {
  return (
    <div className={styles.basket}>
      <h3>Выбранные места</h3>
      {hallSchemeStore.selectedPlaces.length ? (
        <>
          <ul className={styles.list}>
            {hallSchemeStore.selectedPlaces.map((place) => (
              <li
                key={`${place.row}-${place.place}`}
                className={styles.item}
                style={{ borderColor: getColor(place, hallSchemeStore.colors) }}
              >
                <div>
                  <b>{place.price} руб.</b>
                </div>
                <div className={styles.place}>
                  {place.row} ряд {place.place} место
                </div>
                <div
                  className={styles.remove}
                  onClick={() => hallSchemeStore.removePlace(place.row, place.place)}
                >
                  <img src={closeIcon} alt="remove" />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            Итого к оплате: <b>{hallSchemeStore.totalPrice} руб.</b>
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
