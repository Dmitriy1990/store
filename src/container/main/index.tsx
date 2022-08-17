import React, { useEffect, FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchProducts } from '../../store/productsSlice';
import { fetchPurchases } from '../../store/basketSlice';
import { useAppSelector } from '../../store/hooks';
import { Sorted } from '../../types/sort';

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sort } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts({ num: 0, sort }));
  }, [dispatch, sort]);

  useEffect(() => {
    dispatch(fetchPurchases());
  }, [dispatch]);

  return <>{children}</>;
};
