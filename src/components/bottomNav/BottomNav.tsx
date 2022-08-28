import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { IconBasket, IconHome, IconLikeFill, IconSearch } from '../../assets';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constantes/routes';
import { useAppSelector } from '../../store/hooks';

export const BottomNav = () => {
  const { data } = useAppSelector((state) => state.basket);
  return (
    <nav className={styles.nav}>
      <div className={styles.list}>
        <NavLink
          aria-label="Главная"
          to={'/'}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconHome className="svg" />
        </NavLink>
        <NavLink
          aria-label="Поиск"
          to={routes.search}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconSearch className="svg svg-stroke" />
        </NavLink>
        <NavLink
          aria-label="Избранное"
          to={routes.favorites}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconLikeFill className={clsx(styles.icon_like, 'svg')} />
        </NavLink>
        <NavLink
          aria-label="Корзина"
          to={routes.basket}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconBasket className="svg" />
          {data.length ? (
            <span className={styles.basket}>{data.length ? data.length : '9+'}</span>
          ) : null}
        </NavLink>
      </div>
    </nav>
  );
};
