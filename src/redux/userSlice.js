import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.error = null
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
      .addCase(userRegister.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.error = null
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
  },
})

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ loginEmail, loginPassword }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post(
        "/api/v1/login",
        { email: loginEmail, password: loginPassword },
        config
      )

      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (userData, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } }
      const { data } = await axios.post("/api/v1/register", userData, config)
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const clearError = createAsyncThunk(
  "feature/clearError",
  async (arg, thunkApi) => {
    thunkApi.dispatch(userSlice.actions.clearError())
  }
)

export default userSlice
