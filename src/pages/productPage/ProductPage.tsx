import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, noProduct } from '../../assets';
import { routes } from '../../constantes/routes';
import { AppDispatch } from '../../store/store';
import { clear, fetchProduct } from '../../store/productSlice';
import { addToBasket, amountProduct } from '../../store/basketSlice';

import styles from './style.module.scss';
import { useAppSelector } from '../../store/hooks';
import { Loader } from '../../components/ui/loader/Loader';
import clsx from 'clsx';
import Size from '../../components/ui/size';
import { sizes } from '../../utils/sizes';

export const ProductPage = () => {
  const { data, loading } = useAppSelector((s) => s.product);
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) dispatch(fetchProduct(parseInt(slug)));
    dispatch(amountProduct(3));
    return () => {
      dispatch(clear());
    };
  }, [slug]);

  const addToCart = useCallback(() => {
    if (data) dispatch(addToBasket(data));
  }, [data]);

  return (
    <div className="container mb80">
      <div className={styles.head}>
        <Link to={routes.main} className={styles.head__back}>
          <IconArrowLeft />
        </Link>
        {data && !loading ? (
          <>
            <img
              className={clsx(styles.head__image, 'mb20')}
              src={data.image ? data.image : noProduct}
              alt=""
            />
            <div className={clsx(styles.heading, 'mb10')}>
              <h3 className="weight500">{data.title}</h3>
              <span className="f22 weight600">{data.price.toLocaleString()}₽</span>
            </div>
            <p className="mb10">{data.description}</p>
            <p className="mb20 f16-22">{data.fullDescription}</p>
          </>
        ) : loading ? (
          <Loader />
        ) : null}
        <div>
          <p className="mb10">Размер</p>
          <div className={styles.size}>
            {sizes.map((s) => (
              <div key={s}>
                <Size num={s} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={addToCart}>Add to card</button>
    </div>
  );
};
