// src/GlobalRedux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import firebaseReducer from "./Features/firebaseSlice";

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
