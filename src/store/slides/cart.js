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
      state.orders = state.orders.filter((order) => order.timestamp != payload.id)
      //state.orders = state.orders.splice(payload.pos, 1);
    },
    updateOrder: (state, { payload }) => {
      state.orders[payload.id] = {
        ...state.orders[payload.id],
        quantity: payload.obj,
      }
    },
    resetOrders: (state) => {
      state.orders = [];
      state.totalPrice = 0;
    },
  }
});
export const { addOrder, removeOrder, updateOrder, resetOrders } = cartSlice.actions;