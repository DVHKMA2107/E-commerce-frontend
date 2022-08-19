import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    clearErrors: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post("/api/v1/order/new", newOrder, config)

      return data.order
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const clearErrors = createAsyncThunk(
  "order/clearErrors",
  (args, thunkApi) => {
    thunkApi.dispatch(orderSlice.actions.clearErrors())
  }
)

export default orderSlice
