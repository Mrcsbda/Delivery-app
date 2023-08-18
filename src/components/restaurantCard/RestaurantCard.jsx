import React, { useEffect, useState } from 'react'
import "./restaurantCard.scss"

const RestaurantCard = ({restaurant}) => {
  const [rateStars, setRateStars] = useState([])

  useEffect(()=> {
    createRating()
  },[])

  const  createRating = () => {
    let rating = []
    for(let i = 1; i <= 5; i++) {
      i <= restaurant.rate ? rating.push("full") :  rating.push("empty")
    }
    setRateStars(rating)
  }

  return (
    <section className='restaurant'>
        <figure className='restaurant__image-container'>
            <img className='restaurant__image' src={restaurant.image} alt={`${restaurant.name} icon`} />
            <img className='restaurant__rectangle' src="/images/rectangle.svg" alt="" />
        </figure>
        <div className='restaurant__info-container'>
            <h2 className='restaurant__title'>{restaurant.name}</h2>
            <figure className='restaurant__rate'>
              {
                rateStars.length && (
                  rateStars.map((rate, i) =>(
                    <img
                    className={`restaurant__rate-icon ${rate === "full" ? "restaurant__star-full" : "restaurant__star-empty"}`}
                    key={i}
                    src="/images/star-full.svg"
                    alt='star icon'/>
                  ))
                )
              }
            </figure>
            <p className='restaurant__schedule'>Work time {restaurant.schedule}</p>
            <p className='restaurant__delivery-price'>Delivery price <span>{restaurant.deliveryPrice}</span></p>
        </div>
    </section>
  )
}

export default RestaurantCard