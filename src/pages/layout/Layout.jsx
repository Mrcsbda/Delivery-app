import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import "./layout.scss"
import { Outlet } from 'react-router-dom'
import HeaderDesktop from '../../components/headerDesktop/HeaderDesktop'

const Layout = () => {

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
    <main className='layout'>
      {
        desktopMenu && (
          <HeaderDesktop />
        )
      }
      <Outlet/>
      {
        !desktopMenu && (
          <Footer />
        )
      }
    </main>
  )
}

export default Layout