import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slides/user'
import { firebaseApi } from './api/firebaseApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
   [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat( firebaseApi.middleware)
});

setupListeners(store.dispatch)
