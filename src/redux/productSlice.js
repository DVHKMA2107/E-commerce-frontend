import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    filteredProductsCount: 0,
    loading: false,
    error: null,
    productDetail: {},
    resultPerPage: 0,
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
        state.resultPerPage = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
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

// { keyword, currentPage = 1, price = [0, 25000], category, rating = 0 }

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (
    { keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0 },
    thunkApi
  ) => {
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`
    try {
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&category=${category}`
      }

      const { data } = await axios.get(link)
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
