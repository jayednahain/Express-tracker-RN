import { createSlice } from '@reduxjs/toolkit';
import initialState from './transactionInitialState';
import {
  changeTransactionThunk,
  createTransactionThunk,
  fetchTransactionsThunk,
  removeTransactionThunk,
} from './transactionThunk';

const transactionSlice = createSlice({
  name: 'Transaction',
  initialState: initialState,

  reducers: {
    editActiveTransection: (state, action) => {
      state.currentEditableTransection = action.payload;
    },

    resetCurrentActiveTransection: state => {
      console.log('XXXX: resetCurrentActiveTransection called');
      state.currentEditableTransection = {};
    },

    resetCommonState: state => {
      state.loading = false;
      state.error = false;
      state.errorText = '';
      state.success = false;
    },

    resetCreateState: state => {
      state.create = {
        loading: false,
        error: false,
        errorText: '',
        success: false,
      };
    },
    resetUpdateState: state => {
      state.update = {
        loading: false,
        error: false,
        errorText: '',
        success: false,
      };
    },
    resetDeleteState: state => {
      state.delete = {
        loading: false,
        error: false,
        errorText: '',
        success: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      // FETCH
      .addCase(fetchTransactionsThunk.pending, state => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.transactions = action.payload;

        console.log('XXXX: etchTransactionsThunk.fulfilled');
      })
      .addCase(fetchTransactionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText =
          action.error.message || 'Failed to fetch transactions';
        console.log('XXXX: fetchTransactionsThunk.rejected');
      })

      // CREATE
      .addCase(createTransactionThunk.pending, state => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
        state.success = false;
      })
      .addCase(createTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.transactions.push(action.payload);
        state.modalSubtitleText = 'Transaction created successfully';
      })
      .addCase(createTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText =
          action.error.message || 'Failed to create transaction';
        state.success = false;
      })

      // UPDATE
      .addCase(changeTransactionThunk.pending, state => {
        state.loading = true;
        state.error = false;
        state.errorText = '';
        state.success = false;
      })
      .addCase(changeTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.modalSubtitleText = 'Transaction updated successfully';

        const currentUpdatedIndex = state.transactions.findIndex(
          item => item.id === action.payload.id,
        );
        if (currentUpdatedIndex !== -1) {
          state.transactions[currentUpdatedIndex] = action.payload;
        }
      })
      .addCase(changeTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText =
          action.error.message || 'Failed to update transaction';
        state.success = false;
      })

      // DELETE
      .addCase(removeTransactionThunk.pending, state => {
        state.delete.loading = true;
        state.delete.error = false;
        state.delete.errorText = '';
        state.delete.success = false;
      })
      .addCase(removeTransactionThunk.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.error = false;
        state.delete.success = true;
        state.transactions = state.transactions.filter(
          item => item.id !== action.meta.arg,
        );
      })
      .addCase(removeTransactionThunk.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = true;
        state.delete.errorText =
          action.error.message || 'Failed to delete transaction';
        state.delete.success = false;
      });
  },
});

export const {
  resetCreateState,
  resetUpdateState,
  resetDeleteState,
  editActiveTransection,
  resetCurrentActiveTransection,
} = transactionSlice.actions;
export default transactionSlice.reducer;
