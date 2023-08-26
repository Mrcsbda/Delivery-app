import {createSlice} from '@reduxjs/toolkit'
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      orders: []
    },
    reducers: {
      addOrder: (state, {payload}) => {
       state.orders = [
        ...state.orders,
        payload
       ]
     },
     removeOrder: (state, {payload}) => {
        state.orders = state.orders.filter((order)=> order != payload)
      },
  }
});
export const {addOrder, removeOrder} = cartSlice.actions;