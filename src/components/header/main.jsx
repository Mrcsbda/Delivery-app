import React from 'react'
import backArrow from '../../assets/images/BackArrowIcon.svg'
import './main.scss'
import { useNavigate } from 'react-router-dom'

const DefaultHeader = ({ text = "texto por defecto" }) => {
  const navigate = useNavigate()
  const toBack = () => {
    navigate(-1)
  }
  return (
    <header className='DefaultHeader__container'>
      <figure className='DefaultHeader__container__figure' onClick={toBack}>
        <img src={backArrow} alt="boton de atras" />
      </figure>
      <p className='DefaultHeader__container__text'>{text}</p>
    </header>
  )
}

export default DefaultHeader