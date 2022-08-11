import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { IconBasket, IconHome, IconLikeFill, IconSearch } from '../../assets';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constantes/routes';

export const BottomNav = () => {
  const style = {
    borderBottom: '5px solid #000000'
  };
  const activeClassName = 'active';
  return (
    <nav className={styles.nav}>
      <div className={styles.list}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconHome />
        </NavLink>
        <NavLink
          to={routes.search}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconSearch />
        </NavLink>
        <NavLink
          to={routes.favorites}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconLikeFill className={styles.icon_like} />
        </NavLink>
        <NavLink
          to={routes.basket}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconBasket />
          <span className={styles.basket}>2</span>
        </NavLink>
      </div>
    </nav>
  );
};
