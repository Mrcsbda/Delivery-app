import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './PublicRoutes/PublicRoute'
import ClientRoutes from './PrivateRoutes/clientRoutes'
import AdminRoutes from './PrivateRoutes/adminRoutes'
import SuperAdminRoutes from './PrivateRoutes/superAdminRoutes'
import Login from '../pages/login/Login'
import Feed from '../pages/feed/Feed'
import Restaurant from '../pages/Restaurant/restaurant'
import Profile from '../pages/profile/Profile'
import Layout from '../pages/layout/Layout'
import SignIn from '../pages/signIn/SignIn'
import AddNewCard from '../pages/addNewCard/AddNewCard'
import EditProfile from '../pages/editProfile/EditProfile'
import Food from '../pages/food/Food'
import PaymentMethod from '../pages/paymentMethod/PaymentMethod'
import { SearchView } from '../pages/searchViews/searchView'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute userRole={"CLIENT"}/>}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signIn" element={<SignIn />} />
                </Route>
                <Route path='/' element={<ClientRoutes userRole={"CLIENT"}/>}>
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
                <Route element={<AdminRoutes userRole={"CLIENT"}/>}>

                </Route>
                <Route element={<SuperAdminRoutes userRole={"CLIENT"}/>}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router