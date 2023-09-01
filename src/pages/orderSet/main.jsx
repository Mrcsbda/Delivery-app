import React, { useEffect, useState } from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import DefaultHeader from '../../components/header/main'
import { useLocation, useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../../store/api/firebaseApi'
import foodExample from '../../assets/images/foodExample.jpg'
import doneTime from '../../assets/images/TimeTimeOrder.png'

const OrderSet = () => {
  const { idOrder } = useParams()
  const { data: dishes } = useGetOrderByIdQuery("5iF4qRYJHrBru715jlIL")
  const { state: orderInfo } = useLocation()
  const [currentOrder, setCurrentOrder] = useState(false)
  const [showDishes, setShowDishes] = useState([])

  //validacion de recibidos
  useEffect(() => {
    console.log(dishes)
    console.log(orderInfo)
  }, [dishes])

  //validacion de tipo de pantalla
  useEffect(() => {
    if (orderInfo.orderStatus === "CANCELLED" || orderInfo.orderStatus === "DELIVERED") {
      setCurrentOrder(false)
    } else {
      setCurrentOrder(true)
    }
  }, [dishes])

  //captura de platos
  useEffect(() => {
    dishes && setShowDishes(dishes)
    console.log(showDishes)
  }, [dishes])

  return (
    <>

      {currentOrder ? (
        showDishes.length ? (
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
        ) : (
          <p>Cargando...</p>
        )
      ) : (
        showDishes.length ? (
          <>
            <DefaultHeader text={orderInfo.id} />
            <section className='OrderSet__container'>
              <article className='OrderSet__orders'>
                {
                  showDishes.map((item) => item &&
                    <div className='OrderSet__orders__ind' key={item.id}>
                      <div className='orders__info'>
                        <span>1x</span>
                        <p>{item.dish}</p>
                      </div>
                      <div className='orders__cost'>
                        <span>$ {item.price}</span>
                      </div>
                    </div>
                  )
                }
              </article>

              <article className='OrderSet__summary'>
                <div className='OrderSet__summary__ind'>
                  <p>Production cost</p>
                  <p className='ind__cost'>$ {orderInfo.productionCost}</p>
                </div>
                <div className='OrderSet__summary__ind'>
                  <p>Cost of delivery</p>
                  <p className='ind__cost'>$ {orderInfo.deliveryCost}</p>
                </div>
                <hr />
                <div className='OrderSet__summary__ind'>
                  <p className='total'>Total</p>
                  <p className='total'>$ {orderInfo.orderPrice}</p>
                </div>
              </article>
            </section>
          </>
        ) : (
          <p>Cargando...</p>
        )
      )


      }
    </>
  )
}

export default OrderSet