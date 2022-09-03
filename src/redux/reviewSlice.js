import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const reviewSlice = createSlice({
  name: "review",
  initialState: {},
  reducers: {
    newReviewReset: (state, acton) => {
      state.success = false
    },
    deleteReviewReset: (state, action) => {
      state.isDeleted = false
    },
    clearErrors: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewReview.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createNewReview.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload
      })
      .addCase(createNewReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getProductReviews.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false
        state.reviews = action.payload
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteProductReview.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        state.loading = false
        state.isDeleted = action.payload
      })
      .addCase(deleteProductReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const createNewReview = createAsyncThunk(
  "review/createNewReview",
  async (reviewData, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put("/api/v1/review", reviewData, config)

      return data.success
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`)

      return data.reviews
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deleteProductReview = createAsyncThunk(
  "review/deleteProductReview",
  async ({ productId, id }, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/reviews?productId=${productId}&id=${id}`
      )

      return data.success
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const clearErrors = createAsyncThunk(
  "review/clearErrors",
  async (arg, thunkApi) => {
    thunkApi.dispatch(reviewSlice.actions.clearErrors())
  }
)

export default reviewSlice
