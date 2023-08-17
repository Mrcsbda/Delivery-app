import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './bannerCarrousel.scss';

const BannerCarrousel = () => {
    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                    500: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <figure className='slide-container'>
                        <img className='slide' src="/images/slide-1.jpg" alt="" />
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className='slide-container'>
                        <img className='slide' src="/images/slide-2.jpg" alt="" />
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className='slide-container'>
                        <img className='slide' src="/images/slide-3.jpg" alt="" />
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className='slide-container'>
                        <img className='slide' src="/images/slide-4.jpg" alt="" />
                    </figure>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default BannerCarrousel