// src/GlobalRedux/Features/firebaseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

// Async Thunks for Firebase Operations
export const editDocument = createAsyncThunk(
  "firebase/editDocument",
  async ({ id, name, description, parentId }: { id: string; name: string; description: string; parentId: string }, thunkAPI) => {
    try {
      const docRef = doc(db, "your-collection-name", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await setDoc(docRef, { name, description, parentId }, { merge: true });
        return { id, name, description, parentId }; // Return updated data
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "firebase/deleteDocument",
  async (id: string, thunkAPI) => {
    try {
      const docRef = doc(db, "your-collection-name", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        return id; // Return deleted ID
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editDocument.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editDocument.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(editDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteDocument.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default firebaseSlice.reducer;
