import { handleApiError } from './apiErrorUtils';

export const createErrorHandler = serviceName => {
  return error => handleApiError(error, serviceName);
};
