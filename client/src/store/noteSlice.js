import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const privateRoute = createAsyncThunk(
  "notes/privateRoute",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/dashboard");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    user: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(privateRoute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(privateRoute.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload.notes;
        state.user = action.payload.user.name;
      })
      .addCase(privateRoute.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const getNotes = (state) => state.notes.notes;

export default noteSlice.reducer;
