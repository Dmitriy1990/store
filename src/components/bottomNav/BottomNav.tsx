import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { IconBasket, IconHome, IconLikeFill, IconSearch } from '../../assets';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constantes/routes';

export const BottomNav = () => {
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
          <span className={styles.basket}>2</span>
        </NavLink>
      </div>
    </nav>
  );
};
