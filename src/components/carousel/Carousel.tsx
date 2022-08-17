import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styles from './styles.module.scss';
import { slide } from '../../assets';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/pagination';

export const Slides = () => {
  return (
    <div className={styles.swiper}>
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        modules={[Pagination]}
        spaceBetween={10}
        loop
        className="mySwiper">
        <SwiperSlide>
          <div className={styles.slide}>
            <div className={styles.content}>
              <h2 className="f28 cWhite weight700">Скидки до 40% </h2>
              <p className={clsx(styles.content__desc, 'f16 cWhite weight700')}>
                На всю продукцию бренда Nike
              </p>
            </div>
            <img src={slide} alt="" className={styles.slide__image} />
          </div>{' '}
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide}>
            <div className={styles.content}>
              <h2 className="f28 cWhite weight700">Скидки до 40% </h2>
              <p className={clsx(styles.content__desc, 'f16 cWhite weight700')}>
                На всю продукцию бренда Nike
              </p>
            </div>
            <img src={slide} alt="" className={styles.slide__image} />
          </div>{' '}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export const Carousel = React.memo(Slides);
