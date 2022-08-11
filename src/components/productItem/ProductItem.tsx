import React, { FC } from 'react';
import { IconDec, IconPlus, IconTrash, noProduct, IconBasket } from '../../assets';
import styles from './style.module.scss';

type Props = {
  favorites?: boolean;
};

export const ProductItem: FC<Props> = ({ favorites }: Props) => {
  return (
    <div className={styles.product}>
      <img className={styles.product__image} src={noProduct} alt="" />
      <div className={styles['product-desc']}>
        <IconTrash className={styles.product__delete} />
        {favorites ? <IconBasket className={styles.product__basket} /> : null}
        <p className="f16 cBlackDeep mb4">Nike</p>
        <p className="f16 cBlackDeep mb10">Air Force 1 Shadow Beige Pale Ivory</p>
        <div className="f18 weight500 mb10">10 800₽</div>
        {!favorites ? (
          <div className={styles['product-bottom']}>
            <div className={styles.counter}>
              <button className={styles.counter__btn}>
                <IconDec />
              </button>
              <span className={styles.counter__result}>11</span>
              <button className={styles.counter__btn}>
                <IconPlus />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
