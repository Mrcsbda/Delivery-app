import React, { useEffect } from 'react'
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
import AdminRoutes from './PrivateRoutes/AdminRoutes'
import ClientRoutes from './PrivateRoutes/ClientRoutes'
import SuperAdminRoutes from './PrivateRoutes/SuperAdminRoutes'
import PublicRoute from './PublicRoutes/PublicRoute'
import { login } from '../store/slides/user/user'

const Router = () => {
    const { userRole } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        validateUser()
    }, [])

    const validateUser = () => {
        const infoUser = JSON.parse(localStorage.getItem("infoUser"))
        infoUser && dispatch(login(infoUser))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PublicRoute userRole={userRole} />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signUp" element={<SignUp />} />
                </Route>
                <Route path='/' element={<ClientRoutes userRole={userRole} />}>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Feed />} />
                        <Route path=":idClient" element={<Profile />} />
                        <Route path="search-views" element={<SearchView />} />
                        <Route path='restaurant/:idRestaurant/:idDish' element={<Food />} />
                        <Route path="restaurant/:idRestaurant" element={<Restaurant />} />
                    </Route>
                    <Route path='addNewCard' element={<AddNewCard />} />
                    <Route path='editProfile' element={<EditProfile />} />
                    <Route path="payment-methods" element={<PaymentMethod />} />
                </Route>
                <Route element={<AdminRoutes userRole={userRole} />}>

                </Route>
                <Route element={<SuperAdminRoutes userRole={userRole} />}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router