import axiosInstance from '../../Service/axiosInstance';

const getAllTransactions = async () => {
  try {
    const response = await axiosInstance.get('/transactions');
    console.log('Response from API data: ', JSON.stringify(response.data));
    setTimeout(() => {
      return response.data;
    }, 2000);

    return response.data;
  } catch (error) {
    console.log('Error in getAllTransactions:', error);
    // Throw the error so the thunk can catch it
    throw error;
  }
};

const addTransaction = async transaction => {
  try {
    const response = await axiosInstance.post('/transactions', transaction);
    console.log('Response from API: ', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log('XXXX: Error in addTransaction:', error);
    throw error;
  }
};

const editTransaction = async (id, updatedTransaction) => {
  try {
    const response = await axiosInstance.put(
      `/transactions/${id}`,
      updatedTransaction,
    );
    return response.data;
  } catch (error) {}
};

const deleteTransaction = async id => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {}
};

export {
  getAllTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
