import React from 'react'
import './main.scss'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import nextArrow from '../../assets/images/NextArrowIcon.svg'
import defaultRestaurant from '../../assets/images/restaurant-logo.jpg'
import DefaultHeader from '../../components/header/main'

const AllOrders = () => {
  return (
    <>
      <DefaultHeader text={"All orders"} />
      <section className='AllOrders__container'>
        <article className='AllOrders__orders'>
          <div className='AllOrders__orders__ind'>
            <div className='orders__info'>
              <figure>
                <img src={defaultRestaurant} alt="restaurante" />
              </figure>
              <div>
                <p>Pardes restaurant</p>
                <span>$ 132.00</span>
              </div>
            </div>
            <div className='orders__status'>
              <p className='orders__status__delivered'>Delivered</p>
              <figure>
                <img src={nextArrow} alt="siguiente" />
              </figure>
            </div>

          </div>

          <div className='AllOrders__orders__ind'>
            <div className='orders__info'>
              <figure>
                <img src={defaultRestaurant} alt="restaurante" />
              </figure>
              <div>
                <p>Pardes restaurant</p>
                <span>$ 132.00</span>
              </div>
            </div>
            <div className='orders__status'>
              <p className='orders__status__cancelled'>Cancelled</p>
              <figure>
                <img src={nextArrow} alt="siguiente" />
              </figure>
            </div>
          </div>

          <div className='AllOrders__orders__ind'>
            <div className='orders__info'>
              <figure>
                <img src={defaultRestaurant} alt="restaurante" />
              </figure>
              <div>
                <p>Pardes restaurant</p>
                <span>$ 132.00</span>
              </div>
            </div>
            <div className='orders__status'>
              <p className='orders__status__ongoing'>Ongoing</p>
              <figure>
                <img src={nextArrow} alt="siguiente" />
              </figure>
            </div>
          </div>

        </article>
      </section>
    </>
  )
}

export default AllOrders