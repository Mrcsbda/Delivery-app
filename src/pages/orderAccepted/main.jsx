import React from 'react'
import Done from '../../assets/images/Done1000.png'
import './main.scss'
import DefaultHeader from '../../components/header/main'
import useScreenSize from '../../assets/hooks/useScreenSize'

const OrderAccepted = () => {
  const {width, height} = useScreenSize()

  return (
    <section className='OrderAccepted'>
      <DefaultHeader text={"Order is accepted"} />
      <section className='OrderAccepted__container'>
        <figure className='OrderAccepted__container__figure'>
          { width < 600 ?
            <img src={Done} alt="finalizado" />
            :  <img src="/images/desktopOrdeIsacepted.svg" alt="finalizado" />
            }
        </figure>
        <p>Follow order</p>
      </section>
    </section>
  )
}

export default OrderAccepted