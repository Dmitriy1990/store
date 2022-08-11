import clsx from 'clsx';
import React, { FC, ReactElement, ChangeEvent, ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  value?: string;
  className?: string;
};

export const Radio: FC<Props> = (props: Props): ReactElement => {
  const { checked, onChange, children, value, className } = props;
  return (
    <label className={clsx(styles.labelContainer, className)}>
      <input
        className={styles.radioInput}
        value={value}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.radioIcon} />
      <div className={styles.label}>{children}</div>
    </label>
  );
};
