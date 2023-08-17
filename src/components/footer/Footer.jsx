import React from 'react'
import { NavLink } from 'react-router-dom'
import "./footer.scss"

const Footer = () => {
  return (
    <footer  className='footer'>
      <figure className='footer__icon-container'>
        <img src="/images/home.svg" alt="home icon" className='footer__icon'/>
      </figure>
      <figure className='footer__icon-container' >
        <img src="/images/search.svg" alt="search icon" className='footer__icon'/>
      </figure>
      <figure className='footer__icon-container'>
        <img src="/images/orders.svg" alt="orders icon" className='footer__icon'/>
      </figure>
      <figure className='footer__icon-container'>
        <img src="/images/profile.svg" alt="profile icon" className='footer__icon'/>
      </figure>
    </footer>
  )
}

export default Footer