import React, { useEffect, useState } from 'react'
import "./restaurantCard.scss"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RestaurantCard = ({restaurant}) => {
  const [rateStars, setRateStars] = useState([])
  const navigate = useNavigate()
  const {userRole} = useSelector(state => state.user)
  
  useEffect(()=> {
    createRating()
  },[])

  const  createRating = () => {
    let rating = []
    for(let i = 1; i <= 5; i++) {
      i <= restaurant.rating ? rating.push("full") :  rating.push("empty")
    }
    setRateStars(rating)
  }

  const getTime = (date) => {
    const time = new Date(date)
    return `${time.getHours()}:${time.getMinutes()}0`
  }

  const navigateToRestaurant = ()=>{
    userRole === "CLIENT" &&  navigate(`restaurant/${restaurant.id}`)
 }

  return (
    <section className='restaurant-card' id={restaurant.id} onClick={navigateToRestaurant}>
        <figure className='restaurant-card__image-container'>
            <img className='restaurant-card__image' src={restaurant.image} alt={`${restaurant.name} icon`} />
            <img className='restaurant-card__rectangle' src="/images/rectangle.svg" alt="" />
        </figure>
        <div className='restaurant-card__info-container'>
            <h2 className='restaurant-card__title'>{restaurant.name}</h2>
            <figure className='restaurant-card__rate'>
              {
                rateStars.length && (
                  rateStars.map((rate, i) =>(
                    <img
                    className={`restaurant-card__rate-icon ${rate === "full" ? "restaurant-card__star-full" : "restaurant-card__star-empty"}`}
                    key={i}
                    src="/images/star-full.svg"
                    alt='star icon'/>
                  ))
                )
              }
            </figure>
            <p className='restaurant-card__schedule'>Work time {getTime(restaurant.startTime)} - {getTime(restaurant.endTime)}</p>
            <p className='restaurant-card__delivery-price'>Delivery price <span>{restaurant.deliveryPrice} $</span></p>
        </div>
    </section>
  )
}

export default RestaurantCard