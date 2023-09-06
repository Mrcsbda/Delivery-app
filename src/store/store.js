import { configureStore } from '@reduxjs/toolkit';
import { firebaseApi } from './api/firebaseApi';
import { cartSlice } from './slides/cart';
import { userSlice } from './slides/user/user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware)
});

//setupListeners(store.dispatch)
