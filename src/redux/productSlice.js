import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const productSlice = createSlice({
  name: "prodcut",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    productDetail: {},
  },
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.productCount = action.payload.productCount
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false
        state.productDetail = action.payload
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (arg, thunkApi) => {
    try {
      const { data } = await axios.get("/api/v1/products?page=2")
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`)
      return data.product
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const clearError = createAsyncThunk(
  "feature/clearError",
  async (arg, thunkApi) => {
    thunkApi.dispatch(productSlice.actions.clearError())
  }
)

export default productSlice
