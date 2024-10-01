// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/register", {
        name,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", { name, password });
      return response.data.token; // Return the token on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export Actions
export const { logout } = authSlice.actions;

export default authSlice.reducer;
