import React from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'

const DefaultHeader = ({ text = "texto por defecto" }) => {
  return (
    <header className='DefaultHeader__container'>
      <figure className='DefaultHeader__container__figure'>
        <img src={backArrow} alt="boton de atras" />
      </figure>
      <p className='DefaultHeader__container__text'>{text}</p>
    </header>
  )
}

export default DefaultHeader