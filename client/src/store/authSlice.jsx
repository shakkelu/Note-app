import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          email,
          password,
        }
      );
      return response.data; // Contains token and message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Validate Email Thunk
export const validateEmail = createAsyncThunk(
  "auth/validateEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/validateEmail",
        { email }
      );
      return response.data; // Assuming the response tells whether the email exists
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login with Password Thunk
export const loginWithPassword = createAsyncThunk(
  "auth/loginWithPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email,
          password,
        }
      );
      return response.data.token; // Return token on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    emailValidated: false,
    userToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // Remove token from storage
    },
  },
  extraReducers: (builder) => {
    // User registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload.token; // Store token from registration
      state.isAuthenticated = true;
      console.log(action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Email validation
    builder.addCase(validateEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(validateEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.emailValidated = true; // Email is validated
      console.log(action.payload);
    });
    builder.addCase(validateEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Password login
    builder.addCase(loginWithPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload;
      state.isAuthenticated = true;
      console.log(action.payload);
    });
    builder.addCase(loginWithPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
