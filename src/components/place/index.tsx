import React from 'react';
import styles from './styles.module.scss';
import { IPlace } from '../../shared/interfaces';
import clsx from 'clsx';
import hallSchemeStore from '../../stores/HallSchemeStore';
import { observer } from 'mobx-react';
import { Tooltip } from '@mui/material';
import { getColor } from '../../shared/helpers';

interface IProps {
  place: IPlace;
}

const Place = ({ place }: IProps) => {
  return (
    <Tooltip
      title={
        <div className={styles.tooltip}>
          <div>{place.price} руб.</div>
          <div>
            {place.row} ряд {place.place} место
          </div>
        </div>
      }
      arrow
      placement="top"
      disableHoverListener={place.booked}
      disableInteractive
    >
      <div
        className={clsx(
          styles.place,
          place.booked && styles.booked,
          place.selected && styles.selected
        )}
        style={{ backgroundColor: getColor(place, hallSchemeStore.colors) }}
        onClick={() => hallSchemeStore.choosePlace(place.row, place.place)}
      ></div>
    </Tooltip>
  );
};

export default observer(Place);
