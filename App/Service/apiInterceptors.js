import { handleApiError } from './apiErrorUtils';

export const attachInterceptors = (service, serviceName) => {
  service.interceptors.response.use(
    response => response,
    error => handleApiError(error, serviceName),
  );
};
