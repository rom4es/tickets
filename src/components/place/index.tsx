import React from 'react';
import styles from './place.module.css';
import { IPlace } from '../../shared/interfaces';
import clsx from 'clsx';
import { COLOR_BOOKED } from '../../shared/constants';

interface IProps {
  place: IPlace;
}


const getColor = (place: IPlace) => {
  if (place.booked) return COLOR_BOOKED;
  if (place.price < 1000) {
    return 'red';
  }
  if (place.price < 2000) {
    return 'green';
  }
  if (place.price < 3000) {
    return 'blue';
  }
  return 'aqua';
};

const Place = ({ place }: IProps) => {
  return (
    <div
      className={clsx(styles.place, place.booked && styles.booked)}
      style={{ backgroundColor: getColor(place) }}
    ></div>
  );
};

export default Place;
