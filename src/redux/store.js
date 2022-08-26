import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import userSlice from "./userSlice"
import profileSlice from "./profileSlice"
import cartSlice from "./cartSlice"
import orderSlice from "./orderSlice"
import reviewSlice from "./reviewSlice"

const preloadState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
}

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    review: reviewSlice.reducer,
  },
  preloadedState: preloadState,
})
