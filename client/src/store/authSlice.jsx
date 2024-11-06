import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
/* 
|
|
Authentication checking before the app rendering
|
|
*/
export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async (_, { rejectWithValue }) => {
    try {
      // API call to check if the user is authenticated
      const response = await axios.get(
        "http://localhost:4000/user/refresh-token",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Register user thunk
|
|
*/
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(`
    *
    *
    *
    ###### INSIDE registerUser thunk ######
     `);
    try {
      const response = await axiosInstance.post("/user/register", {
        email,
        password,
      });
      console.log(`
    *
    *
    *
    response recieved
   `);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Validate email thunk
|
|
*/
export const validateEmail = createAsyncThunk(
  "auth/validateEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/validateEmail", {
        email,
      });
      return response.data; // Assuming the response tells whether the email exists
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Login with password thunk
|
|
*/
export const loginWithPassword = createAsyncThunk(
  "auth/loginWithPassword",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(`
    *
    *
    *
    ###### INSIDE loginWithPassword thunk ######
     `);
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      return response.data; // Return token on success
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
    },
    setToken: (state, action) => {
      state.userToken = action.payload.accessToken;
      if (action.payload.accessToken) {
        console.log(`
    *
    *
    *
    token recieved and stored in state
   `);
      } else {
        console.log(`
    *
    *
    *
    token not recieved
   `);
      }
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    /* 
|
|
Auth check
|
|
*/
    builder.addCase(checkAuthentication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuthentication.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload.accessToken;
      if (action.payload.accessToken) {
        console.log(`
    *
    *
    *
    new access token recieved and stored in state
   `);
      } else {
        console.log(`
    *
    *
    *
    token not recieved, person is not authenticated
   `);
      }
      state.isAuthenticated = true;
    });
    builder.addCase(checkAuthentication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(`
      *
      *
      * 
      rejected , person is not authenticated`);
    });
    /* 
|
|
User registration
|
|
*/
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload.accessToken;
      if (action.payload.accessToken) {
        console.log(`
    *
    *
    *
    token recieved and stored in state
   `);
      } else {
        console.log(`
    *
    *
    *
    token not recieved
   `);
      }
      state.isAuthenticated = true;
      console.log(`
    *
    *
    *
    registration complete
   `);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(`
      *
      *
      * 
      rejected`);
    });

    /* 
|
|
Email validation
|
|
*/
    builder.addCase(validateEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.emailValidated = true;
    });
    builder.addCase(validateEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(`
      *
      *
      * 
      rejected`);
    });

    /* 
|
|
Login with password
|
|
*/
    builder.addCase(loginWithPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload.accessToken;
      if (action.payload.accessToken) {
        console.log(`
    *
    *
    *
    token recieved and stored in state
   `);
      } else {
        console.log(`
    *
    *
    *
    token not recieved
   `);
      }
      state.isAuthenticated = true;
    });
    builder.addCase(loginWithPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(`
      *
      *
      * 
      rejected`);
    });
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
