import React, { FC } from 'react';
import styles from './style.module.scss';

type Props = {
  num: number;
};

export const Size: FC<Props> = ({ num }: Props) => {
  return (
    <label className={styles['label-container']}>
      <input className={styles.field} type="checkbox" />
      <span className={styles.item}>{num}</span>
    </label>
  );
};
