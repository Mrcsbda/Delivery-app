import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userRole: "CLIENT"
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.userRole = payload
        },
        loginLogout: (state) => {
            state.userRole = null
        }
    }
})

export const { setLoading, login, loginLogout } = userSlice.actions
