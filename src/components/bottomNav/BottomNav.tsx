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
        {/* <li className={styles.list__item}> */}
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconHome />
        </NavLink>
        {/* </li>
        <li className={styles.list__item}> */}
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconSearch />
        </NavLink>
        {/* </li>
        <li className={styles.list__item}> */}
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconLikeFill className={styles.icon_like} />
        </NavLink>
        {/* </li>
        <li className={styles.list__item}> */}
        <NavLink
          to={routes.basket}
          className={({ isActive }) =>
            clsx(isActive ? styles.active : undefined, styles.list__item)
          }>
          <IconBasket />
        </NavLink>
        {/* </li> */}
      </div>
    </nav>
  );
};
