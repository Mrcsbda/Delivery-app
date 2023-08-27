import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChecking: false,
    key: null,
    userRole: null,
    address: null,
    errorLogin: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsChecking: (state) => {
            state.isChecking = !state.isChecking
        },
        login: (state, { payload }) => {
            localStorage.setItem("infoUser", JSON.stringify(payload))
            state.isChecking = !state.isChecking
            state.key = payload.key
            state.userRole = payload.userRole
            state.address = payload.address
            state.errorLogin = null
        },
        loginLogout: (state) => {
            state.userRole = null
        }
    }
})

export const { setIsChecking, login, loginLogout } = userSlice.actions
