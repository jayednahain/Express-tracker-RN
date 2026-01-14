import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../Features/Transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});
