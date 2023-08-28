import { useEffect, useState } from 'react'
import "./feed.scss"
import BannerCarrousel from '../../components/bannerCarrousel/BannerCarrousel'
import CategoriesCarrousel from '../../components/categoriesCarrousel/CategoriesCarrousel'
import RestaurantCard from '../../components/restaurantCard/RestaurantCard'
import AddressComponent from '../../components/addressComponent/AddressComponent'
import { useGetRestaurantsQuery } from '../../store/api/firebaseApi'
import { useSelector } from 'react-redux'



const Feed = () => {
  const { data: restaurants, isLoading, isSuccess } = useGetRestaurantsQuery()
  const [desktopMenu, setDesktopMenu] = useState(false)
  const { orders } = useSelector(state => state.cart)
  const [resturantsInfo, setRestaurantsInfo] = useState(false)

  useEffect(() => {
    restaurants && setRestaurantsInfo(restaurants)
  }, [restaurants])

  useEffect(() => {

    handleDesktopMenu()

    window.addEventListener('resize', handleDesktopMenu);

    return () => {
      window.removeEventListener('resize', handleDesktopMenu);
    };
  }, [])

  const handleDesktopMenu = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 650) {
      setDesktopMenu(true)
    } else {
      setDesktopMenu(false)
    }
  }

  const filterByCategory = (category) => {
    if(category !== "All") {
      const filterByCategory = restaurants.filter(restaurant => restaurant.categories.includes(category.toLowerCase()))
      setRestaurantsInfo(filterByCategory)
    } else {
      setRestaurantsInfo(restaurants)
    }
  }

  return (
    <article className='feed'>
      {
        !desktopMenu && (
          <AddressComponent />
        )
      }

      <BannerCarrousel />
      <p className='feed__subtitle'>Restaurants and cafes</p>
      <CategoriesCarrousel filterByCategory={filterByCategory} />
      <div className='feed__restaurants-container'>
        {resturantsInfo &&
          (
            resturantsInfo.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))
          )
        }
      </div>
      {
        !desktopMenu && orders.length > 0 && (
          <button className='feed__cart-button'>
            <p className='feed__cart-orders'>{orders.length}</p>
            <p className='feed__cart-title'>View cart</p>
            <p className='feed__card-total-to-pay'>10$</p>
          </button>
        )
      }
    </article>
  )
}

export default Feed