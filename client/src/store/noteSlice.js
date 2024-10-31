import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

/* 
|
|
Get all notes
|
|
*/
export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (_, { rejectWithValue }) => {
    try {
      console.log(`
    *
    *
    *
    ###### INSIDE getNotes thunk ######
     `);
      const response = await axiosInstance.get("/note/get-notes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Create a new note
|
|
*/
export const createNote = createAsyncThunk(
  "notes/create-note",
  async ({ title, content }, { rejectWithValue }) => {
    console.log(`
    *
    *
    *
    ###### INSIDE createNote thunk ######
     `);
    try {
      const response = await axiosInstance.post("/note/create", {
        title,
        content,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Get a specific note
|
|
*/
export const getNote = createAsyncThunk(
  "notes/get-note",
  async ({ noteId }, { rejectWithValue }) => {
    console.log(`
    *
    *
    *
    ###### INSIDE getNote thunk ######
     `);
    try {
      const response = await axiosInstance.get(`/note/get-note/${noteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Edit a specific note
|
|
*/
export const editNote = createAsyncThunk(
  "notes/edit-note",
  async ({ noteId, title, content }, { rejectWithValue }) => {
    console.log(`
    *
    *
    *
    ###### INSIDE editNote thunk ######
     `);
    try {
      const response = await axiosInstance.get("/note/edit", {
        noteId,
        title,
        content,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* 
|
|
Delete a specific note
|
|
*/
export const deleteNote = createAsyncThunk(
  "notes/delete-note",
  async ({ noteId }, { rejectWithValue }) => {
    console.log(`
    *
    *
    *
    ###### INSIDE deleteNote thunk ######
     `);
    try {
      const response = await axiosInstance.delete("/note/delete-note", {
        noteId,
      });

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
    /* 
|
|
Get all notes
|
|
*/
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notes = action.payload.notes;
      if (action.payload.notes) {
        console.log(`
      *
      *
      * 
      notes obtained from the server`);
      } else {
        console.log(`
      *
      *
      * 
      no notes obtained`);
      }
      state.user = action.payload.user.name;
    });

    builder.addCase(getNotes.rejected, (state) => {
      state.isLoading = false;
      console.log(`
      *
      *
      * 
      rejected`);
    });
    /* 
|
|
Create new note
|
|
*/
    builder.addCase(createNote.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.note = action.payload.newNote;
      if (action.payload.newNote) {
        console.log(`
      *
      *
      * 
      new note recieved`);
      } else {
        console.log(`
      *
      *
      * 
      new note not recieved`);
      }
    });

    builder.addCase(createNote.rejected, (state) => {
      state.isLoading = false;
      console.log(`
      *
      *
      * 
      rejected`);
    });
    /* 
|
|
Get a specific note
|
|
*/
    builder.addCase(getNote.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.note = action.payload;
      if (action.payload) {
        console.log(`
      *
      *
      * 
      note obtained from the server`);
      } else {
        console.log(`
      *
      *
      * 
      no note obtained`);
      }
    });

    builder.addCase(getNote.rejected, (state) => {
      state.isLoading = false;
      console.log(`
      *
      *
      * 
      rejected`);
    });
    /* 
|
|
Edit a specific note
|
|
*/
    builder.addCase(editNote.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.note = action.payload.note;
    });

    builder.addCase(editNote.rejected, (state) => {
      state.isLoading = false;
      console.log(`
      *
      *
      * 
      rejected`);
    });
    /* 
|
|
Delete a specific note
|
|
*/
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteNote.fulfilled, (state) => {
      state.isLoading = false;
      state.note = null;
      console.log(`
      *
      *
      * 
      deletion success`);
    });

    builder.addCase(deleteNote.rejected, (state) => {
      state.isLoading = false;
      console.log(`
      *
      *
      * 
      rejected`);
    });
  },
});
export const getNotesState = (state) => state.notes.notes;
export const getNoteState = (state) => state.notes.note;

export default noteSlice.reducer;
