import "./main.scss"
import restaurantInf from "../../data/arrayData"
import { useNavigate } from "react-router"

const Restaurant = () => {
  // const navigate = useNavigate()
  // const handleFood = (food)=> {
  //    const state = {food};
  //   navigate(`${food.id}`,  { state } )
  // }


  return (
    <section className="restaurant">
        <header className="restaurant__header">
            <nav className="restaurant__header__nav">
                <figure className="restaurant__header__back"> <img src="/images/arrow-left.svg" alt="arrow-left" /></figure>
                <figure className="restaurant__header__logo"> <img src="/images/C&Wlogo.svg" alt="arrow-left" /></figure>
            </nav>
            <section className="restaurant__header__middle">
              <figure className="restaurant__header__location">
                <img src="https://www.america-retail.com/static//2020/09/291429_1-1-scaled.jpg" alt="C&WLocation" />
              </figure>
              <div className="restaurant__header__textBox">
                <h3>Pardes Restaurant </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quo, excepturi assumenda dolorum, beatae aliquid officia corporis vel sit ipsum dolores autem quod blanditiis voluptate quaerat aspernatur repudiandae quam illo!</p>
                <div className="restaurant__header__stats">
                  <h3>Stars</h3>
                  <span>15-20 min</span>
                </div>
              </div>
            </section>
            <section className="restaurant__header__bottom" >
              <span className=" restaurant__header__categories">All</span>
              <span className="restaurant__header__categories__active restaurant__header__categories">Salates</span>
              <span className="restaurant__header__categories">Pizza</span>
              <span className="restaurant__header__categories">Lasana</span>
            </section>
        </header>
        <main className="restaurant__body">
        {restaurantInf.map((food)=>(
          <article key={food.id} className="restaurant__body__food" onClick={()=> handleFood(food)}>
            <figure className="restaurant__body__media"><img src={food.media} alt="food" /></figure>
            <span className="restaurant__body__title">{food.title}</span>
            <div className="restaurant__body__price">$ {food.price}</div>
          </article>
        ))
        }
        </main>
    </section>
    
  )
}

export default Restaurant