import React, { useState, FC } from 'react';
import Modal from '../../components/modal';
import clsx from 'clsx';
import styles from './style.module.scss';
import { IconArrows, IconArrowsLess, IconArrowsMore } from '../../assets';
import { Sorted } from '../../types/sort';

type Props = {
  open: boolean;
  setOpen: (o: boolean) => void;
  sort: Sorted;
  sortedType: (s: Sorted) => void;
};

export const Sort: FC<Props> = ({ open, setOpen, sort, sortedType }: Props) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      bottom>
      <h3 className="mb20 f16 ">Сортировать</h3>
      <div
        className={clsx(styles.item, 'f14 m15', sort === Sorted.DEFAULT && 'weight600')}
        onClick={() => sortedType(Sorted.DEFAULT)}>
        Цена - сначала дорогое
      </div>
      <div
        className={clsx(styles.item, 'f14 m15', sort === Sorted.ASC && 'weight600')}
        onClick={() => sortedType(Sorted.ASC)}>
        Цена - сначала дешевое
      </div>
      <div
        className={clsx(styles.item, 'f14 m15', sort === Sorted.DESC && 'weight600')}
        onClick={() => sortedType(Sorted.DESC)}>
        Цена - сначала по акции
      </div>
    </Modal>
  );
};
