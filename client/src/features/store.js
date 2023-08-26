import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import trackerReducer from "./tracker/trackerSlice";

export const store = configureStore({
  reducer: {
    // todo: todoReducer,
    user: userReducer,
  },
});
