import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import userSlice from "./userSlice"
import profileSlice from "./profileSlice.js"

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
  },
})
