import React from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import DefaultHeader from '../../components/header/main'

const OrderSet = () => {
  return (
    <section className='OrderSet'>
      <DefaultHeader text={"26.11.2023"} />
      <section className='OrderSet__container'>
        <article className='OrderSet__orders'>
          <div className='OrderSet__orders__ind'>
            <div className='orders__info'>
              <span>1x</span>
              <p>Meat Pizza(medium)</p>
            </div>
            <div className='orders__cost'>
              <span>$35.50</span>
            </div>
          </div>

          <div className='OrderSet__orders__ind'>
            <div className='orders__info'>
              <span>1x</span>
              <p>Combined pizza(small)</p>
            </div>
            <div className='orders__cost'>
              <span>$30.99</span>
            </div>
          </div>
        </article>

        <article className='OrderSet__summary'>
          <div className='OrderSet__summary__ind'>
            <p>Production cost</p>
            <p className='ind__cost'>66.49$</p>
          </div>
          <div className='OrderSet__summary__ind'>
            <p>Cost of delivery</p>
            <p className='ind__cost'>$8.0</p>
          </div>
          <hr />
          <div className='OrderSet__summary__ind'>
            <p className='total'>Total</p>
            <p className='total'>$74.49</p>
          </div>
        </article>
      </section>
    </section>
  )
}

export default OrderSet