import React, { FC, useCallback, useEffect, useState } from 'react';
import { IconDec, IconPlus, IconTrash, noProduct, IconBasket } from '../../assets';
import useDebounce from '../../hooks/useDebounce';
import { Product } from '../../types/product';
import styles from './style.module.scss';

type Props = {
  favorites?: boolean;
  data: Product;
  onDelete: (id: number) => void;
  changeCount?: (data: Product, count: number) => void;
};

export const ProductItem: FC<Props> = ({ favorites, data, onDelete, changeCount }: Props) => {
  const [count, setCount] = useState(data.count);
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
    changeCount && changeCount(data, count);
  }, [debounce]);

  const deleteItem = () => {
    onDelete(data.id);
  };

  return (
    <div className={styles.product}>
      <img className={styles.product__image} src={data.image ? data.image : noProduct} alt="" />
      <div className={styles['product-desc']}>
        <IconTrash className={styles.product__delete} onClick={deleteItem} />
        {favorites ? <IconBasket className={styles.product__basket} /> : null}
        <p className="f16 cBlackDeep mb4">{data.title}</p>
        <p className="f16 cBlackDeep mb10">{data.description}</p>
        <div className="f18 weight500 mb10">{data.price.toLocaleString()}₽</div>

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
