import React from 'react'
import Done from '../../assets/images/Done1000.png'
import './main.scss'
import DefaultHeader from '../../components/header/main'

const OrderAccepted = () => {
  return (
    <>
      <DefaultHeader text={"Order is accepted"} />
      <section className='OrderAccepted__container'>
        <figure className='OrderAccepted__container__figure'>
          <img src={Done} alt="finalizado" />
        </figure>
        <p>Follow order</p>
      </section>
    </>
  )
}

export default OrderAccepted