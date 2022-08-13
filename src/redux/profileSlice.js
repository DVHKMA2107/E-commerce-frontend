import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    updateProfileReset: (state, action) => {
      state.isUpdated = false
    },
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.isUpdated = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userData, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } }
      const { data } = await axios.put("/api/v1/me/update", userData, config)
      return data.success
    } catch (error) {
      thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const clearError = createAsyncThunk(
  "feature/clearError",
  async (arg, thunkApi) => {
    thunkApi.dispatch(profileSlice.actions.clearError())
  }
)

export default profileSlice
