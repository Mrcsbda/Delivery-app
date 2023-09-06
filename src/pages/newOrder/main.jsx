import React from 'react'
//import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import nextArrow from '../../assets/images/NextArrowIcon.svg'
import LocationYellow from '../../assets/images/LocationYellowIcon.svg'
import mastercard from '../../assets/images/mastercard.svg'
import visa from '../../assets/images/visa-classic.svg'
import foodExample from '../../assets/images/foodExample.jpg'
import DefaultHeader from '../../components/header/main'
import { useDispatch, useSelector } from 'react-redux'
import { removeOrder, resetOrders, updateOrder } from '../../store/slides/cart'
import { useAddOrderMutation, useAddOrdersMutation, useGetRestaurantsQuery } from '../../store/api/firebaseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const NewOrder = () => {
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.cart)
  const userInfo = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [arrayBoss, setArrayBoss] = useState([])
  const [paymentMeth, setPayomentMeth] = useState("cash")
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const watchFields = watch("orderNote")

  //toca pedir los restaurantes para las imagene sy nombres
  const { data: restaurants, isLoading, isSuccess } = useGetRestaurantsQuery()
  const [restaurantsInfo, setRestaurantsInfo] = useState(false)
  const [ordersInfo, setOrdersInfo] = useState(false)
  const [totalOrdersCost, setTotalOrdersCost] = useState(0)

  //mutacion para hacer ordenes
  const [addOrder] = useAddOrderMutation() //llenar la orden con los platos
  const [addOrders] = useAddOrdersMutation() //crear la orden

  //repetidores y verificadores
  const [repeatRestaurants, setRepeatRestaurants] = useState(false)
  const [repeatOrders, setRepeatOrders] = useState(false)


  //para mostrar capturada al inicio
  useEffect(() => {
    if (isSuccess) {
      setRestaurantsInfo(restaurants)
      restaurantsInfo === false && setRepeatRestaurants(!repeatRestaurants)
    }
  }, [isSuccess])

  //informacion cambiante de ordenes
  useEffect(() => {
    setOrdersInfo(orders)
    ordersInfo === false && setRepeatOrders(!repeatOrders)
  }, [orders])

  //cambio del precio
  useEffect(() => {
    if (ordersInfo.length) {
      let preSum = 0
      for (let i = 0; i < ordersInfo.length; i++) {
        let newSum = (ordersInfo[i].quantity * ordersInfo[i].basePrice).toFixed(2)
        preSum += parseFloat(newSum);
      }
      setTotalOrdersCost(Number(preSum.toFixed(2)))
    }
  }, [ordersInfo])

  //control del form


  const orderNow = async () => {
    setArrayBoss([]) //para limpiar
    //opcion de forEach
    restaurants.forEach(rest => {
      let box = [];
      let ordCost = 0;
      orders.forEach(ord => {
        if (rest.id == ord.idRestaurant) {
          box.push(ord);
          ordCost += ord.price
        }
      })
      if (ordCost > 0) {
        let newItem = {
          dishesX: box,
          clientKeyX: userInfo.key,
          costOfDeliveryX: 5,
          orderStatusX: "NONE",
          productionCostX: ordCost,
          restaurantKeyX: rest.id,
          totalPaidX: (ordCost + 5)
        }
        let newArray = arrayBoss;
        newArray.push(newItem)
        setArrayBoss(newArray)
      }
    });

    for (let k = 0; k < arrayBoss.length; k++) {
      const objTest = {
        clientKey: arrayBoss[k].clientKeyX,
        costOfDelivery: arrayBoss[k].costOfDeliveryX,
        orderStatus: arrayBoss[k].orderStatusX,
        productionCost: arrayBoss[k].productionCostX,
        restaurantKey: arrayBoss[k].restaurantKeyX,
        totalPaid: arrayBoss[k].totalPaidX,
        paymentMethod: paymentMeth,
        clientNote: watchFields
      }

      let response = await addOrders(objTest);

      const objTest2 = {
        ordersId: response.data,
        orderObj: arrayBoss[k].dishesX
      }

      let response2 = await addOrder(objTest2)

    }

    dispatch(resetOrders())
    reset({
      orderNote: ""
    });
    navigate(-1)
  }

  const toChangeAmountPlus = (element) => {

    let newNum = element.quantity + 1;

    let objSend = {
      id: orders.indexOf(element),
      obj: newNum
    }
    dispatch(updateOrder(objSend))
  }

  const toChangeAmountMinus = (element) => {
    if (element.quantity > 1) {

      let newNum = element.quantity - 1;

      let objSend = {
        id: orders.indexOf(element),
        obj: newNum
      }
      dispatch(updateOrder(objSend))
    } else {

      dispatch(removeOrder({ id: element.timestamp }))
    }
  }

  const toEditLocation = () => {
    navigate("/edit-profile")
  }
  const changePayment = (newText) => {
    setPayomentMeth(newText)
    return paymentMeth
  }

  return (
    <section className='NewOrder'>
      <DefaultHeader text={"New order"} />
      <section className='NewOrder__container'>
        <article className='NewOrder__deliver'>
          <p className='NewOrder__deliver__text mini-title'>Deliver to</p>
          <div className='NewOrder__deliver__box' onClick={toEditLocation} role='editLocation'>
            <figure className='NewOrder__deliver__location'>
              <img src={LocationYellow} alt="icono de ubicacion" />
            </figure>
            <p className='NewOrder__deliver__adress'>{userInfo.address}</p>
            <figure className='NewOrder__deliver__next'>
              <img src={nextArrow} alt="boton de siguiente" />
            </figure>
          </div>
        </article>

        <article className='NewOrder__payment'>
          <p className='NewOrder__payment__text'>Payment</p>
          <div className='NewOrder__payment__box'>
            <div role='cash' className={paymentMeth == "cash" ? "NewOrder__payment__cash selected" : "NewOrder__payment__cash"} onClick={() => changePayment("cash")}>Cash</div>
            <div role='master' className={paymentMeth == "master" ? "NewOrder__payment__card selected" : "NewOrder__payment__card"} onClick={() => changePayment("master")}>
              <figure>
                <img src={mastercard} alt="targeta mastercard" />
              </figure>
              <p>Master Card</p>
            </div>
            <div role='visa' className={paymentMeth == "visa" ? "NewOrder__payment__card selected" : "NewOrder__payment__card"} onClick={() => changePayment("visa")}>
              <figure>
                <img src={visa} alt="targeta visa" />
              </figure>
              <p>Visa</p>
            </div>
          </div>
        </article>

        <article className='NewOrder__order'>
          {
            orders ?
              (orders.map((element, index) => element &&
                <div className='NewOrder__order__ind' key={index}>
                  <figure className='NewOrder__order__image'>
                    <img src={element.imageDish} alt="comida" />
                  </figure>
                  <div className='NewOrder__order__console'>
                    <span  role="decrease" className='NewOrder__order__minus' onClick={() => toChangeAmountMinus(element)} >-</span>
                    <span  role='value_quantity' className='NewOrder__order__number'>{element.quantity}</span>
                    <span role="increaseBtn" className='NewOrder__order__plus' onClick={() => toChangeAmountPlus(element)} >+</span>
                  </div>
                  <p className='NewOrder__order__name'>{element.dish}</p>
                  <p className='NewOrder__order__cost'>$ {(element.quantity) * (element.basePrice)}</p>
                </div>
              )) : (<p>no hay ordenes</p>)
          }
        </article>

        <article className='NewOrder__extraInfo'>
          <p>Note</p>
          <textarea placeholder='Write something' {...register("orderNote")}></textarea>
        </article>

        <article className='NewOrder__summary'>
          <div className='NewOrder__summary__ind'>
            <p>Products</p>
            <p>$ {totalOrdersCost}</p>
          </div>
          <div className='NewOrder__summary__ind'>
            <p>Delivery</p>
            <p>5$</p>
          </div>
          <hr />
          <div className='NewOrder__summary__ind'>
            <p className='total'>Total</p>
            <p className='total'>$ {totalOrdersCost + 5}</p>
          </div>
        </article>

        <p className='NewOrder__final' onClick={orderNow}>order</p>
      </section>
    </section>
  )
}

export default NewOrder