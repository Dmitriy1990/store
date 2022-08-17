import React, { useContext, useEffect, useState } from 'react';
import BottomNav from '../../components/bottomNav';
import { Carousel } from '../../components/carousel/Carousel';
import ProductCard from '../../components/product';
import TopBar from '../../components/topBar';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchProducts, addFetchProducts } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import { Loader } from '../../components/ui/loader/Loader';
import Lottie from 'react-lottie-player';
import notFound from '../../assets/json/97179-no-data-found.json';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/button';
import { Sorted } from '../../types/sort';

export const MainPage = () => {
  const { data, loading, column, totalRecords, sort, num } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  const addProduct = () => {
    dispatch(addFetchProducts({ num, sort }));
  };

  return (
    <div className="container">
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <div className="mb50">
        <h2 className="f32 mb10">Главная</h2>
        <div className="mb20">
          <Carousel />
        </div>
        <div className="mb20">
          <TopBar count={totalRecords} />
        </div>
        <div>
          {data.length && !loading ? (
            <div className="products mb50">
              {data.map((product) => (
                <ProductCard key={product.id} column={column} item={product} />
              ))}
            </div>
          ) : loading ? (
            <Loader />
          ) : (
            <Lottie loop={false} animationData={notFound} play className="lottie-loader" />
          )}
          {data.length < totalRecords ? (
            <div className="mb80">
              <Button
                className="ml-auto mr-auto"
                disabled={loading}
                text="Показать еще"
                variant="primary"
                onClick={addProduct}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
