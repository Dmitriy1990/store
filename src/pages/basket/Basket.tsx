import React from 'react';
import { Loader } from '../../components/ui/loader/Loader';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '../../assets';
import styles from './style.module.scss';
import { routes } from '../../constantes/routes';
// import ProductItem from '../../components/productItem';
import { Helmet } from 'react-helmet-async';

export const Basket = () => {
  return (
    <div className="mb50">
      <Helmet>
        <title>Корзина</title>
      </Helmet>
      <div className="container  my20">
        <Link className="back mb20" to={routes.main}>
          <IconArrowLeft className="back__icon" />
          <span className="f28">Корзина</span>
        </Link>
      </div>
      {/* <div className="container container--nopad my20">
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div> */}
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
            <span className="f22 weight600 mr10">22 300₽</span>
          </div>
          <button className={clsx(styles.btn, 'mb50')} type="submit">
            Купить
          </button>
        </form>
      </div>
    </div>
  );
};
