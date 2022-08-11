import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { IconLike, noProduct } from '../../assets';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import { routes } from '../../constantes/routes';

type Props = {
  column: boolean;
  item: Product;
};

export const ProductCard: React.FC<Props> = ({ column, item }: Props) => {
  return (
    <>
      <Link
        to={routes.main + item.id}
        className={clsx(styles.product, column && styles.product_column)}>
        <img
          className={clsx(styles.product__image)}
          src={item.image ? item.image : noProduct}
          alt="nike"
        />
        <div className={styles.product_info}>
          <h3 className={clsx(styles.product__title, 'f16 weight500 mb10')}>{item.title}</h3>
          <p className={clsx(styles.product__desc, 'f12 mb8')}>{item.description}</p>
          <div className={clsx(styles.price, 'f14')}>
            <del className={clsx(styles.price__old, 'cLight')}>
              {item.oldPrice.toLocaleString()}₽
            </del>
            <span className="weight600">{item.price.toLocaleString()} ₽</span>
          </div>
        </div>
        {item.discount ? <div className={styles.discount}>{item.discount * 100}%</div> : null}
        <div className={styles.like}>
          <IconLike />
        </div>
      </Link>
    </>
  );
};
