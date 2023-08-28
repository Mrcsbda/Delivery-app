import React from 'react'
import { NavLink } from 'react-router-dom'
import "./footer.scss"
import { useSelector } from 'react-redux'

const Footer = () => {
  const { key } = useSelector(state => state.user)

  return (
    <footer className='footer'>
      <figure className='footer__icon-container'>
        <NavLink to="/">
          <img src="/images/home.svg" alt="home icon" className='footer__icon' />
          <div></div>
        </NavLink>
      </figure>
      <figure className='footer__icon-container' >
        <NavLink to="/search-views">
          <img src="/images/search.svg" alt="search icon" className='footer__icon' />
          <div></div>
        </NavLink>
      </figure>
      <figure className='footer__icon-container'>
        <NavLink to="/orders">
          <img src="/images/orders.svg" alt="orders icon" className='footer__icon' />
          <div></div>
        </NavLink>
      </figure>
      <figure className='footer__icon-container'>
        <NavLink to={`/${key}`}>
          <img src="/images/profile.svg" alt="profile icon" className='footer__icon' />
          <div></div>
        </NavLink>
      </figure>
    </footer>
  )
}

export default Footer