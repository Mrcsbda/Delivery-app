import "./main.scss"
import restaurantInf from "../../data/arrayData"
import { useEffect, useState } from "react"
import { useGetRestaurantDishesQuery, useGetRestaurantsQuery } from "../../store/api/firebaseApi"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import trashBar from "/images/trash-bar.svg"
import searchBar from "/images/search-bar.svg"

export const SearchView = () => {
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const navigate = useNavigate()
  const params = useParams()
  const watchFields = watch("searchText")
  //manejo predeterminado
  const [image, setImage] = useState(false)
  const hanleImage = () => {
    setImage(!image)
  }
  //variable para el id de los restaurantes
  const [idRestaurant, setIdRestaurant] = useState("")
  //peticion de todos los restaurantes
  const { data: restaurants, isLoading, isSuccess } = useGetRestaurantsQuery()
  const [resturantsInfo, setRestaurantsInfo] = useState(false)
  //peticion de los platos de x restaurante
  //const { data: dishes, isSuccess: isSuccesDishes } = useGetRestaurantDishesQuery(idRestaurant)
  const rest00 = useGetRestaurantDishesQuery("3eXtGkjm8GyC7QblK6OC")
  const rest01 = useGetRestaurantDishesQuery("AJ9SRg9aoXXEPLnjhBgk")
  const rest02 = useGetRestaurantDishesQuery("AmHfUNbBkt3F3aryp8xx")
  const rest03 = useGetRestaurantDishesQuery("TpL5x61L0BPb6k1eRpc9")
  const rest04 = useGetRestaurantDishesQuery("UXwrOxEptbEJW7IMpnMF")
  const rest05 = useGetRestaurantDishesQuery("frOkxX1v0gXeCKyCv0EM")
  const rest06 = useGetRestaurantDishesQuery("s4VpAQHFx7YKuu7psR4m")
  const [dishesArray, setDishesArray] = useState([])

  //validadores
  const [showContainer01, setShowContainer01] = useState([false, false, false, false, false, false, false])
  const [showContainer02, setShowContainer02] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredArray, setFilteredArray] = useState([])

  //peticion de los restaurantes
  useEffect(() => {
    restaurants && setRestaurantsInfo(restaurants)
    console.log("info restaurantes: ", restaurants)
  }, [restaurants])

  //peticion de los platos de restaurantes
  // useEffect(() => {
  //   restaurants && getDishesFrom()
  // }, [restaurants])

  // const getDishesFrom = () => {
  //   restaurants.forEach(element => {
  //     const { data: dishes, isSuccess: isSuccesDishes } = useGetRestaurantDishesQuery(element.id)
  //     let combinedArray = dishesArray.concat(dishes)
  //     setDishesArray(combinedArray)
  //     console.log(dishesArray)
  //   })
  // }

  //segunda opcion y larga
  // useEffect(() => {
  //   if ((rest00.status == 'fulfilled')) {
  //     console.log(rest00.data)
  //     console.log("condicio cumplida rest00")

  //     let notify = showContainer01;
  //     notify[0] = true;
  //     setShowContainer01(notify)
  //   }
  //   // console.log("resolvio")
  // }, [rest00])

  //tercera opcion - mejorada de la segunda
  useEffect(() => {
    //console.log("se intenta")
    if (((rest00.status == 'fulfilled')) && ((rest01.status == 'fulfilled')) && ((rest02.status == 'fulfilled')) && ((rest03.status == 'fulfilled')) && ((rest04.status == 'fulfilled')) && ((rest05.status == 'fulfilled')) && ((rest06.status == 'fulfilled'))) {
      let defaultArray = [];
      let combinedArray00 = defaultArray.concat(rest00.data);
      let combinedArray01 = combinedArray00.concat(rest01.data);
      let combinedArray02 = combinedArray01.concat(rest02.data);
      let combinedArray03 = combinedArray02.concat(rest03.data);
      let combinedArray04 = combinedArray03.concat(rest04.data);
      let combinedArray05 = combinedArray04.concat(rest05.data);
      let combinedArray06 = combinedArray05.concat(rest06.data);
      setDishesArray(combinedArray06)
      setShowContainer02(true)
      console.log("lista de todos los platos: ", dishesArray)
    }

  }, [rest00, rest01, rest02, rest03, rest04, rest05, rest06])

  //control del form


  const toNagivate = (restId, itemId, food) => {
    const state = { food };
    navigate(`/restaurant/${restId}/${itemId}`, { state })
  }

  const resetForm = () => {
    reset()
    setShowFilter(false)
  }

  const searchForm = () => {
    console.log(watchFields)
    searchMode()
  }

  const onSubmit = (data) => {
    console.log(data.searchText)
    searchMode(data.searchText)
  }

  const searchMode = (textTo = watchFields) => {
    setShowFilter(true)
    const prefilter = dishesArray.filter((element) => (element.name.toLowerCase()).includes(textTo.toLowerCase()))
    console.log(prefilter)
    setFilteredArray(prefilter)

  }

  return (
    <main className="search">

      <form className="search__bar" onSubmit={handleSubmit(onSubmit)}>
        <figure onClick={searchForm} className="search__bar__glass">
          <img src={searchBar} alt="search btn" />
        </figure>
        <input type="text" placeholder="busque aqui..." {...register("searchText")} />
        <figure className="search__bar__trashcan" onClick={resetForm}>
          <img src={trashBar} alt="trash btn" />
        </figure>
      </form>
      <section className="search__items">
        {
          showFilter ? (
            filteredArray.length ? ((
              filteredArray.map((item, index) => (
                <article key={index} className="search__item" onClick={() => { toNagivate(item.restaurantId, item.id, item) }}>
                  <figure className="search__item__media"><img src={item.image} alt="food" /></figure>
                  <div className="search__item__text">
                    <span className="search__item__text__title">{item.name}</span>
                    <span>$ {item.price}</span>
                  </div>
                </article>
              )))) : (<figure className="search__items__notFound">
                <img src="/images/search_notFound.png" alt="serach_not_found" />
                <span>Nothing found X</span>
              </figure>)
          ) : (showContainer02 &&
            dishesArray.map((item, index) => (
              <article key={index} className="search__item" onClick={() => { toNagivate(item.restaurantId, item.id, item) }}>
                <figure className="search__item__media"><img src={item.image} alt="food" /></figure>
                <div className="search__item__text">
                  <span className="search__item__text__title">{item.name}</span>
                  <span>$ {item.price}</span>
                </div>
              </article>
            )))

          //default
          // (
          //   restaurantInf.map((item) => (
          //     <article key={item.id} className="search__item">
          //       <figure className="search__item__media"><img src={item.media} alt="food" /></figure>
          //       <div className="search__item__text">
          //         <span className="search__item__text__title">{item.title}</span>
          //         <span>$ {item.price}</span>
          //       </div>
          //     </article>
          //   )))
        }
      </section>

    </main>

  )
}
