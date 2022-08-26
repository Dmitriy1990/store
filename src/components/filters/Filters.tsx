import React, { useState, FC, Suspense, lazy } from 'react';

import 'rc-slider/assets/index.css';
import styles from './style.module.scss';
import clsx from 'clsx';

import { Colors } from '../../types/filter';
import { sizes } from '../../utils/sizes';

const Modal = lazy(() => import('../../components/modal'));
const Slider = lazy(() => import('rc-slider'));
const Radio = lazy(() => import('../ui/radio'));
const Accordion = lazy(() => import('../accordeon'));
const Checkbox = lazy(() => import('../ui/checkbox'));
const Size = lazy(() => import('../ui/size'));

type Props = {
  open: boolean;
  setOpen: (o: boolean) => void;
};

export const Filters: FC<Props> = ({ open, setOpen }: Props) => {
  const [rcValue, setRcValue] = useState([0, 30]);
  const [checked, setChecked] = useState(false);
  const onAfterChange = (value: number[] | number) => {
    console.log('value', value);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} bottom>
      <h3 className="mb20 f16 ">Фильтры</h3>
      <div className={styles.filter}>
        <h4 className="f16 weight500 mb10">Цена</h4>
        <div className={styles.filter_box}>
          <input className={styles.field} type="text" />
          <span className={styles.dash} />
          <input className={styles.field} type="text" />
        </div>
        <div className={clsx(styles['slider'], 'mb20')}>
          <Suspense fallback={<div></div>}>
            <Slider
              allowCross={false}
              range
              step={1}
              min={1}
              max={168}
              defaultValue={rcValue}
              onChange={onAfterChange}
            />
          </Suspense>
        </div>
        <div className="mb20">
          <Suspense fallback={<div></div>}>
            <Accordion title="Скидка">
              <Radio className="mb10" checked={checked} onChange={() => setChecked(!checked)}>
                <span className="f14 mb10">Со скидкой</span>
              </Radio>
              <Radio checked={!checked} onChange={() => setChecked(!checked)}>
                <span className="f14">Без скидки</span>
              </Radio>
            </Accordion>
          </Suspense>
        </div>
        <div className="mb20">
          <Suspense fallback={<div></div>}>
            <Accordion title="Цвет">
              <div className={styles.colors}>
                {Object.values(Colors).map((c) => (
                  <div key={c} className="mb10">
                    <Checkbox name="red" bgColor={c} />
                  </div>
                ))}
              </div>
            </Accordion>
          </Suspense>
        </div>
        <div className="mb20">
          <Suspense fallback={<div></div>}>
            <Accordion title="Размеры">
              <div className={styles.colors}>
                {sizes.map((s) => (
                  <div key={s} className="mb10">
                    <Size num={s} />
                  </div>
                ))}
              </div>
            </Accordion>
          </Suspense>
        </div>
        <div className="mb20">
          <Suspense fallback={<div></div>}>
            <Accordion title="Пол">
              <Radio className="mb10" checked={checked} onChange={() => setChecked(!checked)}>
                <span className="f14 mb10">Мужской</span>
              </Radio>
              <Radio checked={!checked} onChange={() => setChecked(!checked)}>
                <span className="f14">Женский</span>
              </Radio>
            </Accordion>
          </Suspense>
        </div>
      </div>
    </Modal>
  );
};
