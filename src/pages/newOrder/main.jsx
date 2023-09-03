import React from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import nextArrow from '../../assets/images/NextArrowIcon.svg'
import LocationYellow from '../../assets/images/LocationYellowIcon.svg'
import mastercard from '../../assets/images/mastercard.svg'
import visa from '../../assets/images/visa-classic.svg'
import foodExample from '../../assets/images/foodExample.jpg'
import DefaultHeader from '../../components/header/main'
import { useDispatch, useSelector } from 'react-redux'
import { removeOrder, updateOrder } from '../../store/slides/cart'
import { useAddOrderMutation, useAddOrdersMutation, useGetRestaurantsQuery } from '../../store/api/firebaseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const NewOrder = () => {
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.cart)
  const userInfo = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [arrayBoss, setArrayBoss] = useState([])

  //toca pedir los restaurantes para las imagene sy nombres
  const { data: restaurants, isLoading, isSuccess } = useGetRestaurantsQuery()
  const [restaurantsInfo, setRestaurantsInfo] = useState(false)
  const [ordersInfo, setOrdersInfo] = useState(false)

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
      console.log("info del array original: ", restaurants)
      console.log("restaurantsInfo: ", restaurantsInfo)
      console.log("info del usuario: ", userInfo)
      restaurantsInfo === false && setRepeatRestaurants(!repeatRestaurants)
    }
  }, [isSuccess])

  //informacion cambiante
  useEffect(() => {
    setOrdersInfo(orders)
    console.log("ordenes capturadas: ", orders)
    console.log("ordersInfo: ", ordersInfo)
    ordersInfo === false && setRepeatOrders(!repeatOrders)
  }, [orders])

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
    console.log("array a enviar: ", arrayBoss)
    console.log(arrayBoss.length)

    //opcion de for
    // for (let i = 0; i < restaurantsInfo.length; i++) {
    //   let box = [];
    //   let ordCost = 0;
    //   for (let j = 0; j < ordersInfo.length; j++) {
    //     if (restaurantsInfo[i].id == ordersInfo[j].idRestaurant) {
    //       console.log(ordersInfo[j])
    //       box.push(ordersInfo[j]);
    //       ordCost += ordersInfo[j].price
    //     }
    //   }
    //   if (box.length > 0) {
    //     console.log(`nombre: ${restaurantsInfo[i].name} `, box)
    //     let newItem = {
    //       dishesX: box,
    //       clientKeyX: userInfo.key,
    //       costOfDeliveryX: 5,
    //       orderStatusX: "NONE",
    //       productionCostX: ordCost,
    //       restaurantKeyX: rest.restaurantKey,
    //       totalPaidX: (ordCost + 5)
    //     }
    //     setArrayBoss(...arrayBoss, newItem)
    //   }
    // }
    //objeto de prueba
    // const objTest = {
    //   clientKey: userInfo.key,
    //   costOfDelivery: 5,
    //   orderStatusX: "NONE",
    //   productionCostX: 20,
    //   restaurantKey: "wakaWaka",
    //   totalPaid: 25
    // }
    for (let k = 0; k < arrayBoss.length; k++) {
      const objTest = {
        clientKey: arrayBoss[k].clientKeyX,
        costOfDelivery: arrayBoss[k].costOfDeliveryX,
        orderStatus: arrayBoss[k].orderStatusX,
        productionCost: arrayBoss[k].productionCostX,
        restaurantKey: arrayBoss[k].restaurantKeyX,
        totalPaid: arrayBoss[k].totalPaidX,
      }
      console.log("objeto a enviar: ", objTest)
      let response = await addOrders(objTest);
      console.log("respuesta del post: ", response)
      const objTest2 = {
        ordersId: response.data,
        orderObj: arrayBoss[k].dishesX
      }
      console.log("objeto a enviar: ", objTest2)
      let response2 = await addOrder(objTest2)
      console.log("respuesta del post: ", response2)
    }
  }

  const toChangeAmountPlus = (element) => {
    // console.log(element)
    // console.log(orders.indexOf(element))
    let newNum = element.quantity + 1;

    let objSend = {
      id: orders.indexOf(element),
      obj: newNum
    }
    dispatch(updateOrder(objSend))
  }

  const toChangeAmountMinus = (element) => {
    if (element.quantity > 1) {
      // console.log(element)
      // console.log(orders.indexOf(element))
      let newNum = element.quantity - 1;

      let objSend = {
        id: orders.indexOf(element),
        obj: newNum
      }
      dispatch(updateOrder(objSend))
    } else {
      //console.log("borrar ", orders.indexOf(element))
      // console.log("dato a enviar: ", element.timestamp)
      dispatch(removeOrder({ id: element.timestamp }))
    }
  }

  const toEditLocation = () => {
    navigate("/edit-profile")
  }

  return (
    <section className='NewOrder'>
      <DefaultHeader text={"New order"} />
      <section className='NewOrder__container'>
        <article className='NewOrder__deliver'>
          <p className='NewOrder__deliver__text mini-title'>Deliver to</p>
          <div className='NewOrder__deliver__box' onClick={toEditLocation} >
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
            orders ?
              (orders.map((element, index) => element &&
                <div className='NewOrder__order__ind' key={index}>
                  <figure className='NewOrder__order__image'>
                    <img src={element.imageDish} alt="comida" />
                  </figure>
                  <div className='NewOrder__order__console'>
                    <span className='NewOrder__order__minus' onClick={() => toChangeAmountMinus(element)}>-</span>
                    <span className='NewOrder__order__number'>{element.quantity}</span>
                    <span className='NewOrder__order__plus' onClick={() => toChangeAmountPlus(element)}>+</span>
                  </div>
                  <p className='NewOrder__order__name'>{element.dish}</p>
                  <p className='NewOrder__order__cost'>$ {(element.quantity) * (element.basePrice)}</p>
                </div>
              )) : (<p>no hay ordenes</p>)
          }
        </article>

        <article className='NewOrder__extraInfo'>
          <p>Note</p>
          <textarea placeholder='Write something'></textarea>
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

        <p className='NewOrder__final' onClick={orderNow}>order</p>
      </section>
    </section>
  )
}

export default NewOrder