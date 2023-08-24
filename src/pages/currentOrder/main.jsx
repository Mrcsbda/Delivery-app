import React from 'react'
import './main.scss'
import foodExample from '../../assets/images/foodExample.jpg'
import doneTime from '../../assets/images/TimeTimeOrder.png'
import DefaultHeader from '../../components/header/main'

const CurrentOrder = () => {
  return (
    <>
      <DefaultHeader text={"Current order"} />
      <section className='Current__container'>

        <article className='Current__container__timer'>
          <figure>
            <img src={doneTime} alt="icono de tiempo" />
          </figure>
          <p className='timer__left'>15-20 min left</p>
          <div className='timer__status'>
            <div className='timer__status__box'>
              <div className='circle completed'></div>
              <p>Confirmed</p>
            </div>
            <div className='timer__status__box ongoing'>
              <div className='circle ongoing'></div>
              <p>Cooking</p>
            </div>
            <div className='timer__status__box'>
              <div className='circle waiting'></div>
              <p>On the way</p>
            </div>
            <div className='timer__status__box'>
              <div className='circle waiting'></div>
              <p>Delivered</p>
            </div>
          </div>
        </article>

        <article className='Current__container__order'>
          <div className='Current__order__ind'>
            <figure className='Current__order__image'>
              <img src={foodExample} alt="comida" />
            </figure>
            <span className='Current__order__number'>x1</span>
            <p className='Current__order__name'>Vegetarian pizza</p>
            <p className='Current__order__cost'>$ 32.00</p>
          </div>
        </article>

        <article className='Current__container__summary'>
          <div className='summary__ind'>
            <p>Products</p>
            <p>60.45$</p>
          </div>
          <div className='summary__ind'>
            <p>Delivery</p>
            <p>4.5$</p>
          </div>
          <hr />
          <div className='summary__ind'>
            <p className='total'>Total</p>
            <p className='total'>64.95$</p>
          </div>
        </article>

        <p className='Current__container__next'>Support</p>
      </section>
    </>
  )
}

export default CurrentOrder