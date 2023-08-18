import React from 'react'
import "./feed.scss"
import BannerCarrousel from '../../components/bannerCarrousel/BannerCarrousel'
import CategoriesCarrousel from '../../components/categoriesCarrousel/CategoriesCarrousel'
import RestaurantCard from '../../components/restaurantCard/RestaurantCard'


const Feed = () => {
  const restaurants = [
    {
      image: "https://images.rappi.com/products/55f74661-37c4-4455-bd23-5a725b055d48-1682190461465.png",
      name: "The Grill Station Burguer",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/tmp2665513210233268625501871341.png",
      name: "Percimon",
      rate: 4,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/2092027792-1617735043780.png",
      name: "Trapani",
      rate: 4,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/2701738c-1b40-4826-85db-2fc3d2976036-1671512292568.png",
      name: "Chicks son Alitas",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/tmp314325013396576376839747298.png",
      name: "KFC Alitas",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/55f74661-37c4-4455-bd23-5a725b055d48-1682190461465.png",
      name: "The Grill Station Burguer",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    }
  ]
  return (
    <article className='feed'>
      <section className='feed__location-container'>
        <img src="/images/location.svg" alt="location icon" className='feed__location-icon' />
        <div className='feed__address-container'>
          <p className='feed__address-title'>DELIVER TO</p>
          <div className='feed__address'>
            <p className='feed__address-text'>882 Well St, New-York</p>
            <img src="/images/arrow-down.svg" alt="arrow icon" className='feed__arrow-icon' />
          </div>
        </div>
      </section>
      <BannerCarrousel />
      <p className='feed__subtitle'>Restaurants and cafes</p>
      <CategoriesCarrousel />
      <div className='feed__restaurants-container'>
        {
          restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        }
      </div>
    </article>
  )
}

export default Feed