import React, { FC, ReactElement, ReactNode, ChangeEvent } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

type Props = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value?: string;
  name: string;
  children?: ReactNode;
  bgColor?: string;
};

export const Checkbox: FC<Props> = (props: Props): ReactElement => {
  const { checked, onChange, label, name, children, bgColor } = props;
  return (
    <label className={styles['label-container']}>
      <input
        className={styles.input}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={clsx(styles['checkbox-icon'], bgColor && styles[bgColor])} />
      {children}
    </label>
  );
};
