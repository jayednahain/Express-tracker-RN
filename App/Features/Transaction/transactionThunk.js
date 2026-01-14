import { createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getAllTransactions,
} from './transactionApi';

const fetchTransactionsThunk = createAsyncThunk(
  'Transaction/fetchTransactionsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await getAllTransactions();
      return transactions;
    } catch (error) {
      // Now this will execute!
      console.log('Error caught in thunk:', error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch transactions',
      );
    }
  },
);
const createTransactionThunk = createAsyncThunk(
  'Transaction/createTransactionThunk',
  async (currentTransaction, { rejectWithValue }) => {
    try {
      const transaction = await addTransaction(currentTransaction);
      console.log('XXXX:  Transaction created successfully:', transaction);
      return transaction;
    } catch (error) {
      console.log('XXXX:  Error caught in createTransactionThunk:', error);
      console.log(' Error caught in createTransactionThunk:', error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to create transaction',
      );
    }
  },
);
const changeTransactionThunk = createAsyncThunk(
  'Transaction/changeTransactionThunk',
  async paramObj => {
    console.log('current updated object', JSON.stringify(paramObj));
    let { id, currentTransaction } = paramObj;
    const transactions = await editTransaction(id, currentTransaction);
    return transactions;
  },
);
const removeTransactionThunk = createAsyncThunk(
  'Transaction/removeTransactionThunk',
  async id => {
    const transactions = deleteTransaction(id);
    return transactions;
  },
);

export {
  fetchTransactionsThunk,
  createTransactionThunk,
  changeTransactionThunk,
  removeTransactionThunk,
};
