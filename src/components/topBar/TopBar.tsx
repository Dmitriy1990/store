import React, { FC } from 'react';
import { IconArrows, IconColumn, IconFilter, IconTile } from '../../assets';
import clsx from 'clsx';
import styles from './style.module.scss';

type Props = {
  changeView: () => void;
  column: boolean;
  count: number;
};

export const TopBar: FC<Props> = ({ changeView, column, count }: Props) => {
  return (
    <div className={styles.top_bar}>
      <h3 className={clsx('f18 usn')}>{count} товаров</h3>
      <ul className={styles.filters}>
        <li className={styles.filters__item} onClick={changeView}>
          {column ? <IconTile /> : <IconColumn />}
        </li>
        <li className={styles.filters__item}>
          <IconArrows />
        </li>
        <li className={styles.filters__item}>
          <IconFilter />
        </li>
      </ul>
    </div>
  );
};
