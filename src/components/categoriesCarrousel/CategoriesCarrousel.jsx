import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './categoriesCarrousel.scss';

const CategoriesCarrousel = () => {
    const [selected, setSelected] = useState("All")
    const categories = [
        {
            pathImage: "/images/fast-food.png",
            category: "Fast Food"
        },
        {
            pathImage: "/images/healthy.png",
            category: "Healthy"
        },
        {
            pathImage: "/images/burguer.png",
            category: "Burguer"
        },
        {
            pathImage: "/images/pizza.png",
            category: "Pizza"
        },
        {
            pathImage: "/images/chicken.png",
            category: "Chicken"
        },
    ]

    const selectCategories = (category) => {
        setSelected(category)
    }

    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                breakpoints={{
                    500: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 8,
                        spaceBetween: 20,
                    },
                    2000: {
                        slidesPerView: 10,
                        spaceBetween: 20,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div
                        className={`category__container ${selected === "All" ? "category__selected" : ""}`}
                        onClick={() => selectCategories("All")}
                    >
                        <p className='category__name'>All</p>
                    </div>
                </SwiperSlide>
                {
                    categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`category__container ${selected === category.category ? "category__selected" : ""}`}
                                onClick={() => selectCategories(category.category)}
                            >
                                <img className="category__icon" src={category.pathImage} alt={`${category.category} icon`} />
                                <p className='category__name'>{category.category}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}

export default CategoriesCarrousel