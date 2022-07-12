import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import searchingReducer from "../slices/searchingSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchingReducer,
  },
});