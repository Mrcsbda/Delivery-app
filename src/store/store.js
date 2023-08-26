import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slides/user'
import { firebaseApi } from './api/firebaseApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { cartSlice } from './slides/cart';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
   [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat( firebaseApi.middleware)
});

//setupListeners(store.dispatch)
