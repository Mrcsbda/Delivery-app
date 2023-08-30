
import { useLocation } from "react-router"
import "./main.scss"
import { useState } from "react"
import useScreenSize from "../../assets/hooks/useScreenSize"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addOrder } from "../../store/slides/cart"
const Food = () => {
  const { width } = useScreenSize()
  const location = useLocation()
  const { food } = location.state
  const [numberState, setNumberState] = useState(0)
  const { idRestaurant, idDish } = useParams()
  const navigate = useNavigate()
  const [orderPrice, setOrderPrice] = useState(0)
  const [addChecker, setAddChecker] = useState({})
  const [ingredientOrder, setIngredientOrder] = useState([])
  const dispatch = useDispatch()
  const handleCheckboxChange = (addition, event) => {
    setAddChecker((prevAddChecker) =>
    ({
      ...prevAddChecker,
      [addition]: event.target.checked,
    }))
  };

  useEffect(() => {
    let updatedOrder = [...ingredientOrder];
    for (const key in addChecker) {
      if (addChecker.hasOwnProperty(key)) {
        if (addChecker[key] === true && !updatedOrder.includes(key)) {
          updatedOrder.push(key);
        } else if (!addChecker[key] && updatedOrder.includes(key)) {
          updatedOrder = updatedOrder.filter(item => item !== key);
        }
      }
    }
    setIngredientOrder(updatedOrder);
  }, [addChecker]);

  useEffect(() => {
    if (!ingredientOrder.length || numberState == 0) {
      setOrderPrice(numberState * food.price)
    }
    else { setOrderPrice((numberState * food.price) + (ingredientOrder.length * 2)) }
  }, [numberState, ingredientOrder])






  const handleBack = () => {
    navigate(`/restaurant/${idRestaurant}`)
  }
  const handleAdd = () => {
    setNumberState(numberState + 1)
  }
  const handleSubstract = () => {
    if (numberState == 0) { return }
    setNumberState(numberState - 1)
  }

  const createOrder = () => {
    if (orderPrice != 0) {

      const order = {
        additions: ingredientOrder,
        dish: food.name,
        price: orderPrice,
        quantity: numberState,
        // timestamp: new Date().getTime()
      }
      dispatch(addOrder(order))
      navigate(-1)
    } else {
      alert(`Cannot make orders without any product`)
    }
  }



  return (
    <section className="food">

      {width < 600 ?
        <>
          <header className="food__header">
            <figure className="food__header__back" onClick={handleBack}> <img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
            <figure className="food__header__media"><img src={food.image} alt="food" /></figure>
          </header>
          <main className="food__body">
            <section className="food__body__title">
              <h3 >{food.name}</h3>
              <div className="food__body__title__timer">
                <figure><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V12L13.5 9.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#A7A7A7"></path> </g></svg></figure>
                <span>15-20 min</span>
              </div>
            </section>
            <div className="food__body__description"><p>{food.description}</p></div>
            <span className="food__body__additional" >Additional Ingredients</span>
            <section className="food__body__ingredients" >
              {
                food.adittions.map((ingredient) => (
                  <section key={ingredient} className="food__body__ingredients__box">
                    <div className="food__body__ingredients__ingredient">
                      <input type="checkbox" name="checker" id="checker_ingredient" className="food__body__ingredients__checker" />
                      <span> {ingredient} </span>
                    </div>
                    <span className="food__body__ingredients__price" >+2$</span>
                  </section>
                ))
              }
            </section>
          </main>
        </>
        :
        <>
          <header className="food__header">
            <figure className="food__header__back" onClick={handleBack}> <img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
            <figure className="food__header__media"><img src={food.image} alt="food" /></figure>
            <section className="food__header__textbox">
              <section className="food__header__title">
                <h3 >{food.name}</h3>
                <div className="food__body__title__timer">
                  <figure><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V12L13.5 9.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#A7A7A7"></path> </g></svg></figure>
                  <span>15-20 min</span>
                </div>
              </section>
              <div className="food__body__description"><p>{food.description}</p></div>
            </section>

          </header>
          <main className="food__body">

            <span className="food__body__additional" >Additional Ingredients</span>
            <section className="food__body__ingredients" >
              {
                food.adittions.map((ingredient) => (
                  <section key={ingredient} className="food__body__ingredients__box">
                    <div className="food__body__ingredients__ingredient">
                      <input onChange={(event) => handleCheckboxChange(ingredient, event)} type="checkbox" name="checker" id="checker_ingredient" className="food__body__ingredients__checker" />
                      <span> {ingredient} </span>
                    </div>
                    <span className="food__body__ingredients__price" >+2$</span>
                  </section>
                ))
              }
            </section>
          </main>
        </>
      }
      <footer className="food__footer">
        <div className="food__footer__counter">
          <figure onClick={handleSubstract}>
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
          </figure>
          <span className="food__footer__counter__number" >{numberState}</span>
          <figure onClick={handleAdd}>
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" ></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path></svg>
          </figure>
        </div>
        <div className="food__footer__cart" onClick={createOrder}>
          <span>Add</span>
          <span className="food__footer__cart__price">$ {orderPrice}</span>
        </div>
      </footer>
    </section>
  )
}

export default Food