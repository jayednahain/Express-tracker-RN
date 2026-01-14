import axios from 'axios';

export const handleApiError = (error, serviceName = 'API') => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const statusCode = error.response.status;
      let errorMessage = `${serviceName} Error (Status ${statusCode})`;

      if (statusCode === 404) {
        errorMessage = `${serviceName} Resource not found.`;
      } else if (statusCode >= 500) {
        errorMessage = `${serviceName} Server error. Please try again later.`;
      } else if (statusCode === 401) {
        errorMessage = `${serviceName} Unauthorized. Please log in.`;
      }

      error.message = errorMessage;
    } else if (error.request) {
      error.message = `${serviceName} Network error. Please check your internet connection.`;
    } else {
      error.message = `${serviceName} Unexpected error.`;
    }
  }
  return Promise.reject(error);
};
