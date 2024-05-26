// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import landingPageReducer from "./reducers/landingPageSlice";
import popupSlice from "./reducers/popupSlice";

const store = configureStore({
  reducer: {
    landingPage: landingPageReducer,
    auth: authReducer,
    popup: popupSlice,
  },
});

export default store;
