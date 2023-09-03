import React, { useEffect, useState } from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import DefaultHeader from '../../components/header/main'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetOrderByIdQuery, usePatchOrderMutation } from '../../store/api/firebaseApi'
import foodExample from '../../assets/images/foodExample.jpg'
import doneTime from '../../assets/images/TimeTimeOrder.png'

const OrderSet = () => {
  const { idOrder } = useParams()
  const { data: dishes, isSuccess } = useGetOrderByIdQuery(idOrder)
  const { state: orderInfo } = useLocation()
  const [currentOrder, setCurrentOrder] = useState(false)
  const [showDishes, setShowDishes] = useState([])
  const [patchOrder] = usePatchOrderMutation()
  const [orderInfoState, setOrderInfoState] = useState(orderInfo)
  const [repeatProcess, setRepeatProcess] = useState(true)
  const [repeatProcess2, setRepeatProcess2] = useState(true)
  const navigate = useNavigate()
  const [readCancel, setReadCancel] = useState(false)

  //validacion de recibidos
  useEffect(() => {
    console.log("platos: ", dishes)
    console.log("info de ola orden: ", orderInfoState)
  }, [dishes])

  //validacion de tipo de pantalla
  useEffect(() => {
    if (orderInfoState.orderStatus === "CANCELLED" || orderInfoState.orderStatus === "DELIVERED") {
      setCurrentOrder(false)
    } else {
      setCurrentOrder(true)
    }
  }, [dishes, repeatProcess2, readCancel])

  //captura de platos
  useEffect(() => {
    if (isSuccess) {
      let newObj = dishes[0]
      let newArray = []
      for (const key in newObj) {
        if (typeof newObj[key] === 'object') {
          newArray.push(newObj[key]);
        }
      }
      console.log(newObj)
      console.log(newArray)
      setShowDishes(newArray)
      console.log("platos a mostrar", showDishes)
    }
  }, [isSuccess])

  //modificacion de orden
  // useEffect(() => {
  //   if (showDishes.length > 0) {
  //     orderInfo.orderStatus == "NONE" && modifyOrder("CONFIRMED")
  //     orderInfo.orderStatus == "CONFIRMED" && modifyOrder("COOKING")
  //     orderInfo.orderStatus == "COOKING" && modifyOrder("ONTHEWAY")
  //     orderInfo.orderStatus == "ONTHEWAY" && modifyOrder("DELIVERED")
  //   }
  // }, [showDishes])

  useEffect(() => {
    if (!readCancel) {
      if (showDishes.length > 0) {
        if (orderInfoState.orderStatus == "NONE") {
          modifyOrder("CONFIRMED")
          setOrderInfoState({ ...orderInfoState, orderStatus: "CONFIRMED" })
          setInterval(() => {
            setRepeatProcess(!repeatProcess)
          }, 5000);

        }
        if (orderInfoState.orderStatus == "CONFIRMED") {
          modifyOrder("COOKING")
          setOrderInfoState({ ...orderInfoState, orderStatus: "COOKING" })
          setInterval(() => {
            setRepeatProcess(!repeatProcess)
          }, 5000);
        }
        if (orderInfoState.orderStatus == "COOKING") {
          modifyOrder("ONTHEWAY")
          setOrderInfoState({ ...orderInfoState, orderStatus: "ONTHEWAY" })
          setInterval(() => {
            setRepeatProcess(!repeatProcess)
          }, 5000);
        }
        if (orderInfoState.orderStatus == "ONTHEWAY") {
          modifyOrder("DELIVERED")
          setOrderInfoState({ ...orderInfoState, orderStatus: "DELIVERED" })
          setInterval(() => {
            setRepeatProcess(!repeatProcess)
          }, 5000);
          setInterval(() => {
            setRepeatProcess2(!repeatProcess2)
          }, 2000);
        }
      }
    } else {
      modifyOrder("CANCELLED")
      setOrderInfoState({ ...orderInfoState, orderStatus: "DELIVERED" })
      setCurrentOrder(false)
    }

  }, [showDishes, repeatProcess, readCancel])

  const modifyOrder = async (newStatus) => {

    let infoToSend = {
      objState: newStatus,
      orderId: orderInfoState.id
    }
    console.log("objeto enviado: ", infoToSend)
    let response = await patchOrder(infoToSend)
    console.log("respuesta al patch del order: ", response)
  }

  const cancelOrder = async () => {
    // let infoToSend = {
    //   objState: "CANCELLED",
    //   orderId: orderInfoState.id
    // }
    // let response = await patchOrder(infoToSend)
    // console.log(response)
    setReadCancel(true)
    //setCurrentOrder(false)
    //navigate(-1)
  }


  return (
    <section className='OrderSet'>

      {currentOrder ? (
        showDishes.length ? (
          <section className='OrderSet'>
            <DefaultHeader text={"Current order"} />
            <section className='Current__container'>

              <article className='Current__container__timer'>
                <figure>
                  <img src={doneTime} alt="icono de tiempo" />
                </figure>
                <p className='timer__left'>15-20 min left</p>
                <div className={`timer__status ${orderInfoState.orderStatus}`}>
                  <div className='timer__status__box'>
                    <div className='circle circle1'></div>
                    <p>Confirmed</p>
                  </div>
                  <div className='timer__status__box'>
                    <div className='circle circle2'></div>
                    <p>Cooking</p>
                  </div>
                  <div className='timer__status__box'>
                    <div className='circle circle3'></div>
                    <p>On the way</p>
                  </div>
                  <div className='timer__status__box'>
                    <div className='circle circle4'></div>
                    <p>Delivered</p>
                  </div>
                </div>
              </article>

              <article className='Current__container__order'>
                {showDishes.map((element) => (
                  <div className='Current__order__ind' key={element.timestamp}>
                    <figure className='Current__order__image'>
                      <img src={element.imageDish || foodExample} alt="comida" />
                    </figure>
                    <span className='Current__order__number'>x{element.amount || "#"}</span>
                    <p className='Current__order__name'>{element.dish}</p>
                    <p className='Current__order__cost'>$ {element.price}</p>
                  </div>
                ))
                }
              </article>

              <article className='Current__container__summary'>
                <div className='summary__ind'>
                  <p>Products</p>
                  <p>$ {orderInfoState.productionCost}</p>
                </div>
                <div className='summary__ind'>
                  <p>Delivery</p>
                  <p>$ {orderInfoState.deliveryCost}</p>
                </div>
                <hr />
                <div className='summary__ind'>
                  <p className='total'>Total</p>
                  <p className='total'>$ {orderInfoState.orderPrice}</p>
                </div>
              </article>

              <p className='Current__container__next' onClick={cancelOrder}>CANCELAR</p>
            </section>
          </section>
        ) : (
          <p>Cargando... current</p>
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
          <p>Cargando... finished</p>
        )
      )
      }
    </section>
  )
}

export default OrderSet