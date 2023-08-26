import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./footer.scss"

const Footer = () => {
  const navigate = useNavigate()
  const navigateHome = () =>{
    navigate(`/`)
  }
  return (
    <footer  className='footer'>
      <figure className='footer__icon-container'>
        <img src="/images/home.svg" onClick={navigateHome} alt="home icon" className='footer__icon'/>
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