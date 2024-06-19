// src/Redux/alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: { isVisible: false, message: '' },
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = true;
      state.message = action.payload;
    },
    hideAlert: (state) => {
      state.isVisible = false;
    }
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;

export const selectAlert = (state) => state.alert;