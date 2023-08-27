import React from 'react'
import "./headerDesktop.scss";
import AddressComponent from '../addressComponent/AddressComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderDesktop = () => {
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.cart)
  const { key } = useSelector(state => state.user)

  return (
    <header className='header'>
      <figure className='header__logo-container'>
        <img className='header__logo' src="/logo.svg" alt="logo icon" />
      </figure>
      <AddressComponent />
      <section className='header__nav-container'>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search-views">Search</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to={`/${key}`}>Profile</Link>
            </li>
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