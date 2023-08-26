import { useEffect, useState } from 'react'
import "./feed.scss"
import BannerCarrousel from '../../components/bannerCarrousel/BannerCarrousel'
import CategoriesCarrousel from '../../components/categoriesCarrousel/CategoriesCarrousel'
import RestaurantCard from '../../components/restaurantCard/RestaurantCard'
import AddressComponent from '../../components/addressComponent/AddressComponent'
import { useGetRestaurantsQuery } from '../../store/api/firebaseApi'



const Feed = () => {

   const { data: restaurants  , isLoading, isSuccess } = useGetRestaurantsQuery()


  const [desktopMenu, setDesktopMenu] = useState(false)

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

  return (
    <article className='feed'>
      {
        !desktopMenu && (
          <AddressComponent />
        )
      }

      <BannerCarrousel />
      <p className='feed__subtitle'>Restaurants and cafes</p>
      <CategoriesCarrousel />
      <div className='feed__restaurants-container'>
        {isSuccess &&
          restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        }
      </div>
    </article>
  )
}

export default Feed