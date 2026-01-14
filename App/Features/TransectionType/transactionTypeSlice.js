import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './transactionTypeInitialState';

const transactionSlice = createSlice({
  initialState: initialState,
});

export default transactionSlice.reducer;
