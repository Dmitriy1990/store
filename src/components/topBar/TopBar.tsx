import React, { FC, useState, useCallback, Suspense, lazy } from 'react';
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
import Sort from '../sort';
import { Sorted } from '../../types/sort';
import { useAppSelector } from '../../store/hooks';
import { toggleView, changeSort } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { wordDecline } from '../../utils/wordDecline';

const Filters = lazy(() => import('../filters'));

type Props = {
  count: number;
};

export const TopBar: FC<Props> = ({ count }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const { column, sort } = useAppSelector((state) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const sortedType = useCallback(
    (s: Sorted) => {
      if (sort !== s) {
        dispatch(changeSort(s));
      }
    },
    [sort]
  );
  return (
    <div className={styles.top_bar}>
      <h3 className={clsx('f18 usn')}>
        {count} {wordDecline(count, ['товар', 'товара', 'товаров'])}
      </h3>
      <ul className={styles.filters}>
        <li className={styles.filters__item} onClick={() => dispatch(toggleView())}>
          {column ? <IconTile className="svg-stroke" /> : <IconColumn className="svg-stroke" />}
        </li>
        <li
          className={styles.filters__item}
          onClick={() => {
            setOpenSort(true);
          }}>
          {sort === Sorted.DEFAULT ? (
            <IconArrows className="svg" />
          ) : sort === Sorted.ASC ? (
            <IconArrowsLess className="svg" />
          ) : (
            <IconArrowsMore className="svg" />
          )}
        </li>
        <li className={styles.filters__item} onClick={() => setOpenFilter(true)}>
          <IconFilter className="svg" />
        </li>
      </ul>
      <Suspense fallback={<div></div>}>
        <Filters open={openFilter} setOpen={setOpenFilter} />
      </Suspense>
      <Sort open={openSort} setOpen={setOpenSort} sort={sort} sortedType={sortedType} />
    </div>
  );
};
