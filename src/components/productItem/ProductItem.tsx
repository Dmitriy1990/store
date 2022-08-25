import React, { FC, useCallback, useEffect, useState } from 'react';
import { IconDec, IconPlus, IconTrash, noProduct, IconBasket } from '../../assets';
import useDebounce from '../../hooks/useDebounce';
import styles from './style.module.scss';

type Props = {
  favorites?: boolean;
};

export const ProductItem: FC<Props> = ({ favorites }: Props) => {
  const [count, setCount] = useState(1);
  const debounce = useDebounce(count, 500);
  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const dec = useCallback(() => {
    if (count > 1) {
      setCount(count - 1);
    }
  }, [count]);

  useEffect(() => {
    console.log('value deb', debounce);
  }, [debounce]);

  return (
    <div className={styles.product}>
      <img className={styles.product__image} src={noProduct} alt="" />
      <div className={styles['product-desc']}>
        <IconTrash className={styles.product__delete} />
        {favorites ? <IconBasket className={styles.product__basket} /> : null}
        <p className="f16 cBlackDeep mb4">Nike</p>
        <p className="f16 cBlackDeep mb10">Air Force 1 Shadow Beige Pale Ivory</p>
        <div className="f18 weight500 mb10">10 800₽</div>
        <label>
          userName
          <input type="text" />
        </label>
        {!favorites ? (
          <div className={styles['product-bottom']}>
            <div className={styles.counter}>
              <button className={styles.counter__btn} onClick={dec} data-testid="dec">
                <IconDec />
              </button>
              <span className={styles.counter__result} data-testid="counter">
                {count}
              </span>
              <button className={styles.counter__btn} onClick={add} data-testid="add">
                <IconPlus />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
