import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const reviewSlice = createSlice({
  name: "review",
  initialState: {},
  reducers: {
    newReviewReset: (state, acton) => {
      state.success = false
    },
    clearErrors: (action, state) => {
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
  },
})

export const clearErrors = createAsyncThunk(
  "feature/clearError",
  async (arg, thunkApi) => {
    thunkApi.dispatch(reviewSlice.actions.clearErrors())
  }
)

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

export default reviewSlice
