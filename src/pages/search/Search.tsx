import React from 'react';
import { IconSearchBig, IconSearchPure } from '../../assets';
import styles from './style.module.scss';

export const Search = () => {
  return (
    <div className="container mt20">
      <div className="mb30">
        <form className={styles.form}>
          <button className={styles.btn} type="submit">
            <IconSearchPure />
          </button>
          <input
            className={styles.field}
            type="text"
            placeholder="Введите"
            data-testid="search_input"
          />
        </form>
      </div>
      <div className={styles['not-found']}>
        <IconSearchBig className={styles['not-found__icon']} />
        {/* <h4 className="f28 cLight">Товары не найдены</h4> */}
      </div>
    </div>
  );
};
