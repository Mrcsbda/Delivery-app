import React from 'react'
import "./header.scss";
import AddressComponent from '../addressComponent/addressComponent';

const Header = () => {
  return (
    <header className='header'>
      <figure className='header__logo-container'>
        <img className='header__logo' src="/logo.svg" alt="logo icon" />
      </figure>
      <AddressComponent/>
      <section className='header__nav-container'>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li>Home</li>
            <li>Search</li>
            <li>Orders</li>
            <li>Profile</li>
          </ul>
        </nav>
        <hr />
        <figure className='header__cart-container'>
          <p className='header__orders'>2</p>
          <img className='header__cart' src="/images/cart.svg" alt="cart icon" />
        </figure>
      </section>
    </header>
  )
}

export default Header