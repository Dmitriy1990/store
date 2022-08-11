import React, { useState, FC, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
import { IconArrowLeft } from '../../assets';
import styled from './style.module.scss';

type Props = {
  title: string;
  children: ReactNode;
};

export const Accordion: FC<Props> = ({ title, children }: Props) => {
  const [open, setOpen] = useState(false);

  const toggleHandler = (e: any) => {
    setOpen(!open);
  };

  const openAnimation = useSpring({
    from: { opacity: 0, maxHeight: '25px' },
    to: { opacity: 1, maxHeight: open ? '500px' : '25px' }
    // config: { duration: '300' }
  });

  const iconAnimation = useSpring({
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: open ? 'rotate(90deg)' : 'rotate(270deg)'
    }
    // config: { duration: '120' }
  });

  return (
    <animated.div className={styled.accordion__item} style={openAnimation}>
      <div className={styled.accordion__header} onClick={toggleHandler}>
        <h4 className={styled.accordion__title}>{title}</h4>
        <animated.i style={iconAnimation}>
          <IconArrowLeft className={styled.accordion__icon} />
        </animated.i>
      </div>
      <div className={styled.accordion__content}>{children}</div>
    </animated.div>
  );
};
