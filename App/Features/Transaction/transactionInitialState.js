const initialState = {
  loading: false,
  error: false,
  errorText: '',
  success: false,
  modalSubtitleText: '',

  currentEditableTransection: {},

  transactions: [],
  fetch: {
    loading: false,
    error: false,
    errorText: '',
  },
  create: {
    loading: false,
    error: false,
    errorText: '',
    success: false,
  },
  update: {
    loading: false,
    error: false,
    errorText: '',
    success: false,
  },
  delete: {
    loading: false,
    error: false,
    errorText: '',
    success: false,
  },
};

export default initialState;
