import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup(state, action) {
      state.popup = action.payload;
    },
    
  },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;
