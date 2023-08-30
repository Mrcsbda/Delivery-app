import "./main.scss"
import restaurantInf from "../../data/arrayData"
import { useEffect, useState } from "react"
import { useGetRestaurantDishesQuery, useGetRestaurantsQuery } from "../../store/api/firebaseApi"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

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
    console.log(restaurants)
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
  useEffect(() => {
    if ((rest00.status == 'fulfilled')) {
      console.log(rest00)
      console.log("condicio cumplida rest00")

      let notify = showContainer01;
      notify[0] = true;
      setShowContainer01(notify)
    }
    // console.log("resolvio")
  }, [rest00])

  useEffect(() => {
    if ((rest01.status == 'fulfilled')) {
      console.log(rest01.data)
      console.log("condicio cumplida rest01")

      let notify = showContainer01;
      notify[1] = true;
      setShowContainer01(notify)
    }

  }, [rest01])

  useEffect(() => {
    if ((rest02.status == 'fulfilled')) {
      console.log(rest02.data)
      console.log("condicio cumplida rest02")

      let notify = showContainer01;
      notify[2] = true;
      setShowContainer01(notify)
    }

  }, [rest02])

  useEffect(() => {
    if ((rest03.status == 'fulfilled')) {
      console.log(rest03.data)
      console.log("condicio cumplida rest03")

      let notify = showContainer01;
      notify[3] = true;
      setShowContainer01(notify)
    }

  }, [rest03])

  useEffect(() => {
    if ((rest04.status == 'fulfilled')) {
      console.log(rest04.data)
      console.log("condicio cumplida rest04")

      let notify = showContainer01;
      notify[4] = true;
      setShowContainer01(notify)
    }

  }, [rest04])

  useEffect(() => {
    if ((rest05.status == 'fulfilled')) {
      console.log(rest05.data)
      console.log("condicio cumplida rest05")

      let notify = showContainer01;
      notify[5] = true;
      setShowContainer01(notify)
    }

  }, [rest05])

  useEffect(() => {
    if ((rest06.status == 'fulfilled')) {
      console.log(rest06.data)
      console.log("condicio cumplida rest06")

      let notify = showContainer01;
      notify[6] = true;
      setShowContainer01(notify)
    }

  }, [rest06])

  useEffect(() => {
    console.log("se intenta")
    if ((showContainer01[0] == true) && (showContainer01[1] == true) && (showContainer01[2] == true) && (showContainer01[3] == true) && (showContainer01[4] == true) && (showContainer01[5] == true) && (showContainer01[6] == true)) {
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
      console.log("entra")
      console.log(dishesArray)
    }

  }, [showContainer01])

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
    <body className="search">

      <form className="search__bar" onSubmit={handleSubmit(onSubmit)}>
        <figure onClick={searchForm} className="search__bar__glass"><svg stroke="currentColor" fill="#CCCCCC" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M333.78 20.188c-39.97 0-79.96 15.212-110.405 45.656-58.667 58.667-60.796 152.72-6.406 213.97l-15.782 15.748 13.25 13.25 15.75-15.78c61.248 54.39 155.3 52.26 213.968-6.407 60.887-60.886 60.888-159.894 0-220.78C413.713 35.4 373.753 20.187 333.78 20.187zm0 18.562c35.15 0 70.285 13.44 97.158 40.313 53.745 53.745 53.744 140.6 0 194.343-51.526 51.526-133.46 53.643-187.5 6.375l.218-.217c-2.35-2.05-4.668-4.17-6.906-6.407-2.207-2.206-4.288-4.496-6.313-6.812l-.218.22c-47.27-54.04-45.152-135.976 6.374-187.502C263.467 52.19 298.63 38.75 333.78 38.75zm0 18.813c-30.31 0-60.63 11.6-83.81 34.78-46.362 46.362-46.362 121.234 0 167.594 10.14 10.142 21.632 18.077 33.905 23.782-24.91-19.087-40.97-49.133-40.97-82.94 0-15.323 3.292-29.888 9.22-43-4.165 20.485.44 40.88 14.47 54.907 24.583 24.585 68.744 20.318 98.624-9.562 29.88-29.88 34.146-74.04 9.56-98.625-2.375-2.376-4.943-4.473-7.655-6.313 45.13 8.648 79.954 46.345 84.25 92.876 4.44-35.07-6.82-71.726-33.813-98.72-23.18-23.18-53.47-34.78-83.78-34.78zM176.907 297.688L42.094 432.5l34.562 34.563L211.47 332.25l-34.564-34.563zM40 456.813L24 472.78 37.22 486l15.968-16L40 456.812z"></path></svg></figure>
        <input type="text" placeholder="busque aqui..." {...register("searchText")} />
        <figure className="search__bar__trashcan" onClick={resetForm}><svg stroke="currentColor" fill="#CCCCCC" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" ></path></svg></figure>
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

    </body>

  )
}
