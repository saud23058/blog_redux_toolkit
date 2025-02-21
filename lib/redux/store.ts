import { configureStore } from "@reduxjs/toolkit";
import { postApiSlice } from "./features/postApiSlice";

export const store = configureStore({
  reducer: {
    [postApiSlice.reducerPath]: postApiSlice.reducer,
  },
  middleware: (previousMiddleware) =>
    previousMiddleware().concat(postApiSlice.middleware),
});


export type AppDispatch = typeof store.dispatch
export type RootState= ReturnType<typeof store.getState>
