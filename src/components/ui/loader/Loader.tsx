import React from 'react';
import './style.scss';
import clsx from 'clsx';

export const Loader = () => {
  return (
    <div className="loader-container">
      <i className={clsx('loader --7')}></i>
    </div>
  );
};
