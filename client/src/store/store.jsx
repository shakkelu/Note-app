import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice"; // Import the modal reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer, // Add modal reducer
  },
});

export default store;
