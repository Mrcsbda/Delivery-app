import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Feed from '../feed/Feed'
import Footer from '../../components/footer/Footer'

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

    if (windowWidth > 600) {
      setDesktopMenu(true)
    } else {
      setDesktopMenu(false)
    }
  }
  return (
    <main>
      {
        desktopMenu && (
          <Header />
        )
      }
      <Feed />
      {
        !desktopMenu && (
          <Footer />
        )
      }
    </main>
  )
}

export default Layout