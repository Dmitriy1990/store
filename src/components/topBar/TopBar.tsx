import React, { FC, useState } from 'react';
import {
  IconArrows,
  IconColumn,
  IconFilter,
  IconTile,
  IconArrowsLess,
  IconArrowsMore
} from '../../assets';
import clsx from 'clsx';
import styles from './style.module.scss';
import Filters from '../filters';
import Sort from '../sort';
import { Sorted } from '../../types/sort';

type Props = {
  changeView: () => void;
  column: boolean;
  count: number;
};

export const TopBar: FC<Props> = ({ changeView, column, count }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState<Sorted>(Sorted.DEFAULT);

  const sortedType = (s: Sorted) => {
    if (sort !== s) {
      setSort(s);
    }
  };

  console.log('opensort', openSort);
  return (
    <div className={styles.top_bar}>
      <h3 className={clsx('f18 usn')}>{count} товаров</h3>
      <ul className={styles.filters}>
        <li className={styles.filters__item} onClick={changeView}>
          {column ? <IconTile /> : <IconColumn />}
        </li>
        <li
          className={styles.filters__item}
          onClick={() => {
            setOpenSort(true);
          }}>
          {sort === Sorted.DEFAULT ? (
            <IconArrows />
          ) : sort === Sorted.ASC ? (
            <IconArrowsLess />
          ) : (
            <IconArrowsMore />
          )}
        </li>
        <li className={styles.filters__item} onClick={() => setOpenFilter(true)}>
          <IconFilter />
        </li>
      </ul>
      <Filters open={openFilter} setOpen={setOpenFilter} />
      <Sort open={openSort} setOpen={setOpenSort} sort={sort} sortedType={sortedType} />
    </div>
  );
};
