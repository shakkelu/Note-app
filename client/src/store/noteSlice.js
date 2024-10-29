import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/note/get-notes");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/create-note",
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/note/create", {
        title,
        content,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNote = createAsyncThunk(
  "notes/get-note",
  async ({ noteId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/note/get-note", {
        noteId,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/edit-note",
  async ({ noteId, title, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/note/edit", {
        noteId,
        title,
        content,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete-note",
  async ({ noteId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/note/delete-note", {
        noteId,
      });
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
    note: null,
    user: null,
    isLoading: false,
    message: null,
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
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createNote.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.note = action.payload.note;
      })
      .addCase(getNote.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.note = action.payload.note;
      })
      .addCase(editNote.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.note = null;
      })
      .addCase(deleteNote.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const getNotesState = (state) => state.notes.notes;
export const getNoteState = (state) => state.notes.note;

export default noteSlice.reducer;
