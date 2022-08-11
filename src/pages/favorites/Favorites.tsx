import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '../../assets';
import { routes } from '../../constantes/routes';
import ProductItem from '../../components/productItem';
import { Helmet } from 'react-helmet-async';
import styles from './style.module.scss';

export const Favorites = () => {
  return (
    <div className="mb50">
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <div className="container  my20">
        <Link className="back mb20" to={routes.main}>
          <IconArrowLeft className="back__icon" />
          <span className="f28">Избранное</span>
        </Link>
      </div>
      <div className="container container--nopad my20">
        <ProductItem favorites />
        <ProductItem favorites />
        <ProductItem favorites />
      </div>
    </div>
  );
};
