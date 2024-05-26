import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
      }
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
      }
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
