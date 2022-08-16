import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import userSlice from "./userSlice"
import profileSlice from "./profileSlice"
import cartSlice from "./cartSlice"

const preloadState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
}

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState: preloadState,
})
