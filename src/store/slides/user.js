import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userRole: null
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

export default userSlice.reducer