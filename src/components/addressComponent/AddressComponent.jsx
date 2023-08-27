import React from 'react'
import { useSelector } from 'react-redux'

const AddressComponent = () => {
    const { address } = useSelector(state => state.user)

    return (
        <section className='feed__location-container'>
            <img src="/images/location.svg" alt="location icon" className='feed__location-icon' />
            <div className='feed__address-container'>
                <p className='feed__address-title'>DELIVER TO</p>
                <div className='feed__address'>
                    <p className='feed__address-text'>{address ? address : "Agrega una dirección"}</p>
                    <img src="/images/arrow-down.svg" alt="arrow icon" className='feed__arrow-icon' />
                </div>
            </div>
        </section>
    )
}

export default AddressComponent