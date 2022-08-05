import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, noProduct } from '../../assets';
import { routes } from '../../constantes/routes';
import { AppDispatch } from '../../store/store';
import { clear, fetchProduct } from '../../store/productSlice';
import { Helmet } from 'react-helmet-async';
import styles from './style.module.scss';
import { useAppSelector } from '../../store/hooks';
import { Loader } from '../../components/ui/loader/Loader';
import clsx from 'clsx';

export const ProductPage = () => {
  const { data, loading } = useAppSelector((s) => s.product);
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) dispatch(fetchProduct(parseInt(slug)));
    return () => {
      dispatch(clear());
      // throw new Error('Counter threw an error!');
    };
  }, [slug]);

  return (
    <div className="container mb80">
      {data ? (
        <Helmet>
          <title>{data.description}</title>
        </Helmet>
      ) : null}

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
            <div>
              <p>Размер</p>
              <form>
                <fieldset>
                  <div>
                    <input
                      id="1"
                      className={clsx(styles.hidden, styles.input)}
                      type="radio"
                      disabled
                    />
                    <label className={styles.label} htmlFor="1">
                      43
                    </label>
                  </div>
                  <div>
                    <input className={clsx(styles.hidden, styles.input)} id="2" type="radio" />
                    <label className={styles.label} htmlFor="2">
                      43
                    </label>
                  </div>
                </fieldset>
              </form>
            </div>
          </>
        ) : loading ? (
          <Loader />
        ) : null}
      </div>
    </div>
  );
};
