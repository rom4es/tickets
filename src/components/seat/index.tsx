import React from 'react';
import styles from './styles.module.scss';
import { ISeat } from '../../shared/interfaces';
import clsx from 'clsx';
import mainStore from '../../stores/MainStore';
import { observer } from 'mobx-react';
import { Tooltip } from '@mui/material';
import { getColor } from '../../shared/helpers';

interface IProps {
  seat: ISeat;
}

const Seat = ({ seat }: IProps) => {
  return (
    <Tooltip
      title={
        <div className={styles.tooltip}>
          <div>{seat.price} руб.</div>
          <div>
            {seat.row} ряд {seat.seat} место
          </div>
        </div>
      }
      arrow
      placement="top"
      disableHoverListener={seat.booked}
      disableInteractive
    >
      <div
        className={clsx(
          styles.seat,
          seat.booked && styles.booked,
          seat.selected && styles.selected
        )}
        style={{ backgroundColor: getColor(seat, mainStore.colors) }}
        onClick={() => mainStore.chooseSeat(seat.row, seat.seat)}
      ></div>
    </Tooltip>
  );
};

export default observer(Seat);
