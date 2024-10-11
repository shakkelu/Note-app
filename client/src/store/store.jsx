import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
// Load token from localStorage if available
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  modal: modalReducer,
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
