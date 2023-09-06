import React from 'react'
import { Spinner } from '@chakra-ui/react'
import "./loader.scss"

const Loader = () => {
  const white = "#ffffff"
  const yellow = "#FFE031"

  return (

    <div className='spinner' >
      <Spinner
        className='spinner__loader'
        thickness='4px'
        speed='0.65s'
        emptyColor={yellow}
        color={white}
        size='xl'
      />
    </div >
  )
}

export default Loader