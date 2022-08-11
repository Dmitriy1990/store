import { FC, ReactNode, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { IconClose } from '../../assets';
import { Portal } from '../portal';
import clsx from 'clsx';
import styled from './style.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  notClose?: boolean;
  bottom?: boolean;
};

export const Modal: FC<Props> = ({ open, onClose, children, notClose, bottom }: Props) => {
  const pc = {
    from: { opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' }
  };

  const transitions = useTransition(open, pc);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return transitions(
    (styles, item) =>
      item && (
        <Portal>
          <div className={styled.wrap} onClick={handleContainerClick}>
            <animated.div style={styles} className={clsx(styled.anim, bottom && styled.bottom)}>
              <div className={styled.modal}>
                {!notClose ? <IconClose className={styled.close} onClick={onClose} /> : null}
                <>{children}</>
              </div>
            </animated.div>
          </div>
        </Portal>
      )
  );
};
