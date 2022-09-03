import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const productItem = action.payload

      const isItemExist = state.cartItems.find(
        (item) => item.product === productItem.product
      )
      if (isItemExist) {
        state.cartItems = state.cartItems.map((item) =>
          item.product === isItemExist.product ? productItem : item
        )
      } else {
        state.cartItems = [...state.cartItems, productItem]
      }
    },

    removeItemsFromCart: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter((item) => item.product !== id)
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload
    },
    cartItemsReset: (state, action) => {
      state.cartItems = []
    },
  },
})

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ id, quantity }, thunkApi) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    thunkApi.dispatch(
      cartSlice.actions.addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      })
    )
    localStorage.setItem(
      "cartItems",
      JSON.stringify(thunkApi.getState().cart.cartItems)
    )
  }
)

export const removeItemsFromCart = createAsyncThunk(
  "cart/removeItemsFromCart",
  async (id, thunkApi) => {
    thunkApi.dispatch(cartSlice.actions.removeItemsFromCart(id))

    localStorage.setItem(
      "cartItems",
      JSON.stringify(thunkApi.getState().cart.cartItems)
    )
  }
)

export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  (shippingInfo, thunkApi) => {
    thunkApi.dispatch(cartSlice.actions.saveShippingInfo(shippingInfo))

    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(thunkApi.getState().cart.shippingInfo)
    )
  }
)

export default cartSlice
