import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './PublicRoutes/PublicRoute'
import ClientRoutes from './PrivateRoutes/ClientRoutes'
import AdminRoutes from './PrivateRoutes/AdminRoutes'
import SuperAdminRoutes from './PrivateRoutes/SuperAdminRoutes'
import Login from '../pages/login/Login'
import Feed from '../pages/feed/Feed'
import Restaurant from '../pages/Restaurant/restaurant'
import Profile from '../pages/profile/Profile'
import Layout from '../pages/layout/Layout'
import AddNewCard from '../pages/addNewCard/AddNewCard'
import EditProfile from '../pages/editProfile/EditProfile'
import Food from '../pages/food/Food'
import PaymentMethod from '../pages/paymentMethod/PaymentMethod'
import { useSelector } from 'react-redux'
import { SearchView } from '../pages/searchViews/searchView'
import SignUp from '../pages/signUp/SignUp'

const Router = () => {
    const {userRole} = useSelector(state => state.user)

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute userRole={userRole}/>}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signIn" element={<SignUp />} />
                </Route>
                <Route path='/' element={<ClientRoutes userRole={userRole}/>}>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Feed />} />
                        <Route path=":idClient" element={<Profile />} />
                        <Route  path="search-views" element={<SearchView />}/>
                    </Route>
                    <Route path='addNewCard' element={<AddNewCard/>}/>
                    <Route path='editProfile' element={<EditProfile/>}/>
                    <Route path='restaurant/:idRestaurant/:idDish' element={<Food/>}/>
                    <Route path="restaurant/:idRestaurant" element={<Restaurant />} />
                    <Route path="payment-methods" element={<PaymentMethod />} />
                </Route>
                <Route element={<AdminRoutes userRole={userRole}/>}>

                </Route>
                <Route element={<SuperAdminRoutes userRole={userRole}/>}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router