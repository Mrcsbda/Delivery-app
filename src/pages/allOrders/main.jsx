import React, { useEffect, useState } from 'react'
import './main.scss'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import nextArrow from '../../assets/images/NextArrowIcon.svg'
import defaultRestaurant from '../../assets/images/restaurant-logo.jpg'
import DefaultHeader from '../../components/header/main'
import { useGetAllOrdersQuery, useGetOrdersByUserIdMutation, useGetRestaurantsQuery } from '../../store/api/firebaseApi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const AllOrders = () => {
  const navigate = useNavigate()
  //no sirvio al final
  //const [getOrdersByUserId, isSuccess] = useGetOrdersByUserIdMutation()

  //conseguimos la info del usuario
  const userInfo = useSelector(state => state.user.key)

  //conseguimos todas las ordenes
  //const ordersInfo = useGetAllOrdersQuery()
  const { data: orders } = useGetAllOrdersQuery()

  //toca pedir los restaurantes para las imagene sy nombres
  const { data: restaurants, isLoading, isSuccess } = useGetRestaurantsQuery()
  const [restaurantsInfo, setRestaurantsInfo] = useState([])

  //validadores
  const [showContainer01, setShowContainer01] = useState(false)
  const [ordersArray, setOrdersArray] = useState(false)

  //ordenes
  useEffect(() => {
    if (orders && userInfo) {
      const newArray = orders.filter((element) => element.clientKey == userInfo) || []
      console.log("filtrado", newArray)
      console.log("sin filtrar", orders)
      setOrdersArray(newArray)
    }
  }, [orders])
  //restaurantes
  useEffect(() => {
    restaurants && setRestaurantsInfo(restaurants)
    console.log(restaurants)
  }, [restaurants])
  //array a mostrar
  useEffect(() => {

    if (restaurantsInfo.length && ordersArray.length) {
      // const newItem = ordersArray.map((indOrder) => restaurantsInfo.map((indRest) => indRest.id == indOrder.restaurantKey && {
      //   orderExist: true,
      //   restName: indRest.name,
      //   restImage: indRest.image,
      //   orderStatus: indOrder.orderStatus,
      //   orderPRice: indOrder.totalPaid
      // }))
      // console.log("newItem", newItem)
      let newItem = []
      ordersArray.forEach(indOrder => {
        restaurantsInfo.forEach(indRest => {
          (indRest.id == indOrder.restaurantKey) && newItem.push({
            id: indOrder.id,
            restName: indRest.name,
            restImage: indRest.image,
            orderStatus: indOrder.orderStatus,
            orderPRice: indOrder.totalPaid
          })
        })
      })
      console.log("newItem", newItem)
      setShowContainer01(newItem)
      console.log(showContainer01)
    }
  }, [restaurantsInfo, ordersArray])

  const toInfoOrder = (idToSend) => {
    navigate(`${idToSend}`,)
  }

  return (
    <>
      <DefaultHeader text={"All orders"} />
      <section className='AllOrders__container'>
        <article className='AllOrders__orders'>

          {/* <div className='AllOrders__orders__ind'>
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

          </div> */}
          {
            showContainer01 && showContainer01.map((element, index) => element && (
              <div className='AllOrders__orders__ind' key={index} onClick={() => { toInfoOrder(element.id) }}>
                <div className='orders__info'>
                  <figure>
                    <img src={element.restImage} alt={element.restName} />
                  </figure>
                  <div>
                    <p>{element.restName}</p>
                    <span>$ {element.orderPRice}</span>
                  </div>
                </div>
                <div className='orders__status'>
                  <p className={`orders__status__${element.orderStatus}`}>{element.orderStatus}</p>
                  <figure>
                    <img src={nextArrow} alt="siguiente" />
                  </figure>
                </div>

              </div>
            ))

          }

        </article>
      </section>
    </>
  )
}

export default AllOrders