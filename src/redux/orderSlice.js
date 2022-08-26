import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], orderDetail: {} },
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
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getOrderDetail.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false
        state.orderDetail = action.payload
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
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

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get("/api/v1/orders/me")

      return data.myOrders
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`)
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
