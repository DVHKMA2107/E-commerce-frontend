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
    newProduct: {},
  },
  reducers: {
    newProductReset: (state, action) => {
      state.success = false
    },
    deleteProductReset: (state, action) => {
      state.isDeleted = false
    },
    updateProductReset: (state, action) => {
      state.isUpdated = false
    },
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
      .addCase(getProductList.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createNewProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
        state.newProduct = action.payload.product
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.isDeleted = action.payload
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.isUpdated = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
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

export const getProductList = createAsyncThunk(
  "product/getProductList",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products")
      return data.products
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const createNewProduct = createAsyncThunk(
  "product/createNewProduct",
  async (productData, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post(
        "/api/v1/admin/product/new",
        productData,
        config
      )

      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

      return data.success
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updateData }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        updateData,
        config
      )

      return data.success
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
