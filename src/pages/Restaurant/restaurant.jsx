import "./main.scss"
import restaurantInf from "../../data/arrayData"
import { useNavigate, useParams } from "react-router"
import { useGetRestaurantDishesQuery, useGetRestaurantsQuery } from "../../store/api/firebaseApi"
import { useEffect, useState } from "react"

const Restaurant = () => {
  const navigate = useNavigate()
  const { idRestaurant } = useParams()
  const [restaurantInfo, setRestaurantInfo] = useState(false)
  const { data, isSuccess } = useGetRestaurantsQuery()
  useEffect(() => {
    if (isSuccess) {
      const restaurantInfo = data.find(restaurant => restaurant.id === idRestaurant);
      setRestaurantInfo(restaurantInfo)
    }

  }, [isSuccess])
  const {data: dishes, isSuccess: isSuccesDishes  }= useGetRestaurantDishesQuery(idRestaurant)
  // useEffect(() => {
  //   if (isSuccess) {
  //     const filteredDishes = dishes.find(dish => dish.categories.some(dcategory == category));
  //     setFilteredDishes(filteredDishes)
  //   }

  // }, [category])
  if(isSuccesDishes){
    console.log(dishes[1]);
  }


  
//console.log(dishesCategories);
  const handleBack = () => {
    navigate(`/`)
  }
  const handleFood = (food)=> {
     const state = {food};
    navigate(`${food.id}`,  { state } )
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
                <h3>Stars</h3>
                <span>15-20 min</span>
              </div>
            </div>
          </section>
          <section className="restaurant__header__bottom" >
            <span className=" restaurant__header__categories restaurant__header__categories__active">All</span>
            {
              restaurantInfo.dishesCategories.map((category)=>(
              <span className="restaurant__header__categories" key={category}>{category}</span>
              ))
            }
          </section>
        </header>
        <main className="restaurant__body">
          {
          isSuccesDishes &&
          dishes.map((food) => (
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