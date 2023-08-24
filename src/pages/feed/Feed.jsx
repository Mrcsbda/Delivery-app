import { useEffect, useState } from 'react'
import "./feed.scss"
import BannerCarrousel from '../../components/bannerCarrousel/BannerCarrousel'
import CategoriesCarrousel from '../../components/categoriesCarrousel/CategoriesCarrousel'
import RestaurantCard from '../../components/restaurantCard/RestaurantCard'
import AddressComponent from '../../components/addressComponent/AddressComponent'
import { firebaseDB } from '../../firebaseConfig'



const Feed = () => {
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

  const restaurants = [
    {
      image: "https://images.rappi.com/products/55f74661-37c4-4455-bd23-5a725b055d48-1682190461465.png",
      name: "The Grill Station Burguer",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/tmp2665513210233268625501871341.png",
      name: "Percimon",
      rate: 4,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/2092027792-1617735043780.png",
      name: "Trapani",
      rate: 4,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/2701738c-1b40-4826-85db-2fc3d2976036-1671512292568.png",
      name: "Chicks son Alitas",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/tmp314325013396576376839747298.png",
      name: "KFC Alitas",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    },
    {
      image: "https://images.rappi.com/products/55f74661-37c4-4455-bd23-5a725b055d48-1682190461465.png",
      name: "The Grill Station Burguer",
      rate: 3,
      schedule: "09:00 - 21:00",
      deliveryPrice: "13$"
    }
  ]
  return (
    <article className='feed'>
      {
        !desktopMenu && (
          <AddressComponent/>
        )
      }

      <BannerCarrousel />
      <p className='feed__subtitle'>Restaurants and cafes</p>
      <CategoriesCarrousel />
      <div className='feed__restaurants-container'>
        {
          restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        }
      </div>
    </article>
  )
}

export default Feed