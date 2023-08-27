import React from 'react'
import "./headerDesktop.scss";
import AddressComponent from '../addressComponent/AddressComponent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderDesktop = () => {
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.cart)
  const navigateHome = () => {
    navigate(`/`)
  }


  return (
    <header className='header'>
      <figure className='header__logo-container'>
        <img className='header__logo' src="/logo.svg" alt="logo icon" />
      </figure>
      <AddressComponent />
      <section className='header__nav-container'>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li onClick={navigateHome}>Home</li>
            <li>Search</li>
            <li>Orders</li>
            <li>Profile</li>
          </ul>
        </nav>
        <hr />
        <figure className='header__cart-container'>
          {
            orders.length > 0 && (
              <p className='header__orders'>{orders.length}</p>
            )
          }
          <img className='header__cart' src="/images/cart.svg" alt="cart icon" />
        </figure>
      </section>
    </header>
  )
}

export default HeaderDesktop