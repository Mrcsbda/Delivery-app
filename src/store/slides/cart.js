import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    orders: [],
    totalPrice: 0
  },
  reducers: {
    addOrder: (state, { payload }) => {
      state.orders = [
        ...state.orders,
        payload
      ],
        state.totalPrice += payload.price
    },
    removeOrder: (state, { payload }) => {
      state.orders = state.orders.filter((order) => order != payload)
    },
    updateOrder: (state, { payload }) => {
      state.orders[payload.id] = {
        ...state.orders[payload.id],
        quantity: payload.obj,
      }
    },
  }
});
export const { addOrder, removeOrder, updateOrder } = cartSlice.actions;