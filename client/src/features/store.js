import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
});
