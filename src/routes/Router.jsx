import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Restaurant from '../pages/Restaurant/restaurant'
import AddNewCard from '../pages/addNewCard/AddNewCard'
import EditProfile from '../pages/editProfile/EditProfile'
import Feed from '../pages/feed/Feed'
import Food from '../pages/food/Food'
import Layout from '../pages/layout/Layout'
import Login from '../pages/login/Login'
import PaymentMethod from '../pages/paymentMethod/PaymentMethod'
import Profile from '../pages/profile/Profile'
import { SearchView } from '../pages/searchViews/searchView'
import SignUp from '../pages/signUp/SignUp'
import ClientRoutes from './PrivateRoutes/ClientRoutes'
import PublicRoute from './PublicRoutes/PublicRoute'
import { login } from '../store/slides/user/user'
import AllOrders from '../pages/allOrders/main'
import CurrentOrder from '../pages/currentOrder/main'
import OrderSet from '../pages/orderSet/main'
import NewOrder from '../pages/newOrder/main'
import OrderAccepted from '../pages/orderAccepted/main'

const Router = () => {
    const { userRole } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [validateRoutes, setValidateRoutes] = useState(false)
    useEffect(() => {
        validateUser()
    }, [])

    const validateUser = () => {
        const infoUser = JSON.parse(localStorage.getItem("infoUser"))
        infoUser && dispatch(login(infoUser))
        setValidateRoutes(true)
    }

    return (
        <BrowserRouter>
            {
                validateRoutes && (
                    <Routes>
                        <Route element={<PublicRoute userRole={userRole} />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signUp" element={<SignUp />} />
                        </Route>
                        <Route element={<ClientRoutes userRole={userRole} />}>
                            <Route path='/' element={<Layout />}>
                                <Route index element={<Feed />} />
                                <Route path=":idClient" element={<Profile />} />
                                <Route path="search-views" element={<SearchView />} />
                                <Route path='restaurant/:idRestaurant/:idDish' element={<Food />} />
                                <Route path="restaurant/:idRestaurant" element={<Restaurant />} />
                                <Route path="orders" element={<AllOrders />} />
                            </Route>
                            <Route path='add-new-card' element={<AddNewCard />} />
                            <Route path='edit-profile' element={<EditProfile />} />
                            <Route path="payment-methods" element={<PaymentMethod />} />
                            <Route path="order" element={<OrderSet />} />
                            <Route path="current-order" element={<CurrentOrder />} />
                            <Route path="new-order" element={<NewOrder />} />
                            <Route path="order-accepted" element={<OrderAccepted />} />
                        </Route>
                    </Routes>
                )
            }
        </BrowserRouter>
    )
}

export default Router