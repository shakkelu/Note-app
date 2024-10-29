import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalContentType: null, // "login" or "register"
  button: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContentType = action.payload; // Either "login" or "register"
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContentType = null;
    },
    openButton: (state) => {
      state.button = true;
    },
    closeButton: (state) => {
      state.button = false;
    },
  },
});

export const { openModal, closeModal, openButton, closeButton } =
  modalSlice.actions;

export const getButton = (state) => state.modal.button;

export default modalSlice.reducer;
