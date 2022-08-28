import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchProducts, addFetchProducts } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import { Loader } from '../../components/ui/loader/Loader';

import notFound from '../../assets/json/97179-no-data-found.json';
import { Sorted } from '../../types/sort';
const TopBar = lazy(() => import('../../components/topBar'));
const Button = lazy(() => import('../../components/button'));
const ProductCard = lazy(() => import('../../components/product'));
const Lottie = lazy(() => import('react-lottie-player'));
const Carousel = lazy(() =>
  import('../../components/carousel/Carousel').then((c) => ({ default: c.Carousel }))
);

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
      <div className="mb50">
        <h2 className="f32 mb10">Главная</h2>
        <div className="mb20">
          <Suspense fallback={<div></div>}>
            <Carousel />
          </Suspense>
        </div>
        <div className="mb20">
          <Suspense fallback={<div></div>}>
            <TopBar count={totalRecords} />
          </Suspense>
        </div>
        <div>
          {data.length && !loading ? (
            <div className="products mb50">
              <Suspense fallback={<div></div>}>
                {data.map((product) => (
                  <ProductCard key={product.id} column={column} item={product} />
                ))}
              </Suspense>
            </div>
          ) : loading ? (
            <Loader />
          ) : (
            <Suspense fallback={<div></div>}>
              <Lottie loop={false} animationData={notFound} play />
            </Suspense>
          )}
          {data.length < totalRecords ? (
            <div className="mb80">
              <Suspense fallback={<div></div>}>
                <Button
                  className="ml-auto mr-auto"
                  disabled={loading}
                  text="Показать еще"
                  variant="primary"
                  onClick={addProduct}
                />
              </Suspense>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
