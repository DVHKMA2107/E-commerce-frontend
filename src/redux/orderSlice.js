import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], orderDetail: {} },
  reducers: {
    updateOrderReset: (state, action) => {
      state.isUpdated = false
    },
    deleteOrderReset: (state, action) => {
      state.isDeleted = false
    },
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
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isUpdated = action.payload
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isDeleted = true
      })
      .addCase(deleteOrder.rejected, (state, action) => {
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

// Get all order (Admin)
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders")

      return data.orders
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

// Update Order (Admin)
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, updateData }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        updateData,
        config
      )
      return data.success
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

// Delete Order (Admin)
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

      return data.success
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
