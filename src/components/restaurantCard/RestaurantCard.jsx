import React from 'react'
import "./restaurantCard.scss"

const RestaurantCard = ({restaurant}) => {
  return (
    <section className='restaurant'>
        <figure className='restaurant__image-container'>
            <img className='restaurant__image' src={restaurant.image} alt={`${restaurant.name} icon`} />
        </figure>
        <div className='restaurant__info-container'>
            <h2 className='restaurant__title'>{restaurant.name}</h2>
            <div className='restaurant__rate'>
            </div>
            <p className='restaurant__schedule'>Work time {restaurant.schedule}</p>
            <p className='restaurant__delivery-price'>Delivery price <span>{restaurant.deliveryPrice}</span></p>
        </div>
    </section>
  )
}

export default RestaurantCard