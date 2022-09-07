import React, { FC, Suspense, lazy } from 'react';
import { Loader } from '../../components/ui/loader/Loader';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '../../assets';
import styles from './style.module.scss';
import { routes } from '../../constantes/routes';
import ProductItem from '../../components/productItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteProduct, amountProduct } from '../../store/basketSlice';
import notFound from '../../assets/json/97179-no-data-found.json';
import { Product } from '../../types/product';
const Lottie = lazy(() => import('react-lottie-player'));

export const Basket: FC = () => {
  const { data, loading } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const onDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const changeCount = (data: Product, count: number) => {
    if (data.count === count) {
      return;
    }
    dispatch(amountProduct({ id: data.id, count }));
  };

  const func = () => {
    return 'asd';
  };

  return (
    <div className="mb50">
      <div className="container  my20">
        <Link className="back mb20" to={routes.main}>
          <IconArrowLeft className="back__icon" />
          <span className="f28" data-testid="basket">
            Корзина
          </span>
        </Link>
      </div>
      <div className="container container--nopad my20">
        <Suspense fallback={<div></div>}>
          {data.length && !loading ? (
            data.map((data) => (
              <ProductItem
                key={data.id}
                data={data}
                onDelete={onDelete}
                changeCount={changeCount}
              />
            ))
          ) : loading ? (
            <Loader />
          ) : (
            <Lottie loop={false} animationData={notFound} play />
          )}
        </Suspense>
      </div>
      {data.length && !loading ? (
        <div className="container my20">
          <form>
            <textarea className={styles.textfield} placeholder="Комментарий..." />
            <div className={clsx(styles.flex, 'mb20')}>
              <span className="f18 weight600 mr10">Промокод</span>
              <input className={styles.field} type="text" />
            </div>
            <div className={clsx(styles.flex, 'mb20')}>
              <span className="f18 weight600 mr10 cGreen">Скидка</span>
              <span className="f18 weight600 mr10 cGreen">15%</span>
            </div>
            <div className={clsx(styles.flex, 'mb20')}>
              <span className="f18 weight600 mr10">Доставка</span>
              <span className="f18 weight600 mr10">700₽</span>
            </div>
            <div className={clsx(styles.flex, 'mb80')}>
              <span className="f22 weight600 mr10">Итого</span>
              <span className="f22 weight600 mr10">
                {data.reduce((acc, item) => acc + item.price * item.count, 0)}
              </span>
            </div>
            <button className={clsx(styles.btn, 'mb50')} type="submit">
              Купить
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
