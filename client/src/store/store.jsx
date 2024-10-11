import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Load token from localStorage if available
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      emailValidated: false,
      userToken: token,
      isAuthenticated: token ? true : false,
      loading: false,
      error: null,
    },
  },
});

export default store;
