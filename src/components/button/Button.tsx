import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'yellow';

type Props = {
  text?: string;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  fluid?: boolean;
  size?: 'large' | 'small';
  disabled?: boolean;
  children?: ReactNode;
  id?: string | undefined;
};

export const Button: FC<Props> = ({
  children,
  text,
  onClick,
  className,
  variant,
  fluid,
  size = 'small',
  disabled,
  id
}: Props) => {
  return (
    <button
      id={id}
      disabled={disabled}
      className={clsx(
        styles.btn,
        { [styles.fluid]: fluid },
        variant && styles[variant],
        styles[size],
        className
      )}
      onClick={onClick}>
      {children || text}
    </button>
  );
};
