import React from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import nextArrow from '../../assets/images/NextArrowIcon.svg'
import LocationYellow from '../../assets/images/LocationYellowIcon.svg'
import mastercard from '../../assets/images/mastercard.svg'
import visa from '../../assets/images/visa-classic.svg'
import foodExample from '../../assets/images/foodExample.jpg'
import DefaultHeader from '../../components/header/main'
import { useSelector } from 'react-redux'


const NewOrder = () => {
  const { orders } = useSelector(state => state.cart)
  console.log(orders)
  return (
    <>
      <DefaultHeader text={"New order"} />
      <section className='NewOrder__container'>
        <article className='NewOrder__deliver'>
          <p className='NewOrder__deliver__text mini-title'>Deliver to</p>
          <div className='NewOrder__deliver__box'>
            <figure className='NewOrder__deliver__location'>
              <img src={LocationYellow} alt="icono de ubicacion" />
            </figure>
            <p className='NewOrder__deliver__adress'>882 Well St, New-York</p>
            <figure className='NewOrder__deliver__next'>
              <img src={nextArrow} alt="boton de siguiente" />
            </figure>
          </div>
        </article>

        <article className='NewOrder__payment'>
          <p className='NewOrder__payment__text'>Payment</p>
          <div className='NewOrder__payment__box'>
            <div className='NewOrder__payment__cash selected'>Cash</div>
            <div className='NewOrder__payment__card'>
              <figure>
                <img src={mastercard} alt="targeta mastercard" />
              </figure>
              <p>Master Card</p>
            </div>
            <div className='NewOrder__payment__card'>
              <figure>
                <img src={visa} alt="targeta visa" />
              </figure>
              <p>Visa</p>
            </div>
          </div>
        </article>

        <article className='NewOrder__order'>
          {/* <div className='NewOrder__order__ind'>
            <figure className='NewOrder__order__image'>
              <img src={foodExample} alt="comida" />
            </figure>
            <div className='NewOrder__order__console'>
              <span className='NewOrder__order__minus'>-</span>
              <span className='NewOrder__order__number'>1</span>
              <span className='NewOrder__order__plus'>+</span>
            </div>
            <p className='NewOrder__order__name'>Vegetarian pizza</p>
            <p className='NewOrder__order__cost'>$ 32.00</p>
          </div> */}
          {
            orders && orders.map((element, index) => element &&
              <div className='NewOrder__order__ind' key={index}>
                <figure className='NewOrder__order__image'>
                  <img src={foodExample} alt="comida" />
                </figure>
                <div className='NewOrder__order__console'>
                  <span className='NewOrder__order__minus'>-</span>
                  <span className='NewOrder__order__number'>{element.quantity}</span>
                  <span className='NewOrder__order__plus'>+</span>
                </div>
                <p className='NewOrder__order__name'>{element.dish}</p>
                <p className='NewOrder__order__cost'>$ {element.price}</p>
              </div>
            )
          }

        </article>

        <article className='NewOrder__extraInfo'>
          <p>Note</p>
          <textarea placeholder='write something'></textarea>
        </article>

        <article className='NewOrder__summary'>
          <div className='NewOrder__summary__ind'>
            <p>Products</p>
            <p>60.45$</p>
          </div>
          <div className='NewOrder__summary__ind'>
            <p>Delivery</p>
            <p>4.5$</p>
          </div>
          <hr />
          <div className='NewOrder__summary__ind'>
            <p className='total'>Total</p>
            <p className='total'>64.95$</p>
          </div>
        </article>

        <p className='NewOrder__final'>order</p>
      </section>
    </>
  )
}

export default NewOrder