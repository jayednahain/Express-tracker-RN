import { createSlice } from '@reduxjs/toolkit';
import initialState from './transactionInitialState';
import {
  changeTransactionThunk,
  createTransactionThunk,
  fetchTransactionsThunk,
  removeTransactionThunk,
} from './transactionThunk';

// const transactionSlice = createSlice({
//   name: 'Transaction',
//   initialState: initialState,
//   extraReducers: builder => {
//     builder
//       .addCase(fetchTransactionsThunk.pending, state => {
//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.transactions = action.payload;
//       })
//       .addCase(fetchTransactionsThunk.rejected, state => {
//         state.isLoading = false;
//         state.isError = true;
//       })

//       //createTransactionThunk
//       .addCase(createTransactionThunk.pending, state => {
//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(createTransactionThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.transactions.push(action.payload);
//       })
//       .addCase(createTransactionThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorText = action.error.message;
//       })

//       // changeTransactionThunk
//       .addCase(changeTransactionThunk.pending, state => {
//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(changeTransactionThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;

//         let currentUpdatedIndex = state.transactions.findIndex(item => {
//           item.id === action.payload.id;
//         });
//         state.transactions[currentUpdatedIndex] = action.payload;
//       })
//       .addCase(changeTransactionThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorText = action.error.message;
//       })

//       //removeTransactionThunk
//       .addCase(removeTransactionThunk.pending, state => {
//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(removeTransactionThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.transactions = state.transactions.filter(
//           item => item.id !== action.payload.id,
//         );
//       });
//   },
// });

// export default transactionSlice.reducer;

const transactionSlice = createSlice({
  name: 'Transaction',
  initialState: initialState,
  reducers: {
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
        state.fetch.loading = true;
        state.fetch.error = false;
        state.fetch.errorText = '';
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
        state.fetch.loading = false;
        state.fetch.error = false;
        state.transactions = action.payload;

        console.log('XXXX: etchTransactionsThunk.fulfilled');
      })
      .addCase(fetchTransactionsThunk.rejected, (state, action) => {
        state.fetch.loading = false;
        state.fetch.error = true;
        state.fetch.errorText =
          action.error.message || 'Failed to fetch transactions';

        console.log('XXXX: fetchTransactionsThunk.rejected');
      })

      // CREATE
      .addCase(createTransactionThunk.pending, state => {
        state.create.loading = true;
        state.create.error = false;
        state.create.errorText = '';
        state.create.success = false;
      })
      .addCase(createTransactionThunk.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.error = false;
        state.create.success = true;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactionThunk.rejected, (state, action) => {
        console.log(
          'XXXX: createTransactionThunk.rejected : ',
          action.error.message,
        );

        state.create.loading = false;
        state.create.error = true;
        state.create.errorText =
          action.error.message || 'Failed to create transaction';
        state.create.success = false;
      })

      // UPDATE
      .addCase(changeTransactionThunk.pending, state => {
        state.update.loading = true;
        state.update.error = false;
        state.update.errorText = '';
        state.update.success = false;
      })
      .addCase(changeTransactionThunk.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.error = false;
        state.update.success = true;

        const currentUpdatedIndex = state.transactions.findIndex(
          item => item.id === action.payload.id,
        );
        if (currentUpdatedIndex !== -1) {
          state.transactions[currentUpdatedIndex] = action.payload;
        }
      })
      .addCase(changeTransactionThunk.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = true;
        state.update.errorText =
          action.error.message || 'Failed to update transaction';
        state.update.success = false;
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
          item => item.id !== action.payload.id,
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

export const { resetCreateState, resetUpdateState, resetDeleteState } =
  transactionSlice.actions;
export default transactionSlice.reducer;
