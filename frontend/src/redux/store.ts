import { configureStore } from "@reduxjs/toolkit";
 import authReducer from "./slices/authSlice.ts";
// import userReducer from "./user/userSlice"; 

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Optionally export dispatch type
export type AppDispatch = typeof store.dispatch;
