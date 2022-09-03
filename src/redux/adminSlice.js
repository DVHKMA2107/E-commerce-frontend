import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const adminSlice = createSlice({
  name: "admin",
  initialState: { userDetail: {} },
  reducers: {
    updateUserReset: (state, action) => {
      state.isUpdated = false
    },
    deleteUserReset: (state, action) => {
      state.isDeleted = false
    },
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getSingleUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false
        state.userDetail = action.payload
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.isUpdated = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.isDeleted = action.payload.success
        state.message = action.payload.message
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const getUserList = createAsyncThunk(
  "user/getAllUsers",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users")
      return data.users
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/user/${id}`)

      return data.user
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updateData }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        updateData,
        config
      )

      return data.success
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const clearError = createAsyncThunk(
  "feature/clearError",
  async (arg, thunkApi) => {
    thunkApi.dispatch(adminSlice.actions.clearError())
  }
)
export default adminSlice
