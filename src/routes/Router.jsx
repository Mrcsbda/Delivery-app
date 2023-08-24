import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewOrder from '../pages/newOrder/main'
import AllOrders from '../pages/allOrders/main'
import OrderSet from '../pages/orderSet/main'
import OrderAccepted from '../pages/orderAccepted/main'
import CurrentOrder from '../pages/currentOrder/main'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CurrentOrder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router