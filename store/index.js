// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogSlice";
import authReducer from "./reducers/authSlice";
import popupSlice from "./reducers/popupSlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    popup: popupSlice,
  },
});

export default store;
