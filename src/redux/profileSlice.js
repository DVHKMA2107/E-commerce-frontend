import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    updateReset: (state, action) => {
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
      .addCase(updatePassword.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false
        state.isUpdated = action.payload
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
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
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (password, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put(
        "/api/v1/password/update",
        password,
        config
      )
      return data.success
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "profile/forgotPassword",
  async (email, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        email,
        config
      )
      return data.message
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "profile/resetPassword",
  async ({ token, passwords }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
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
    thunkApi.dispatch(profileSlice.actions.clearError())
  }
)

export default profileSlice
