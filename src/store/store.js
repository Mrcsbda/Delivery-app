import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slides/user'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})