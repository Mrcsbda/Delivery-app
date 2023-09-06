import "./main.scss"
import { useNavigate, useParams } from "react-router"
import { useGetRestaurantDishesQuery, useGetRestaurantsQuery } from "../../store/api/firebaseApi"
import { useEffect, useState } from "react"

const Restaurant = () => {
  const navigate = useNavigate()
  const { idRestaurant } = useParams()
  const [restaurantInfo, setRestaurantInfo] = useState(false)
  const { data, isSuccess } = useGetRestaurantsQuery()
  const [rateStars, setRateStars] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])
  const [categoryState, setCategoryState] = useState(false)
  const { data: dishes, isSuccess: isSuccesDishes } = useGetRestaurantDishesQuery(idRestaurant)
  useEffect(() => {
    if (isSuccess) {
      const restaurantInfo = data.find(restaurant => restaurant.id === idRestaurant);
      setRestaurantInfo(restaurantInfo)
    }
  }, [isSuccess])


  useEffect(() => {

    if (categoryState) {
      const filteredDishes = dishes.filter(dish => dish.categories.some(dcategory => dcategory == categoryState));
      setFilteredDishes(filteredDishes)
    }

    else {
      return
    }

  }, [isSuccesDishes, categoryState])

  const handleCategory = (calledCategory) => {
    if (calledCategory != categoryState) {
      setCategoryState(calledCategory)
    } else {
      setCategoryState(false)
      setFilteredDishes([])
    }
  }
  const handleAllCategory = () => {
    if (categoryState) {
      setCategoryState(false)
      setFilteredDishes([])
    }
  }


  const getTime = (date) => {
    const time = new Date(date)
    return `${time.getHours()}:${time.getMinutes()}0`
  }

  useEffect(() => {
    createRating()
  }, [restaurantInfo])


  const createRating = () => {
    let rating = []
    for (let i = 1; i <= 5; i++) {
      i <= restaurantInfo.rating ? rating.push("full") : rating.push("empty")

    }
    setRateStars(rating)
  }




  const handleBack = () => {
    navigate(`/`)
  }
  const handleFood = (food) => {
    const state = { food };
    navigate(`${food.id}`, { state })
  }


  return (


    <>
      {
        restaurantInfo ?
          <section className="restaurant">
            <header className="restaurant__header">
              <nav className="restaurant__header__nav">
                <figure onClick={handleBack} className="restaurant__header__back"> <img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
                <figure className="restaurant__header__logo"> <img src={restaurantInfo.logo} alt="arrow-left" /></figure>
              </nav>
              <section className="restaurant__header__middle">
                <figure className="restaurant__header__location">
                  <img src={restaurantInfo.image} alt="RestaurantImage" />
                </figure>
                <div className="restaurant__header__textBox">
                  <h3>{restaurantInfo.name}</h3>
                  <p>{restaurantInfo.description}</p>
                  <div className="restaurant__header__stats">
                    <figure className='restaurant-card__rate'>
                      {
                        rateStars.length && (
                          rateStars.map((rate, i) => (
                            <img
                              className={`restaurant-card__rate-icon ${rate === "full" ? "restaurant-card__star-full" : "restaurant-card__star-empty"}`}
                              key={i}
                              src="/images/star-full.svg"
                              alt='star icon' />
                          ))
                        )
                      }
                    </figure>
                    <p className='restaurant__schedule'>Work time {getTime(restaurantInfo.startTime)} - {getTime(restaurantInfo.endTime)}</p>
                  </div>
                </div>
              </section>
              <section className="restaurant__header__bottom" >
                <span className={`restaurant__header__categories ${!categoryState && `restaurant__header__categories__active`}`} onClick={handleAllCategory}>All</span>
                {
                  restaurantInfo.dishesCategories.map((category) => (
                    <span className={`restaurant__header__categories ${categoryState == category && `restaurant__header__categories__active`}`} onClick={() => handleCategory(category)} key={category}>{category}</span>
                  ))
                }
              </section>
            </header>
            <main className="restaurant__body">
              {
                isSuccesDishes &&
                  !filteredDishes.length ?
                  dishes.map((food) => (
                    <article key={food.id} className="restaurant__body__food" onClick={() => handleFood(food)}>
                      <figure className="restaurant__body__media"><img src={food.image} alt="food" /></figure>
                      <span className="restaurant__body__title">{food.name}</span>
                      <div className="restaurant__body__price">$ {food.price}</div>
                    </article>
                  ))
                  :
                  filteredDishes.map((food) => (
                    <article key={food.id} className="restaurant__body__food" onClick={() => handleFood(food)}>
                      <figure className="restaurant__body__media"><img src={food.image} alt="food" /></figure>
                      <span className="restaurant__body__title">{food.name}</span>
                      <div className="restaurant__body__price">$ {food.price}</div>
                    </article>
                  ))
              }
            </main>
          </section>
          : <div>Is Loading ...</div>
      }
    </>



  )
}

export default Restaurant